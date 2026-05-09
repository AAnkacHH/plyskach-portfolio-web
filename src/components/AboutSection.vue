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
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <CertificateCard
                        v-for="(cert, i) in certs"
                        :key="i"
                        :title="cert.title"
                        :issuer="cert.issuer"
                        :year="cert.year"
                        data-aos="fade-up"
                        :data-aos-delay="i * 150"
                    />
                </div>

                <p class="text-center text-sm text-gray-600 mt-12 italic">{{ t('about.certs_footer') }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';
import SectionHero from './editorial/SectionHero.vue';
import AboutProfile from './about/AboutProfile.vue';
import CertificateCard from './about/CertificateCard.vue';

const { scrollToSection } = useScrollToSection();
const { t, tm, rt } = useI18n();

const certs = computed(() =>
    tm('about.certs.items').map((c) => ({
        title: rt(c.title),
        issuer: rt(c.issuer),
        year: rt(c.year)
    }))
);
</script>
