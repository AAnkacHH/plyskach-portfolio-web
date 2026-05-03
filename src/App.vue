<template>
  <div class="fixed-bg min-h-screen">
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
* {
  scrollbar-width: thin;
  scrollbar-color: #0f1219 #f1f1f1;
}

.fixed-bg {
  background-color: #0f1219;
  background-image:
    linear-gradient(
      to right,
      rgba(15, 18, 25, 0.65) 0%,
      rgba(15, 18, 25, 0.30) 50%,
      rgba(15, 18, 25, 0.20) 100%
    ),
    url('/hero2.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* Mobile: parallax fixed-attachment causes jitter on iOS */
@media (max-width: 768px) {
  .fixed-bg {
    background-attachment: scroll;
    background-position: 35% center;
    background-image:
      linear-gradient(
        to bottom,
        rgba(15, 18, 25, 0.55) 0%,
        rgba(15, 18, 25, 0.40) 40%,
        rgba(15, 18, 25, 0.50) 100%
      ),
      url('/hero2.png');
  }
}
</style>
