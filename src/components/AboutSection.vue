<template>
    <section id="about" class="scroll-mt-28">
        <!-- Hero Part: House background with O NAS text -->
        <!-- Background Content Removed to show Global Fixed Background -->
        <div class="relative w-full h-[500px] flex items-center container mx-auto px-6 md:px-12 lg:px-20">
            <div class="text-white max-w-2xl" data-aos="fade-up">
                <h2 class="text-5xl md:text-6xl font-bold uppercase mb-4 tracking-wide">{{ t('about.title') }}</h2>
                <p class="text-xl md:text-2xl font-light opacity-90">
                    {{ t('about.subtitle_line1') }} <br/>
                    {{ t('about.subtitle_line2') }}
                </p>
            </div>
        </div>

        <!-- Main Content Area (Full Width) -->
        <div class="about-paper relative w-full">
            <div class="grain absolute inset-0 pointer-events-none"></div>

            <!-- Profile Section -->
            <div class="relative container mx-auto px-6 md:px-12 lg:px-20 py-20">
                <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <!-- Profile Image -->
                    <div class="flex-shrink-0" data-aos="fade-right">
                        <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                             <!-- Fallback image since we might not have 'Jan Novak'. Using test.png or mobile.jpg as placeholder -->
                            <img
                                src="/profile.png"
                                alt="Mykhaylo Plyskach"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="text-center mt-6">
                            <h3 class="text-2xl font-bold text-gray-900">{{ t('about.person_name') }}</h3>
                            <p class="text-gray-600 font-medium">{{ t('about.person_role') }}</p>
                        </div>
                    </div>

                    <!-- Bio Text -->
                    <div class="max-w-2xl text-center md:text-left" data-aos="fade-left">
                        <p class="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                            {{ t('about.bio_p1') }}
                        </p>
                        <p class="text-gray-600 mb-6">
                            {{ t('about.bio_p2') }}
                        </p>
                        <p class="text-gray-600 mb-8">
                            {{ t('about.bio_p3') }}
                        </p>

                        <button
                             @click="scrollToSection('#contact')"
                            class="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-sm shadow-md transition-all"
                        >
                            {{ t('about.contact_btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Certificates Title Strip (shows global fixed background) -->
        <div class="relative w-full h-72 md:h-80 flex items-center justify-center text-center text-white px-4">
            <div class="relative z-10 max-w-3xl" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">{{ t('about.certs_title') }}</h2>
                <p class="text-base md:text-lg text-gray-200 leading-relaxed">{{ t('about.certs_subtitle') }}</p>
            </div>
        </div>

        <!-- Certificate Cards (paper) -->
        <div class="about-paper relative w-full py-16">
            <div class="grain absolute inset-0 pointer-events-none"></div>
            <div class="relative container mx-auto px-6 md:px-12 lg:px-20">
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div
                        v-for="(cert, i) in certs"
                        :key="i"
                        class="bg-white border border-gray-200 p-8 flex flex-col items-center text-center hover:border-[#f57d1f] transition-colors duration-300"
                        data-aos="fade-up"
                        :data-aos-delay="i * 150"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            class="w-12 h-12 text-[#f57d1f] mb-6"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">{{ cert.title }}</h3>
                        <p class="text-sm text-gray-600 mb-3">{{ cert.issuer }}</p>
                        <p class="text-xs text-gray-500 uppercase tracking-widest">{{ cert.year }}</p>
                    </div>
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

<style scoped>
.about-paper {
    background: #faf6ee;
}

.grain {
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.18;
    mix-blend-mode: multiply;
}
</style>
