# plyskach-portfolio-web

> Multilingual portfolio site for a Prague-based mason. Vue 3 + Vite + Cloudflare Pages.

<p>
  <a href="https://github.com/AAnkacHH/plyskach-portfolio-web/actions/workflows/deploy.yml">
    <img alt="Deploy" src="https://github.com/AAnkacHH/plyskach-portfolio-web/actions/workflows/deploy.yml/badge.svg?branch=main">
  </a>
  <a href="https://github.com/AAnkacHH/plyskach-portfolio-web/actions/workflows/e2e.yml">
    <img alt="E2E" src="https://github.com/AAnkacHH/plyskach-portfolio-web/actions/workflows/e2e.yml/badge.svg?branch=main">
  </a>
  <img alt="Vue 3" src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white">
</p>

**Live:** <https://mykhayloplyskach.com>

A statically-rendered single-page application with a hand-written editorial design system, full multilingual SEO (Schema.org graph, hreflang, per-locale OG/Twitter, sitemap), and a serverless contact pipeline that sends both an owner notification and a branded acknowledgement to the visitor.

---

## Features

- **Three languages** — Czech (default), English, Ukrainian. Localized routes, content, OG tags and JSON-LD.
- **Editorial design system** — Custom CSS layer (`src/assets/editorial.css`) with paper texture, register marks, and the `EditorialStamp` / `EditorialRule` primitives reused across modals and section heroes.
- **Lightbox gallery** — Dedicated `/galerie` route with a `MapModal`-styled lightbox: arrow-key navigation, click-to-advance, focus trap, image preloading, `prefers-reduced-motion`.
- **Dual-email contact flow** — Pages Function proxies to an external `email-processor` Worker that sends an owner notification and a visitor acknowledgement in parallel.
- **Hidden email preview** — `/__email-preview` renders the HTML templates in an isolated iframe with locale + template toggles. Excluded from `robots.txt`.
- **SEO graph** — `Person` + `ProfessionalService` + `WebSite` + `Organization` JSON-LD wired through `@id`, with per-locale `inLanguage`, canonical URLs and `Organization.logo` for Gmail sender avatars.
- **E2E smoke tests** — Playwright in CI covering all three locales, the gallery lightbox and the SPA catch-all.

---

## Tech stack

