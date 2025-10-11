<template>
  <div class="bg-[#111827] ">
    <!-- Wrap components in Suspense to handle loading -->
    <Suspense>
      <template #default>
        <!-- Wrap all Components inside a single root element -->
        <div>
          <NavBar />
          <HeroSection />
          <ServicesSection class="min-h-screen"  />
          <AboutSection class="min-h-screen"  />
          <ExperienceAndSkills class="min-h-screen"  />
          <LatestProjSection class="min-h-screen"  />
          <ContactSection class="min-h-screen"  />
<!--          <TestimonialsSection />-->
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
//Import Components Asynchronously
const NavBar = defineAsyncComponent(()=>import('./components/NavBar.vue'));
const HeroSection = defineAsyncComponent(()=>import('./components/HeroSection.vue'));
const ServicesSection = defineAsyncComponent(()=>import('./Components/ServicesSection.vue'));
const AboutSection = defineAsyncComponent(()=>import('./Components/AboutSection.vue'));
const TestimonialsSection = defineAsyncComponent(()=>import('./Components/TestimonialsSection.vue'));
const LatestProjSection = defineAsyncComponent(()=>import('./Components/LatestProjSection.vue'));
const ExperienceAndSkills = defineAsyncComponent(()=>import('./Components/ExperienceAndSkills.vue'));
const ContactSection = defineAsyncComponent(()=>import('./Components/ContactSection.vue'));
const Footer = defineAsyncComponent(()=>import('./Components/Footer.vue'));
const BackToTop = defineAsyncComponent(()=>import('./Components/BackToTop.vue'));
import loadingSpinner from './Components/loadingSpinner.vue';
//import NavBar from "./Components/NavBar.vue";

export default {
  components: {
    NavBar,
    BackToTop,
    TestimonialsSection,
    LatestProjSection,
    AboutSection, ExperienceAndSkills, HeroSection, ServicesSection, loadingSpinner, Footer, ContactSection},
};
</script>

<style scoped>
*{
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
