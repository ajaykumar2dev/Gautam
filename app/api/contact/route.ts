import { NextRequest, NextResponse } from "next/server";

import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function response(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { ok: status >= 200 && status < 300, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        ...headers,
      },
    },
  );
}

function normalizedOrigin(value: string | null) {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function hasAllowedOrigin(request: NextRequest) {
  const suppliedOrigin = normalizedOrigin(request.headers.get("origin"));
  if (!suppliedOrigin) return false;

  const allowedOrigins = new Set<string>();
  allowedOrigins.add(request.nextUrl.origin);

  const configuredOrigin = normalizedOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? null);
  if (configuredOrigin) allowedOrigins.add(configuredOrigin);

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || request.nextUrl.protocol.replace(":", "");

  if (host && (protocol === "http" || protocol === "https")) {
    const forwardedOrigin = normalizedOrigin(`${protocol}://${host}`);
    if (forwardedOrigin) allowedOrigins.add(forwardedOrigin);
  }

  return allowedOrigins.has(suppliedOrigin);
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  return address.slice(0, 64);
}

function checkRateLimit(key: string) {
  const now = Date.now();

  for (const [storedKey, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
  }

  const current = rateLimitStore.get(key);
  if (!current) {
    if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value;
      if (typeof oldestKey === "string") rateLimitStore.delete(oldestKey);
    }

    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function singleLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

function emailContent(data: ContactFormValues) {
  const name = singleLine(data.name);
  const phone = singleLine(data.phone);
  const message = data.message
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");

  const text = [
    "New professional portfolio inquiry",
    "",
    `Name: ${name}`,
    `Email: ${data.email}`,
    `Phone: ${phone || "Not provided"}`,
    `Inquiry type: ${data.subject}`,
    "",
    "Message:",
    message,
    "",
    "Submitted with consent through the portfolio contact form.",
  ].join("\n");

  const htmlMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;margin:0 auto">
      <div style="border-bottom:3px solid #2563eb;padding:0 0 16px">
        <p style="color:#1d4ed8;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 6px">Portfolio contact</p>
        <h1 style="font-size:24px;line-height:1.25;margin:0">New professional inquiry</h1>
      </div>
      <table role="presentation" style="border-collapse:collapse;width:100%;margin:22px 0">
        <tr><td style="padding:6px 14px 6px 0;font-weight:700;vertical-align:top">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;font-weight:700;vertical-align:top">Email</td><td style="padding:6px 0">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;font-weight:700;vertical-align:top">Phone</td><td style="padding:6px 0">${escapeHtml(phone || "Not provided")}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;font-weight:700;vertical-align:top">Inquiry type</td><td style="padding:6px 0">${escapeHtml(data.subject)}</td></tr>
      </table>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px">
        <p style="font-weight:700;margin:0 0 8px">Message</p>
        <p style="margin:0">${htmlMessage}</p>
      </div>
      <p style="color:#64748b;font-size:12px;margin:20px 0 0">Submitted with consent through the portfolio contact form.</p>
    </div>
  `;

  return { text, html };
}

async function deliverMessage(data: ContactFormValues) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !toEmail || !fromEmail) return false;

  const content = emailContent(data);
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `Portfolio inquiry: ${data.subject}`,
      text: content.text,
      html: content.html,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  return resendResponse.ok;
}

export async function POST(request: NextRequest) {
  if (!hasAllowedOrigin(request)) {
    return response("This request could not be accepted.", 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return response("This request could not be accepted.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return response("This request could not be accepted.", 413);
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return response("Too many attempts. Please wait before trying again.", 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return response("This request could not be accepted.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return response("This request could not be accepted.", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return response("Please review the form and try again.", 400);
  }

  const validation = contactSchema.safeParse(payload);
  if (!validation.success) {
    if (
      payload &&
      typeof payload === "object" &&
      "website" in payload &&
      typeof payload.website === "string" &&
      payload.website.trim().length > 0
    ) {
      return response("Thank you. Your message has been received.", 200);
    }

    return response("Please review the form and try again.", 400);
  }

  if (
    !process.env.RESEND_API_KEY?.trim() ||
    !process.env.CONTACT_TO_EMAIL?.trim() ||
    !process.env.CONTACT_FROM_EMAIL?.trim()
  ) {
    return response("Messaging is temporarily unavailable. Please try again later.", 503);
  }

  try {
    const delivered = await deliverMessage(validation.data);
    if (!delivered) {
      return response("Your message could not be sent. Please try again later.", 502);
    }
  } catch {
    return response("Your message could not be sent. Please try again later.", 502);
  }

  return response("Thank you. Your professional inquiry has been sent securely.", 200);
}
