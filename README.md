# Amrita Gautam — Professional Portfolio

A production-oriented healthcare portfolio built with Next.js 15, the App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, and Lucide icons.

The current content intentionally distinguishes verified facts from editable placeholders. It does not claim unverified degrees, dates, credentials, awards, metrics, testimonials, or contact details.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks and production build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Editable content

Update the typed files in `data/`:

- `profile.ts`: identity, biography, contact placeholders, resume state, navigation
- `skills.ts`: technical skills, professional strengths, laboratory expertise
- `experience.ts`: dates, department, unit, and responsibilities
- `education.ts`: verified academic records
- `certifications.ts`: credentials and verification state
- `achievements.ts`: professional commitments and formal achievements
- `gallery.ts`: approved image paths, captions, alt text, and categories
- `testimonials.ts`: consented professional references
- `statistics.ts`: content counts only; do not add unverified performance or patient metrics

Replace every `isPlaceholder`, `status: "placeholder"`, or “Add …” value only with information Amrita has reviewed.

## Assets

### Profile photo

The current portrait is imported from `Amrita_Gautam454.jpeg` in `components/sections/Hero.tsx`. Replace that asset and update the import/alt text if a different approved portrait is preferred. Publish personal imagery only with Amrita's consent.

### Gallery

Add privacy-safe images to `public/images/gallery/`, then update `data/gallery.ts`. Never publish patient faces, wristbands, medical records, reports, test results, specimen labels, hospital IDs, screens, or confidential work areas. Use `next/image`-compatible dimensions and meaningful alt text.

### Certificates

Add reviewed certificate images only after removing unnecessary personal identifiers. Set a record to `verified` only after confirming its title, issuer, date, credential ID, and permission to publish.

### Resume

Follow `public/documents/README.md`. The expected path is `/documents/amrita-gautam-resume.pdf`. Resume actions show a status page until `profile.resume.available` is true.

### Email, phone, and LinkedIn

Replace the placeholders in `data/profile.ts`. Public contact details are omitted by default.

## Contact form delivery

The browser and API route both validate with the same Zod schema. The API also applies a request-size limit, same-origin check, honeypot, output escaping, and basic in-memory rate limiting.

To deliver through Resend:

1. Verify a sending domain in Resend.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
4. Restart the server and send a test inquiry.

If these variables are absent, the API returns a clear unavailable state and never claims a message was sent. No secrets are included in client code.

For production scale, replace the in-memory limiter with a durable store such as Vercel KV/Upstash, consider Turnstile or another privacy-conscious spam check, define a deletion schedule, and update `/privacy` to match the actual services used. Formspree can be substituted by replacing the server route; keep server-side validation and do not expose privileged keys.

## SEO and launch settings

The canonical production domain is `https://amritagautam.online`. Set `NEXT_PUBLIC_SITE_URL=https://amritagautam.online` in the deployment environment, without a trailing slash. Metadata, Open Graph image, manifest, sitemap, robots rules, and verified-only JSON-LD are generated through Next.js.

Before launch:

- replace placeholder content and remove unused placeholder records;
- confirm canonical URLs and preview social cards;
- verify heading order, alt text, and link names;
- test keyboard-only navigation, the mobile menu, lightbox, form errors, dark mode, 200% zoom, and reduced motion;
- run Lighthouse and axe in production mode;
- review the privacy notice and security headers against the deployed email/analytics services.

## Deploy to Vercel

1. Push the project to a private or public Git repository.
2. Import it into Vercel as a Next.js project.
3. Add the environment variables from `.env.example` in Project Settings.
4. Deploy a preview and keep it non-indexed while placeholders remain.
5. Run the quality checks above, test form delivery, then connect the final domain and redeploy.

The footer identifies this as Amrita Gautam’s personal portfolio and explicitly states that it is not an official Dr. RMLIMS website and does not imply institutional endorsement.
