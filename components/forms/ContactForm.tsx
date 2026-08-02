"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";

import {
  contactSchema,
  contactSubjects,
  type ContactFormValues,
} from "@/lib/contact-schema";

type SubmissionState = "idle" | "loading" | "success" | "error";

const defaultValues: DefaultValues<ContactFormValues> = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const fieldLabels: Partial<Record<keyof ContactFormValues, string>> = {
  name: "Name",
  email: "Email address",
  phone: "Phone number",
  subject: "Inquiry type",
  message: "Message",
  consent: "Consent",
};

const fieldOrder = Object.keys(fieldLabels) as Array<keyof ContactFormValues>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-300" id={id}>
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const errorFields = fieldOrder.filter((field) => errors[field]?.message);
  const isLoading = isSubmitting || submissionState === "loading";

  const submitForm = async (values: ContactFormValues) => {
    setSubmissionState("loading");
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload: unknown = await response.json().catch(() => null);
      const message =
        payload &&
        typeof payload === "object" &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : null;
      const requestSucceeded =
        payload &&
        typeof payload === "object" &&
        "ok" in payload &&
        payload.ok === true;

      if (!response.ok || !requestSucceeded) {
        setSubmissionState("error");
        setResponseMessage(
          message ?? "Your message could not be sent. Please wait a moment and try again.",
        );
        return;
      }

      setSubmissionState("success");
      setResponseMessage(message ?? "Thank you. Your message has been sent securely.");
      reset();
    } catch {
      setSubmissionState("error");
      setResponseMessage(
        "Your message could not be sent. Check your connection and try again.",
      );
    }
  };

  const handleInvalid = () => {
    setSubmissionState("idle");
    setResponseMessage("");
    window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
  };

  const focusField = (field: keyof ContactFormValues) => {
    setFocus(field);
    document.getElementById(`contact-${field}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <form
      className="card p-5 sm:p-8 lg:p-10"
      noValidate
      onSubmit={handleSubmit(submitForm, handleInvalid)}
      aria-busy={isLoading}
    >
      <div className="border-b border-line pb-7">
        <div className="flex items-start gap-4">
          <span className="icon-disc" aria-hidden="true">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-[var(--font-manrope)] text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
              Send a professional inquiry
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Fields marked with <span aria-hidden="true">*</span><span className="sr-only">an asterisk</span> are required.
              Please do not include patient, specimen, or confidential clinical information.
            </p>
          </div>
        </div>
      </div>

      {submitCount > 0 && errorFields.length > 0 ? (
        <div
          className="mt-7 rounded-2xl border border-red-300 bg-red-50 p-5 text-red-950 dark:border-red-900 dark:bg-red-950/35 dark:text-red-100"
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-error-title"
        >
          <h3 className="flex items-center gap-2 font-bold" id="contact-error-title">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            Please review {errorFields.length === 1 ? "this field" : "these fields"}
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
            {errorFields.map((field) => (
              <li key={field}>
                <a
                  className="font-semibold underline decoration-red-400 underline-offset-4 hover:no-underline"
                  href={`#contact-${field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    focusField(field);
                  }}
                >
                  {fieldLabels[field]}: {String(errors[field]?.message)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor="contact-name">
            Name <span className="text-medical-600 dark:text-blue-300" aria-hidden="true">*</span>
          </label>
          <input
            {...register("name")}
            className="field"
            id="contact-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          <FieldError id="contact-name-error" message={errors.name?.message} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor="contact-email">
            Email address <span className="text-medical-600 dark:text-blue-300" aria-hidden="true">*</span>
          </label>
          <input
            {...register("email")}
            className="field"
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={160}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={`contact-email-hint${errors.email ? " contact-email-error" : ""}`}
          />
          <p className="mt-2 text-xs leading-5 text-muted" id="contact-email-hint">
            Used only to respond to this inquiry.
          </p>
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor="contact-phone">
            Phone number <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            {...register("phone")}
            className="field"
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={24}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          <FieldError id="contact-phone-error" message={errors.phone?.message} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor="contact-subject">
            Inquiry type <span className="text-medical-600 dark:text-blue-300" aria-hidden="true">*</span>
          </label>
          <select
            {...register("subject")}
            className="field"
            id="contact-subject"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          >
            <option value="" disabled>
              Select an inquiry type
            </option>
            {contactSubjects.map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
          </select>
          <FieldError id="contact-subject-error" message={errors.subject?.message} />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-bold text-ink" htmlFor="contact-message">
          Message <span className="text-medical-600 dark:text-blue-300" aria-hidden="true">*</span>
        </label>
        <textarea
          {...register("message")}
          className="field min-h-40 resize-y"
          id="contact-message"
          rows={6}
          maxLength={2000}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`}
        />
        <p className="mt-2 text-xs leading-5 text-muted" id="contact-message-hint">
          Share the professional context and any relevant timeline. Do not send medical records or sensitive data.
        </p>
        <FieldError id="contact-message-error" message={errors.message?.message} />
      </div>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          {...register("website")}
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-7 rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <input
            {...register("consent")}
            className="mt-1 h-5 w-5 shrink-0 rounded border-line text-medical-600 accent-blue-600"
            id="contact-consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={`contact-consent-copy${errors.consent ? " contact-consent-error" : ""}`}
          />
          <div>
            <label className="text-sm font-medium leading-6 text-ink" htmlFor="contact-consent">
              I consent to the use of my submitted details to respond to this inquiry.
              <span className="text-medical-600 dark:text-blue-300" aria-hidden="true"> *</span>
            </label>{" "}
            <Link
              className="inline-flex min-h-11 items-center text-sm font-bold text-medical-600 underline decoration-blue-300 underline-offset-4 hover:no-underline dark:text-blue-300"
              href="/privacy"
            >
              Read the privacy notice
            </Link>
            <p className="sr-only" id="contact-consent-copy">
              Consent is required. The privacy notice explains how contact-form information is handled.
            </p>
          </div>
        </div>
        <FieldError id="contact-consent-error" message={errors.consent?.message} />
      </div>

      {submissionState === "loading" ? (
        <p className="sr-only" role="status" aria-live="polite">
          Sending your message. Please wait.
        </p>
      ) : null}

      {submissionState === "success" ? (
        <div
          className="mt-7 flex items-start gap-3 rounded-2xl border border-teal-300 bg-teal-50 p-4 text-sm leading-6 text-teal-950 dark:border-teal-800 dark:bg-teal-950/35 dark:text-teal-100"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p><strong>Message sent.</strong> {responseMessage}</p>
        </div>
      ) : null}

      {submissionState === "error" ? (
        <div
          className="mt-7 flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-950 dark:border-red-900 dark:bg-red-950/35 dark:text-red-100"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p><strong>Message not sent.</strong> {responseMessage}</p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-muted">
          Protected by validation, a spam check, and request limits. Please submit only information needed for this conversation.
        </p>
        <button className="button-primary w-full sm:w-auto" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
