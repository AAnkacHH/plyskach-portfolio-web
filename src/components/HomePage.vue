<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <LatestProjSection />
    <ContactSection />
    <AboutSection />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const HeroSection = defineAsyncComponent(() => import('./HeroSection.vue'));
const ServicesSection = defineAsyncComponent(() => import('./ServicesSection.vue'));
const AboutSection = defineAsyncComponent(() => import('./AboutSection.vue'));
const LatestProjSection = defineAsyncComponent(() => import('./LatestProjSection.vue'));
const ContactSection = defineAsyncComponent(() => import('./ContactSection.vue'));

export default {
  components: {
    HeroSection,
    ServicesSection,
    AboutSection,
    LatestProjSection,
    ContactSection,
  },
};
</script>
