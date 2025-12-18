<template>
  <section class="relative w-full h-[600px] md:h-[700px]" id="home">
    <!-- Background Content Removed to show Global Fixed Background -->
    <!-- The global background in App.vue handles the image and overlay -->

    <!-- Content -->
    <div class="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div class="max-w-3xl" data-aos="fade-up">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide mb-6">
                {{ $t('hero.title_line1') }} <br/>
                {{ $t('hero.title_line2') }}
            </h1>
            
            <button 
                @click="scrollToSection('#contact')"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-sm shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
                {{ $t('hero.cta_btn') }}
            </button>
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

const { scrollToSection } = useScrollToSection();

onMounted(() => {
    AOS.init({
        duration: 800,
        once: true,
    });
});
</script>

<style scoped>
/* Ensure the font matches a clean sans-serif like the screenshot */
h1 {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style>