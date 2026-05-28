import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import i18n from './i18n';

const HomePage = () => import('./components/HomePage.vue');
const PrivacyPolicy = () => import('./components/legal/PrivacyPolicy.vue');
const TermsOfUse = () => import('./components/legal/TermsOfUse.vue');
const LegalNotice = () => import('./components/legal/LegalNotice.vue');
const GalleryPage = () => import('./components/GalleryPage.vue');
const EmailPreview = () => import('./components/EmailPreview.vue');

type Locale = 'cs' | 'en' | 'uk';
const LOCALES: Locale[] = ['cs', 'en', 'uk'];

function makeLocalisedRoutes(prefix: string, locale: Locale): RouteRecordRaw[] {
    return [
        { path: `${prefix}`, component: HomePage, meta: { locale } },
        { path: `${prefix}/galerie`, component: GalleryPage, meta: { locale } },
        { path: `${prefix}/privacy`, component: PrivacyPolicy, meta: { locale } },
        { path: `${prefix}/terms`, component: TermsOfUse, meta: { locale } },
        { path: `${prefix}/legal-notice`, component: LegalNotice, meta: { locale } },
    ];
}

const routes: RouteRecordRaw[] = [
    ...makeLocalisedRoutes('', 'cs'),
    ...makeLocalisedRoutes('/en', 'en'),
    ...makeLocalisedRoutes('/uk', 'uk'),
    { path: '/__email-preview', component: EmailPreview },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _from, saved) {
        if (saved) return saved;
        if (to.hash) {
            return { el: to.hash, top: 80, behavior: 'smooth' };
        }
        return { top: 0 };
    },
});

router.beforeEach((to) => {
    const locale = (to.meta?.locale as Locale | undefined) ?? 'cs';
    if (LOCALES.includes(locale) && i18n.global.locale.value !== locale) {
        i18n.global.locale.value = locale;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user-locale', locale);
        }
    }
});

export function localePath(path: string): string {
    const locale = i18n.global.locale.value as Locale;
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (locale === 'cs') return clean === '/' ? '/' : clean;
    const base = `/${locale}`;
    return clean === '/' ? base : `${base}${clean}`;
}

export default router;
