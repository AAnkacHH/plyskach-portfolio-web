// Single source of truth for SEO metadata used by index.html (build-time replacement)
// and the generate-locales.mjs postbuild script.

export const SITE_URL = 'https://mykhayloplyskach.com';

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PERSON = {
  name: 'Mykhaylo Plyskach',
  givenName: 'Mykhaylo',
  familyName: 'Plyskach',
  alternateName: ['Plyskach', 'Mykhaylo Plyskach', 'Михайло Плискач'],
  jobTitle: 'Zedník — OSVČ',
  image: `${SITE_URL}/profile.webp`,
  email: 'mailto:maria.andrej@centrum.cz',
  telephone: '+420777444973',
  sameAs: [
    'https://www.firemniprofil.cz/firma/61893801/mykhaylo-plyskach',
  ],
};

export const BUSINESS = {
  name: 'Mykhaylo Plyskach — Zednictví',
  alternateName: ['Plyskach Zednictví'],
  taxID: 'CZ26369524',
  ico: '26369524',
  telephone: '+420777444973',
  email: 'mailto:maria.andrej@centrum.cz',
  address: {
    streetAddress: 'Na líše 1231/11',
    addressLocality: 'Praha 4 - Michle',
    postalCode: '141 00',
    addressCountry: 'CZ',
  },
  areaServed: ['Praha', 'Středočeský kraj'],
  serviceType: [
    'Zednické práce',
    'Obklady a dlažba',
    'Fasády a zateplení',
    'Omítky',
    'Rekonstrukce',
  ],
  openingHours: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
};

// Locale metadata. `path` is the URL prefix; CS is the root.
export const LOCALES = {
  cs: {
    lang: 'cs',
    path: '/',
    ogLocale: 'cs_CZ',
    title: 'Mykhaylo Plyskach — Zednické práce, obklady a fasády | Praha',
    description: 'Mykhaylo Plyskach — zedník s 25 lety praxe. Zednické práce, obklady, fasády a zateplení v Praze a Středočeském kraji. IČO 26369524.',
    ogImageAlt: 'Mykhaylo Plyskach — zedník, Praha',
    siteName: 'Mykhaylo Plyskach — Zednictví',
    personDescription: 'Zedník s 25 lety praxe ve stavebnictví. Zednické práce, obklady a fasády v Praze a Středočeském kraji.',
    websiteDescription: 'Portfolio a kontakt pro zednické práce, obklady a fasády v Praze.',
  },
  en: {
    lang: 'en',
    path: '/en/',
    ogLocale: 'en_US',
    title: 'Mykhaylo Plyskach — Masonry, Tiling & Facades | Prague',
    description: 'Mykhaylo Plyskach — mason with 25 years of experience. Masonry, tiling, facades and insulation in Prague and the Central Bohemia region.',
    ogImageAlt: 'Mykhaylo Plyskach — mason, Prague',
    siteName: 'Mykhaylo Plyskach — Masonry',
    personDescription: 'Mason with 25 years of experience in construction. Masonry, tiling and facades in Prague and Central Bohemia.',
    websiteDescription: 'Portfolio and contact for masonry, tiling and facade work in Prague.',
  },
  uk: {
    lang: 'uk',
    path: '/uk/',
    ogLocale: 'uk_UA',
    title: 'Михайло Плискач — Мурування, плитка, фасади | Прага',
    description: 'Михайло Плискач — муляр з 25-річним досвідом. Мурування, плитка, фасади та утеплення в Празі та Середній Чехії.',
    ogImageAlt: 'Михайло Плискач — муляр, Прага',
    siteName: 'Михайло Плискач — Мурування',
    personDescription: 'Муляр з 25-річним досвідом у будівництві. Мурування, плитка та фасади в Празі та Середній Чехії.',
    websiteDescription: 'Портфоліо та контакти для мурування, плитки та фасадних робіт у Празі.',
  },
};

export const LOCALE_KEYS = Object.keys(LOCALES);

// Helpers for generating absolute URLs per locale.
export function localeUrl(localeKey) {
  const path = LOCALES[localeKey].path;
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, '')}`;
}
