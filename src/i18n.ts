import { createI18n } from 'vue-i18n';
import cs from './locales/cs.json';

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: 'cs',
    fallbackLocale: 'cs',
    messages: {
        cs
    } as any
});

export default i18n;
