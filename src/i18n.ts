import { createI18n } from 'vue-i18n';
import cs from './locales/cs.json';

const i18n = createI18n({
    locale: 'cs',
    fallbackLocale: 'cs',
    messages: {
        cs
    },
    legacy: false, // Use Composition API mode
    globalInjection: true // Allow usage of $t globally
});

export default i18n;
