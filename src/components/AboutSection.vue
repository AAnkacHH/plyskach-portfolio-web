<template>
    <section id="about" class="scroll-mt-28">
        <!-- Hero (left-aligned, tall) -->
        <div class="relative w-full h-[500px] flex items-center container mx-auto px-6 md:px-12 lg:px-20">
            <div class="text-white max-w-2xl" data-aos="fade-up">
                <h2 class="text-5xl md:text-6xl font-bold uppercase mb-4 tracking-wide">{{ t('about.title') }}</h2>
                <p class="text-xl md:text-2xl font-light opacity-90">
                    {{ t('about.subtitle_line1') }} <br/>
                    {{ t('about.subtitle_line2') }}
                </p>
            </div>
        </div>

        <!-- Profile (paper) -->
        <div class="paper-canvas relative w-full">
            <div class="grain absolute inset-0 pointer-events-none"></div>
            <div class="relative container mx-auto px-6 md:px-12 lg:px-20 py-20">
                <AboutProfile
                    :name="t('about.person_name')"
                    :role="t('about.person_role')"
                    :bio1="t('about.bio_p1')"
                    :bio2="t('about.bio_p2')"
                    :bio3="t('about.bio_p3')"
                    :contact-btn="t('about.contact_btn')"
                    @contact="scrollToSection('#contact')"
                />
            </div>
        </div>

        <!-- Certificates: dark hero strip -->
        <SectionHero
            :title="t('about.certs_title')"
            :subtitle="t('about.certs_subtitle')"
        />

        <!-- Certificate cards (paper) -->
        <div class="paper-canvas relative w-full py-16">
            <div class="grain absolute inset-0 pointer-events-none"></div>
            <div class="relative container mx-auto px-6 md:px-12 lg:px-20">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    <CertificateCard
                        v-for="(cert, i) in certs"
                        :key="cert.slug"
                        :title="cert.title"
                        :subtitle="cert.subtitle"
                        :issuer="cert.issuer"
                        :year="cert.yearRange"
                        :thumb="cert.thumb"
                        :alt="cert.alt"
                        :width="cert.width"
                        :height="cert.height"
                        :view-label="t('about.certs.view_label')"
                        :session-count="cert.sessionCount"
                        :sessions-text="cert.sessionCount && cert.sessionCount > 1
                            ? t('about.certs.sessions_label', { count: cert.sessionCount })
                            : ''"
                        data-aos="fade-up"
                        :data-aos-delay="i * 120"
                        @open="openCert(i)"
                    />
                </div>

                <p class="text-center text-sm text-gray-600 mt-12 italic">{{ t('about.certs_footer') }}</p>
            </div>
        </div>

        <CertificateModal
            v-if="activeCert"
            :open="modalOpen"
            :title="activeCert.title"
            :subtitle="activeCert.subtitle"
            :image="activeCert.image"
            :alt="activeCert.alt"
            :width="activeCert.width"
            :height="activeCert.height"
            :dates-full="activeCert.datesFull"
            :issuer-url="activeCert.issuerUrl"
            :course-label="t('about.certs.course_label')"
            :issued-label="t('about.certs.issued_label')"
            :issuer-link-label="t('about.certs.issuer_link_label')"
            :close-label="t('about.certs.close_label')"
            @update:open="modalOpen = $event"
        />
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';
import SectionHero from './editorial/SectionHero.vue';
import AboutProfile from './about/AboutProfile.vue';
import CertificateCard from './about/CertificateCard.vue';
import CertificateModal from './about/CertificateModal.vue';
import { CERTIFICATES } from '../constants/certificates';

const { scrollToSection } = useScrollToSection();
const { t, tm, rt } = useI18n();

interface CertItem {
    slug: string;
    title: string;
    subtitle: string;
    issuer: string;
    alt: string;
    image: string;
    thumb: string;
    width: number;
    height: number;
    datesFull: string;
    yearRange: string;
    issuerUrl: string;
    sessionCount?: number;
}

const certs = computed<CertItem[]>(() => {
    const items = tm('about.certs.items') as Array<Record<string, string>>;
    return CERTIFICATES.map((meta, i) => {
        const item = items[i] ?? {};
        return {
            slug: meta.slug,
            title: rt(item.title ?? ''),
            subtitle: rt(item.subtitle ?? ''),
            issuer: rt(item.issuer ?? ''),
            alt: rt(item.alt ?? ''),
            image: meta.image,
            thumb: meta.thumb,
            width: meta.width,
            height: meta.height,
            datesFull: meta.datesFull,
            yearRange: meta.yearRange,
            issuerUrl: meta.issuerUrl,
            sessionCount: meta.sessionCount
        };
    });
});

const modalOpen = ref(false);
const activeIndex = ref<number | null>(null);
const activeCert = computed(() => (activeIndex.value !== null ? certs.value[activeIndex.value] : null));

const openCert = (i: number) => {
    activeIndex.value = i;
    modalOpen.value = true;
};
</script>
