// Postbuild: generate dist/en/index.html and dist/uk/index.html from dist/index.html
// by replacing per-locale meta tags, canonical, hreflang already match, OG, Twitter,
// and mutating JSON-LD inLanguage fields.
//
// Runs after `vite build`. Reads dist/index.html (built CS version with full SEO baked
// in by Agent C's index.html). For each non-default locale, writes a sibling HTML.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, SITE_URL, localeUrl } from './seo-content.mjs';

const DIST_DIR = join(process.cwd(), 'dist');
const SOURCE_HTML = join(DIST_DIR, 'index.html');

if (!existsSync(SOURCE_HTML)) {
  console.error(`[generate-locales] dist/index.html not found at ${SOURCE_HTML}`);
  console.error('[generate-locales] did `vite build` run successfully?');
  process.exit(1);
}

const baseHtml = readFileSync(SOURCE_HTML, 'utf8');

const CS = LOCALES.cs;

// Sanity: the base HTML must contain the CS markers we expect to replace.
const markers = [
  `<html lang="${CS.lang}"`,
  `<title>${CS.title}</title>`,
  `content="${CS.description}"`,
  `<link rel="canonical" href="${SITE_URL}/"`,
];
for (const m of markers) {
  if (!baseHtml.includes(m)) {
    console.error(`[generate-locales] expected marker not found in dist/index.html:\n  ${m}`);
    console.error('[generate-locales] index.html may have been edited without updating this script.');
    process.exit(1);
  }
}

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function replaceFirst(haystack, needle, replacement) {
  const re = new RegExp(escapeRegExp(needle));
  return haystack.replace(re, replacement);
}

function replaceAll(haystack, needle, replacement) {
  const re = new RegExp(escapeRegExp(needle), 'g');
  return haystack.replace(re, replacement);
}

function mutateJsonLd(html, localeKey) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = html.match(re);
  if (!match) return html;

  let data;
  try {
    data = JSON.parse(match[1]);
  } catch (e) {
    console.error('[generate-locales] failed to parse JSON-LD block:', e.message);
    return html;
  }

  const lang = LOCALES[localeKey].lang;
  if (Array.isArray(data['@graph'])) {
    for (const node of data['@graph']) {
      if (node['@type'] === 'WebSite') {
        node.inLanguage = lang;
      }
      // For Person / ProfessionalService keep inLanguage as the full array — they remain
      // multilingual entities. Only WebSite represents the current document.
      if (node['@type'] === 'Person' && node.url) {
        node.url = localeUrl(localeKey);
        node.mainEntityOfPage = localeUrl(localeKey);
      }
      if (node['@type'] === 'WebSite' && node.url) {
        node.url = localeUrl(localeKey);
      }
    }
  }

  const out = JSON.stringify(data, null, 2);
  return html.replace(re, `<script type="application/ld+json">\n${out}\n    </script>`);
}

function generateForLocale(localeKey) {
  const L = LOCALES[localeKey];
  const url = localeUrl(localeKey);
  let html = baseHtml;

  // <html lang>
  html = replaceFirst(html, `<html lang="${CS.lang}"`, `<html lang="${L.lang}"`);

  // <title>
  html = replaceFirst(html, `<title>${CS.title}</title>`, `<title>${L.title}</title>`);

  // meta description / og:description / twitter:description / og:title / twitter:title
  // We replace specific content="..." strings. Description string appears 3x (meta, og, twitter).
  html = replaceAll(html, `content="${CS.description}"`, `content="${L.description}"`);
  html = replaceAll(html, `content="${CS.title}"`, `content="${L.title}"`);

  // canonical
  html = replaceFirst(
    html,
    `<link rel="canonical" href="${SITE_URL}/"`,
    `<link rel="canonical" href="${url}"`,
  );

  // og:url
  html = replaceFirst(
    html,
    `<meta property="og:url" content="${SITE_URL}/"`,
    `<meta property="og:url" content="${url}"`,
  );

  // og:locale (CS default is cs_CZ). og:locale:alternate entries stay as-is.
  html = replaceFirst(
    html,
    `<meta property="og:locale" content="${CS.ogLocale}"`,
    `<meta property="og:locale" content="${L.ogLocale}"`,
  );

  // og:site_name (translated)
  html = replaceFirst(
    html,
    `<meta property="og:site_name" content="${CS.siteName}"`,
    `<meta property="og:site_name" content="${L.siteName}"`,
  );

  // og:image:alt / twitter:image:alt (translated)
  html = replaceAll(
    html,
    `content="${CS.ogImageAlt}"`,
    `content="${L.ogImageAlt}"`,
  );

  // JSON-LD: mutate WebSite.inLanguage + WebSite/Person.url to current locale
  html = mutateJsonLd(html, localeKey);

  // Output path: dist/en/index.html, dist/uk/index.html
  const outDir = join(DIST_DIR, localeKey);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'index.html');
  writeFileSync(outPath, html, 'utf8');

  return { localeKey, outPath, bytes: Buffer.byteLength(html, 'utf8') };
}

const results = [];
for (const key of Object.keys(LOCALES)) {
  if (key === 'cs') continue; // CS is dist/index.html itself
  results.push(generateForLocale(key));
}

console.log('[generate-locales] postbuild OK');
for (const r of results) {
  console.log(`  → ${r.localeKey}  ${r.outPath}  (${(r.bytes/1024).toFixed(1)} KB)`);
}
