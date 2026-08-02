# Amrita Gautam — Professional Portfolio

A production-oriented healthcare portfolio built with Next.js 15, the App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

The current content intentionally distinguishes verified facts from editable placeholders. It does not claim unverified dates, awards, or metrics.

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

- `profile.ts`: identity, biography, professional context, and navigation
- `skills.ts`: technical skills, professional strengths, laboratory expertise
- `experience.ts`: dates, department, unit, and responsibilities
- `achievements.ts`: professional commitments and formal achievements
- `gallery.ts`: approved image paths, captions, alt text, and categories
- `statistics.ts`: content counts only; do not add unverified performance or patient metrics

Replace every `isPlaceholder`, `status: "placeholder"`, or “Add …” value only with information Amrita has reviewed.

## Assets

### Profile photo

The current portrait is imported from `Amrita_Gautam454.jpeg` in `components/sections/Hero.tsx`. Replace that asset and update the import/alt text if a different approved portrait is preferred. Publish personal imagery only with Amrita's consent.

### Gallery

Add privacy-safe images to `public/images/gallery/`, then update `data/gallery.ts`. Never publish patient faces, wristbands, medical records, reports, test results, specimen labels, hospital IDs, screens, or confidential work areas. Use `next/image`-compatible dimensions and meaningful alt text.

## SEO and launch settings

The canonical production domain is `https://amritagautam.online`. Set `NEXT_PUBLIC_SITE_URL=https://amritagautam.online` in the deployment environment, without a trailing slash. Metadata, Open Graph image, manifest, sitemap, robots rules, and verified-only JSON-LD are generated through Next.js.

Before launch:

- replace placeholder content and remove unused placeholder records;
- confirm canonical URLs and preview social cards;
- verify heading order, alt text, and link names;
- test keyboard-only navigation, the mobile menu, lightbox, dark mode, 200% zoom, and reduced motion;
- run Lighthouse and axe in production mode;
- review security headers against any deployed analytics services.

## Deploy to Vercel

1. Push the project to a private or public Git repository.
2. Import it into Vercel as a Next.js project.
3. Add the environment variables from `.env.example` in Project Settings.
4. Deploy a preview and keep it non-indexed while placeholders remain.
5. Run the quality checks above, then connect the final domain and redeploy.

The footer identifies this as Amrita Gautam’s personal portfolio and explicitly states that it is not an official Dr. RMLIMS website and does not imply institutional endorsement.
