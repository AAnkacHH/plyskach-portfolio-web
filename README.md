# Plyskach Portfolio Web

Vícejazyčné portfolio pro řemeslníka **Mykhaylo Plyskach — Zednictví** (Praha, IČO 26369524).
Statická Vue 3 SPA s editorialním designem, kompletní SEO vrstvou (Person + ProfessionalService + WebSite + Organization JSON-LD, hreflang, sitemap), legal stránkami v ČJ/EN/UA a kontaktním formulářem nasazeným na Cloudflare Pages.

Produkce: **https://mykhayloplyskach.com**

---

## Tech stack

| Vrstva | Použito |
| --- | --- |
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build | [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) (`vue-tsc`) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + ruční editorialní CSS (`src/assets/editorial.css`) |
| Routing | [vue-router 4](https://router.vuejs.org/) (history mode, jazykově prefixované cesty) |
| i18n | [vue-i18n 11](https://vue-i18n.intlify.dev/) — cs / en / uk |
| Animace | [AOS](https://michalsnik.github.io/aos/), [vue3-carousel](https://ismail9k.github.io/vue3-carousel/) |
| Email API | Cloudflare Pages Function → externí Worker `email-processor` |
| Email šablony | Vlastní HTML šablony (`src/lib/emailTemplates.js`), dual-mail (owner + visitor ack) |
| Deployment | Cloudflare Pages přes GitHub Actions (`cloudflare/wrangler-action@v3`) |

---

## Rychlý start

```bash
git clone git@github.com:AAnkacHH/plyskach-portfolio-web.git
cd plyskach-portfolio-web
npm install
npm run dev          # http://localhost:5173
```

`npm run dev` spustí jen Vite frontend — kontaktní formulář v dev módu odesílá na `/api/send-email`, který existuje pouze v produkční Cloudflare Pages build. Pro lokální test API si nainstalujte **Wrangler** a spusťte `npx wrangler pages dev dist` po buildu (popsáno níže).

### Skripty

| Skript | Akce |
| --- | --- |
| `npm run dev` | Vite dev server (HMR, jen frontend) |
| `npm run build` | `vue-tsc` typecheck → `vite build` → `scripts/generate-locales.mjs` postbuild |
| `npm run preview` | Náhled buildu lokálně (statický) |
| `npm run lint` | ESLint pro `.js / .ts / .vue` |

---

## Build pipeline

`npm run build` provede tři kroky:

1. **`vue-tsc`** — kontrola typů (Vue + TS).
2. **`vite build`** — vyprodukuje `dist/index.html` s kompletní CZ verzí (meta, OG, Twitter, canonical, JSON-LD jsou zapečené v `index.html`).
3. **`scripts/generate-locales.mjs`** — postbuild. Načte `dist/index.html`, pro každý další jazyk z `scripts/seo-content.mjs` (en, uk) zduplikuje soubor a přepíše `<html lang>`, `<title>`, `meta description`, `og:*`, `twitter:*`, `canonical` a JSON-LD bloky (`WebSite.inLanguage`, `Person.url`). Výstup: `dist/en/index.html`, `dist/uk/index.html`.

Jediný zdroj pravdy pro per-locale SEO obsah je `scripts/seo-content.mjs` (`LOCALES`, `PERSON`, `BUSINESS`).

---

## Struktura projektu

```
.
├── api/send-email.js          # LEGACY Vercel/Nodemailer endpoint (není v provozu)
├── functions/api/send-email.ts# Cloudflare Pages Function — aktivní endpoint
├── public/
│   ├── _headers               # Cloudflare Pages — security + cache headers
│   ├── _redirects             # SPA fallback pro Vue Router
│   ├── robots.txt             # Allow-all (vč. AI crawlers)
│   ├── sitemap.xml            # 12 URL — 3 jazyky × 4 stránky
│   ├── gallery/               # Foto realizací (.webp)
│   └── certificates/          # Certifikáty + thumbnaily
├── scripts/
│   ├── seo-content.mjs        # Single source of truth pro SEO/i18n metadata
│   └── generate-locales.mjs   # Postbuild — generuje dist/en + dist/uk
├── src/
│   ├── App.vue                # Layout shell (fixed hero background + Suspense)
│   ├── main.ts                # Bootstrap: i18n + router
│   ├── router.ts              # Localised routes (cs default, /en, /uk) + /__email-preview
│   ├── i18n.ts                # vue-i18n setup, detekce lokality z URL/localStorage
│   ├── locales/{cs,en,uk}.json
│   ├── assets/
│   │   ├── tailwind.css       # Tailwind entry
│   │   └── editorial.css      # Globální editorialní styly (paper, grain, register…)
│   ├── lib/
│   │   ├── emailTemplates.js  # HTML šablony (owner + ack)
│   │   ├── scrollToSection.ts
│   │   └── useModalLock.ts
│   ├── constants/             # certificates.ts, icons.ts
│   └── components/
│       ├── HomePage.vue       # Skládá všechny sekce
│       ├── NavBar.vue         # Jazykový přepínač + nav
│       ├── HeroSection.vue
│       ├── AboutSection.vue
│       ├── ExperienceAndSkills.vue
│       ├── ServicesSection.vue
│       ├── LatestProjSection.vue
│       ├── TestimonialsSection.vue
│       ├── ContactSection.vue # Formulář + map modal + dual-email submit
│       ├── EmailPreview.vue   # /__email-preview (skrytá náhledová stránka)
│       ├── FilePreview.vue, BackToTop.vue, Footer.vue, loadingSpinner.vue
│       ├── about/             # AboutProfile, CertificateCard, CertificateModal
│       ├── contact/           # ContactRegisterRow, InquiryFormField, MapModal
│       ├── editorial/         # SectionHero, EditorialRule, EditorialStamp
│       └── legal/             # LegalLayout, LegalHero, PrivacyPolicy, TermsOfUse, LegalNotice
├── index.html                 # Zdrojový HTML s baked-in CZ SEO + JSON-LD graph
├── vite.config.ts, tsconfig*.json, tailwind.config.js, postcss.config.js
├── wrangler.toml              # Cloudflare Pages config (project = mykhayloplyskach)
├── vercel.json, genezio.yaml  # LEGACY — ponecháno pro případnou archivaci
└── .github/workflows/deploy.yml
```

---

## Routing & i18n

Tři jazyky, čeština je default (root path):

| URL | Lokalita |
| --- | --- |
| `/`, `/privacy`, `/terms`, `/legal-notice` | `cs` |
| `/en`, `/en/privacy`, `/en/terms`, `/en/legal-notice` | `en` |
| `/uk`, `/uk/privacy`, `/uk/terms`, `/uk/legal-notice` | `uk` |
| `/__email-preview` | Skrytý náhled email šablon (vyloučeno z `robots.txt`) |

Vue Router `beforeEach` synchronizuje `i18n.global.locale` s `route.meta.locale` a perzistuje volbu do `localStorage` (`user-locale`).

### Přidání jazyka

1. Vytvořte `src/locales/<code>.json` (zkopírujte `en.json` jako šablonu a přeložte).
2. Zaregistrujte v `src/i18n.ts` (`messages`) a v `src/router.ts` (přidejte do `LOCALES` + `makeLocalisedRoutes`).
3. Přidejte přepínač v `src/components/NavBar.vue`.
4. Přidejte záznam do `scripts/seo-content.mjs` → `LOCALES` (title, description, ogLocale, …) — postbuild ho automaticky vygeneruje do `dist/<code>/index.html`.
5. Doplňte URL do `public/sitemap.xml` (4 nové záznamy + hreflang ve všech ostatních).

---

## Email backend

Kontaktní formulář používá **dual-mail flow**:

- **Owner mail** — pošle se majiteli (`maria.andrej@centrum.cz`) s celou poptávkou a přílohami.
- **Visitor ack** — potvrzovací mail návštěvníkovi se shrnutím dotazu.

Frontend (`ContactSection.vue`) posílá `POST /api/send-email` s JSON payloadem `{ owner, visitor, attachments? }`. Endpoint je Cloudflare Pages Function `functions/api/send-email.ts`, která:

1. Validuje vstup (typy, délky, max 5 příloh × 4 MB base64, validní email u visitor).
2. Volá externí Cloudflare Worker `email-processor` (`https://email-processor.ankach-ua.workers.dev/send`) s `Authorization: Bearer ${SEND_SECRET}`.
3. Oba maily odesílá paralelně; selhání owner mailu → `502`, selhání ack mailu se jen loguje.

### Proměnné prostředí (Cloudflare Pages → Settings → Environment variables)

| Proměnná | Povinná | Účel |
| --- | --- | --- |
| `SEND_SECRET` | ano | Sdílené tajemství pro autorizaci proti `email-processor` Workeru |
| `EMAIL_PROCESSOR_URL` | ne | Override URL Workeru (default `https://email-processor.ankach-ua.workers.dev/send`) |

> `api/send-email.js`, `vercel.json` a `genezio.yaml` jsou ponechány v repu, ale neaktivní. Současná deploy cesta je výhradně Cloudflare Pages.

### Lokální vývoj API

```bash
npm run build
npx wrangler pages dev dist
# nastavte SEND_SECRET přes .dev.vars nebo --binding
```

---

## SEO & strukturovaná data

- **JSON-LD graph** v `index.html` — `Person`, `ProfessionalService`, `WebSite`, `Organization`, propojené přes `@id`. Postbuild upravuje `WebSite.inLanguage` a kanonické URL per locale.
- **hreflang** v `<head>` i v `sitemap.xml` pro všechny páry cs/en/uk + `x-default` → `/`.
- **Canonical** unikátní pro každou jazykovou variantu (postbuild krok).
- **OG/Twitter** přeloženy per locale (title, description, og:locale, image alt, site_name).
- **`public/_headers`** — `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`, `Cache-Control: public, max-age=31536000, immutable` pro `/assets/*`.
- **`public/robots.txt`** — povoluje všechny crawlery včetně AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot). Vyloučeno `/__email-preview`.
- **`public/sitemap.xml`** — 12 URL × hreflang alternates.

Editovat SEO data **vždy v `scripts/seo-content.mjs`** a v `index.html` (CZ varianta). Postbuild zajistí konzistenci napříč jazyky.

---

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) na každý push do `main`:

1. `npm install`
2. `npm run build`
3. `wrangler pages deploy dist --project-name=mykhayloplyskach --branch=main`

### GitHub Secrets

| Secret | Účel |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token s oprávněním `Pages:Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | ID Cloudflare účtu |

### Cloudflare Pages

- Project: `mykhayloplyskach` (`wrangler.toml`)
- Output: `dist/`
- Functions: `functions/api/send-email.ts` se automaticky deployuje jako `/api/send-email`
- Env vars: `SEND_SECRET` (viz výše)

---

## Legal & licence

- Stránky **Ochrana osobních údajů (GDPR) / Podmínky užití / Provozovatel (§ 435 OZ)** jsou v `src/components/legal/` ve všech třech jazycích.
- `public/.well-known/security.txt` (RFC 9116) — viz `_headers`.
- Kód projektu: viz [LICENSE](./LICENSE).
- Obsah (texty, fotografie realizací, certifikáty) je majetkem Mykhaylo Plyskach — nepoužívat bez souhlasu.

---

## Kontakt

- Web: https://mykhayloplyskach.com
- Veřejný email: info@mykhayloplyskach.com
- Telefon: +420 777 444 973
- IČO: 26369524 · Praha 4 — Michle

---

*Vyvinul Andrii Plyskach s asistencí AI nástrojů.*
