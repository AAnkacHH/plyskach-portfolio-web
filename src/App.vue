<template>
  <div class="bg-[#0f1219] ">
    <!-- Wrap components in Suspense to handle loading -->
    <Suspense>
      <template #default>
        <!-- Wrap all components inside a single root element -->
        <div>
          <NavBar />
          <HeroSection />
          <ServicesSection />
          <LatestProjSection />
          <ContactSection />
          <AboutSection />
          <Footer />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <loadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
//Import components Asynchronously
const NavBar = defineAsyncComponent(()=>import('./components/NavBar.vue'));
const HeroSection = defineAsyncComponent(()=>import('./components/HeroSection.vue'));
const ServicesSection = defineAsyncComponent(()=>import('./components/ServicesSection.vue'));
const AboutSection = defineAsyncComponent(()=>import('./components/AboutSection.vue'));
const TestimonialsSection = defineAsyncComponent(()=>import('./components/TestimonialsSection.vue'));
const LatestProjSection = defineAsyncComponent(()=>import('./components/LatestProjSection.vue'));
// const ExperienceAndSkills = defineAsyncComponent(()=>import('./components/ExperienceAndSkills.vue'));
const ContactSection = defineAsyncComponent(()=>import('./components/ContactSection.vue'));
const Footer = defineAsyncComponent(()=>import('./components/Footer.vue'));
const BackToTop = defineAsyncComponent(()=>import('./components/BackToTop.vue'));
import loadingSpinner from './components/loadingSpinner.vue';

export default {
  components: {
    NavBar,
    BackToTop,
    TestimonialsSection,
    LatestProjSection,
    HeroSection, ServicesSection, AboutSection, loadingSpinner, Footer, ContactSection},
};
</script>

<style scoped>
*{
  scrollbar-width: thin;
  scrollbar-color: #0f1219 #f1f1f1;
}
</style>
