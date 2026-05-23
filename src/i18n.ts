import { createI18n } from 'vue-i18n';
import cs from './locales/cs.json';
import en from './locales/en.json';
import uk from './locales/uk.json';

type Locale = 'cs' | 'en' | 'uk';

function detectLocale(): Locale {
    if (typeof window === 'undefined') return 'cs';
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/uk')) return 'uk';
    const stored = localStorage.getItem('user-locale') as Locale | null;
    return stored === 'en' || stored === 'uk' || stored === 'cs' ? stored : 'cs';
}

const initialLocale = detectLocale();
if (typeof window !== 'undefined') {
    localStorage.setItem('user-locale', initialLocale);
}

const i18n = createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'cs',
    messages: {
        cs,
        en,
        uk
    } as any
});

export default i18n;
