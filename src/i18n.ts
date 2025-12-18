import { createI18n } from 'vue-i18n';
import cs from './locales/cs.json';
import en from './locales/en.json';
import uk from './locales/uk.json';

// Get persisted locale or default to 'cs'
const savedLocale = localStorage.getItem('user-locale') || 'cs';

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: savedLocale,
    fallbackLocale: 'cs',
    messages: {
        cs,
        en,
        uk
    } as any
});

export default i18n;