| Layer        | Choice                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------ |
| Framework    | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)                            |
| Build        | [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) (`vue-tsc`)  |
| Styling      | [Tailwind CSS 3](https://tailwindcss.com/) + a custom editorial layer                      |
| Routing      | [vue-router 4](https://router.vuejs.org/) — history mode, locale-prefixed paths            |
| i18n         | [vue-i18n 11](https://vue-i18n.intlify.dev/) — cs · en · uk                                |
| Motion       | [AOS](https://michalsnik.github.io/aos/) + [vue3-carousel](https://ismail9k.github.io/vue3-carousel/) |
| Hosting      | [Cloudflare Pages](https://pages.cloudflare.com/) (Direct Upload via Wrangler)             |
| Serverless   | Cloudflare Pages Function → external `email-processor` Worker → Brevo                      |
| CI           | GitHub Actions — `deploy.yml` (Cloudflare) + `e2e.yml` (Playwright)                        |
| Testing      | [Playwright](https://playwright.dev/) — smoke tests against `vite preview`                 |

---

## Quick start

```bash
git clone git@github.com:AAnkacHH/plyskach-portfolio-web.git
cd plyskach-portfolio-web
npm install
npm run dev          # http://localhost:5173
```

`npm run dev` boots the Vite dev server only — the contact form posts to `/api/send-email`, which lives inside the Cloudflare Pages Function and only resolves on the deployed site. For local API testing, run `npm run build` followed by `npx wrangler pages dev dist` and supply `SEND_SECRET` via `.dev.vars`.

### Scripts

| Command            | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `npm run dev`      | Vite dev server with HMR                                                  |
| `npm run build`    | `vue-tsc` typecheck → `vite build` → `scripts/generate-locales.mjs`       |
| `npm run preview`  | Serve the production build locally (port 4173)                            |
| `npm run lint`     | ESLint on `.js / .ts / .vue` files                                        |
| `npm run test:e2e` | Playwright smoke suite (boots `vite preview` automatically)               |

---

## Project structure

```
.
├── .github/workflows/
│   ├── deploy.yml             # Cloudflare Pages deploy on push to main
│   └── e2e.yml                # Playwright smoke tests on PR + push
├── docs/                      # Internal implementation notes
├── functions/api/
│   └── send-email.ts          # Cloudflare Pages Function (dual-email proxy)
├── public/
│   ├── _headers               # Security + cache headers for Cloudflare Pages
│   ├── _redirects             # SPA fallback for vue-router
│   ├── gallery/               # Project photos (.webp)
│   ├── certificates/          # Training certificates + thumbnails
│   ├── robots.txt             # Allow-all (incl. AI crawlers), excludes /__email-preview
│   └── sitemap.xml            # 15 URLs, full hreflang matrix
├── scripts/
│   ├── seo-content.mjs        # Single source of truth for per-locale SEO meta
│   └── generate-locales.mjs   # Postbuild: derives dist/en + dist/uk from dist/index.html
├── src/
│   ├── App.vue                # Layout shell (fixed hero background + Suspense)
│   ├── main.ts, router.ts, i18n.ts
│   ├── assets/
│   │   ├── tailwind.css
│   │   └── editorial.css      # Paper, grain, register marks, type system
│   ├── components/
│   │   ├── HomePage.vue, NavBar.vue, Footer.vue, BackToTop.vue
│   │   ├── HeroSection.vue, AboutSection.vue, ServicesSection.vue
│   │   ├── LatestProjSection.vue, GalleryPage.vue, ContactSection.vue
│   │   ├── TestimonialsSection.vue, ExperienceAndSkills.vue
│   │   ├── EmailPreview.vue   # /__email-preview
│   │   ├── about/             # AboutProfile, CertificateCard, CertificateModal
│   │   ├── contact/           # ContactRegisterRow, InquiryFormField, MapModal
│   │   ├── editorial/         # SectionHero, EditorialRule, EditorialStamp
│   │   ├── gallery/           # GalleryModal — lightbox in the MapModal house style
│   │   └── legal/             # LegalLayout, LegalHero, PrivacyPolicy, TermsOfUse, LegalNotice
│   ├── lib/
│   │   ├── emailTemplates.js  # Owner + acknowledgement HTML templates
│   │   ├── gallery.ts         # Shared gallery dataset (sources + captions per locale)
│   │   ├── scrollToSection.ts
│   │   └── useModalLock.ts
│   ├── constants/             # certificates.ts, icons.ts
│   └── locales/{cs,en,uk}.json
├── tests/
│   └── smoke.spec.ts          # Playwright critical-path tests
├── index.html                 # Source HTML with baked-in CZ SEO + JSON-LD graph
├── playwright.config.ts
├── wrangler.toml              # Cloudflare Pages project metadata
├── vite.config.ts, tsconfig*.json, tailwind.config.js, postcss.config.js
└── LICENSE
```

---

## Routing & i18n

Czech is the default locale and lives at the root path. English and Ukrainian are prefixed.

| Path                                                          | Locale |
| ------------------------------------------------------------- | ------ |
| `/`, `/galerie`, `/privacy`, `/terms`, `/legal-notice`        | `cs`   |
| `/en`, `/en/galerie`, `/en/privacy`, `/en/terms`, `/en/legal-notice` | `en`   |
| `/uk`, `/uk/galerie`, `/uk/privacy`, `/uk/terms`, `/uk/legal-notice` | `uk`   |
| `/__email-preview`                                            | dev    |

`router.beforeEach` syncs `i18n.global.locale` with `route.meta.locale` and persists the choice to `localStorage` (`user-locale`). Helper `localePath('/galerie')` resolves to the current locale's variant — used by all internal `<RouterLink>` references.

### Adding a locale

1. Create `src/locales/<code>.json` (copy `en.json` as a template).
2. Register it in `src/i18n.ts` (`messages`) and `src/router.ts` (`LOCALES` + `makeLocalisedRoutes`).
3. Add a switcher entry in `src/components/NavBar.vue`.
4. Add the locale to `scripts/seo-content.mjs` → `LOCALES` (title, description, ogLocale, ...). The postbuild generates `dist/<code>/index.html` automatically.
5. Append the new URLs to `public/sitemap.xml` (one entry per route, hreflang fully cross-linked).

---

## Email pipeline

The contact form fires a single request to `/api/send-email` (Cloudflare Pages Function) with the payload:

```ts
{
  owner:   { subject, html },
  visitor: { to, subject, html },
  attachments?: { filename, content /* base64 */ }[]
}
```

`functions/api/send-email.ts`:

1. Validates payload shape, visitor email regex, max 5 attachments × 4 MB.
2. Forwards two `POST /send` requests in parallel to the external Worker `email-processor` with `Authorization: Bearer ${SEND_SECRET}`.
3. Returns `502` if the owner mail fails. A visitor-ack failure is logged but does not surface to the user.

The Worker handles Brevo Transactional API integration and DKIM signing — it lives in a separate repo.

### Environment variables

Set on **Cloudflare Pages → Settings → Environment variables**:

| Variable              | Required | Purpose                                                                  |
| --------------------- | -------- | ------------------------------------------------------------------------ |
| `SEND_SECRET`         | yes      | Bearer secret shared with the `email-processor` Worker                   |
| `EMAIL_PROCESSOR_URL` | no       | Overrides the default Worker URL                                         |

---

## SEO & structured data

- **JSON-LD graph** in `index.html` — `Person`, `ProfessionalService`, `WebSite`, `Organization`, linked via `@id`. The postbuild rewrites `WebSite.inLanguage` and canonical URLs per locale.
- **hreflang** in both `<head>` and `sitemap.xml`, with `x-default → /`.
- **Per-locale OG / Twitter** — title, description, `og:locale`, image alt, site name.
- **`Organization.logo`** points at `/logo-512.png` so Gmail shows a sender avatar for outbound mail.
- **`public/_headers`** — `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, and `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`.
- **`public/robots.txt`** — allow-all (incl. `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot`). `/__email-preview` is excluded.
- **`public/sitemap.xml`** — 15 URLs × full hreflang matrix.

> Edit SEO data **only** in `scripts/seo-content.mjs` and the CZ baseline in `index.html`. The postbuild guarantees cross-locale consistency.

---

## Testing

```bash
npm run build      # smoke tests run against the built dist via vite preview
npm run test:e2e
```

The Playwright suite (`tests/smoke.spec.ts`) covers:

- Homepage loads on `/`, `/en`, `/uk` with the correct title and gallery CTA.
- `/galerie`, `/en/galerie`, `/uk/galerie` each render the full 7-photo grid.
- Lightbox open → `ArrowRight` → `ArrowLeft` wrap-around → `Escape` closes.
- SPA catch-all: unknown paths redirect to `/`.

CI runs the suite on every PR and every push to `main`. The HTML report is uploaded as an artifact on failure (`playwright-report/`, 7-day retention).

---

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:

```yaml
- npm install --no-audit --no-fund
- npm run build
- wrangler pages deploy dist --project-name=mykhayloplyskach --branch=main
```

### Required GitHub secrets

| Secret                  | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | API token with `Pages:Edit` permission                 |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID                              |

The Cloudflare Pages project (`mykhayloplyskach`) is configured for Direct Upload — there is **no Git integration on the Cloudflare side** to avoid a second deploy pipeline.

---

## License & contact

- Source code: see [LICENSE](./LICENSE).
- Site content (text, photos, certificates) belongs to Mykhaylo Plyskach and is not licensed for reuse.
- Public site: <https://mykhayloplyskach.com>
- Contact: <info@mykhayloplyskach.com> · +420 777 444 973

---

<sub>Built by [Andrii Plyskach](https://ankach.com).</sub>
