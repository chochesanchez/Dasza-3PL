# Dasza 3PL — dasza.com

Marketing site for **Dasza 3PL**, an IMMEX third-party logistics provider in Apodaca (Nuevo León) and Querétaro: customs brokerage, bonded warehousing, transportation and value-added services. It also hosts the **Dasza System** interactive demo at `/dasza-system`.

Live at **https://www.dasza.com** (English) and **https://www.dasza.com/es** (Spanish).

## Stack

- [Next.js 15](https://nextjs.org) App Router, React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- [Resend](https://resend.com) for form emails, [Zod](https://zod.dev) for validation
- Hosted on Vercel; every push to `main` deploys production, other branches get preview URLs

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Node 20 or newer.

## Environment variables

Set in Vercel → Project → Settings → Environment Variables (or `.env.local` for development). The site runs without any of them; forms then answer with an error and show the WhatsApp / email fallback.

| Variable | Used for | Default |
|---|---|---|
| `RESEND_API_KEY` | Sending contact, quote and demo emails | — (required for email) |
| `RESEND_FROM` | Sender address (domain verified in Resend) | `forms@dasza.com` |
| `LEADS_TO` | Comma-separated recipients for contact and quote leads | current sales inbox |
| `DEMO_LEADS_TO` | Recipients for Dasza System demo leads | `LEADS_TO` |
| `NEXT_PUBLIC_APP_URL` | Canonical site URL for sitemap, robots and metadata | `https://www.dasza.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (off when unset) | — |

## Structure

```
src/
  app/
    [lang]/            pages; English has no prefix, Spanish lives under /es
      dasza-system/    interactive demo (onboarding + sample client portal)
      quote/           three-step quote form + thank-you page
      services/[slug]/ one page per service
    api/contact/       contact and quote form handler
    api/demo-lead/     demo onboarding handler
    robots.ts, sitemap.ts
  components/          home sections, shared header/footer, UI, demo
  content/site.ts      company facts, figures, client logos, services
  i18n/                locale config and EN/ES dictionaries (es is type-checked against en)
  lib/                 mail, validation, bot filtering, site URL, phone countries
  middleware.ts        locale routing (/en/* → /, everything else → English)
public/
  images/site/         page photography
  images/Trusted By logos/
  videos/              home hero video (1080p and 720p, webm + mp4)
```

## Content

Company figures, addresses, certifications and client logos live in `src/content/site.ts`. Page copy lives in `src/i18n/dictionaries/en.ts` and `es.ts`. Any key added to `en.ts` has to be added to `es.ts` too, or the build fails.

## Contributing

One issue per change, a `feat/…` / `fix/…` / `chore/…` branch, [conventional commits](https://www.conventionalcommits.org), and a pull request to `main` that closes the issue.
