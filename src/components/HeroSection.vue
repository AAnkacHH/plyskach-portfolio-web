<template>
  <section class="relative w-full h-[600px] md:h-[700px]" id="home">
    <!-- Background Content Removed to show Global Fixed Background -->
    <!-- The global background in App.vue handles the image and overlay -->

    <!-- Content -->
    <div class="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div class="max-w-3xl" data-aos="fade-up">
            <!-- Trust badge -->
            <a
                href="https://www.firemniprofil.cz/firma/61893801/mykhaylo-plyskach"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${t('trust_badge.label')} — ${t('trust_badge.source')}`"
                class="trust-badge inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 hover:border-white/40 rounded-full px-4 py-1.5 mb-6 text-white text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f57d1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1219]"
            >
                <svg class="w-4 h-4 text-[#f57d1f]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span class="font-medium">{{ t('trust_badge.label') }}</span>
                <span class="opacity-70">·</span>
                <span class="opacity-70 underline-offset-2 group-hover:underline">{{ t('trust_badge.source') }}</span>
                <svg class="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>

            <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase tracking-tight mb-4">
                {{ t('hero.title_line1') }}
            </h1>

            <p class="hero-location font-display text-lg md:text-xl lg:text-2xl text-[#f57d1f] font-medium uppercase tracking-wider mb-6 flex items-center gap-3">
                <span class="inline-block w-10 h-[2px] bg-[#f57d1f]"></span>
                {{ t('hero.title_line2') }}
            </p>

            <p class="text-base md:text-lg text-white/85 mb-8 max-w-2xl leading-relaxed">
                {{ t('hero.subtitle') }}
            </p>

            <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                    @click="scrollToSection('#contact')"
                    class="bg-[#f57d1f] hover:bg-[#e06c10] text-white font-semibold py-4 px-8 rounded-sm shadow-lg transition-transform transform hover:-translate-y-0.5"
                >
                    {{ t('hero.cta_btn') }}
                </button>

                <a
                    :href="`tel:+420${t('hero.cta_phone').replace(/\s/g, '')}`"
                    class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-semibold py-4 px-8 rounded-sm transition-colors"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                    {{ t('hero.cta_phone') }}
                </a>
            </div>
        </div>
    </div>
  </section>
  
  <!-- "Naše Služby" header section as seen in the bottom of the screenshot, 
       although user said "ignore my services", the screenshot shows the header right below the hero.
       We will include just the spacing or visual break if needed, but for now strictly the Hero.
  -->
</template>

<script setup>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue';
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';

const { scrollToSection } = useScrollToSection();
const { t } = useI18n();

onMounted(() => {
    AOS.init({
        duration: 800,
        once: true,
    });
});
</script>

<style scoped>
/* Display heading: Oswald condensed for "construction trade" character */
h1 {
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

/* Location line: smaller display, orange accent with leading rule */
.hero-location {
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
}
</style>