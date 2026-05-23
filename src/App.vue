<template>
  <div class="app-shell min-h-screen">
    <!-- Hero photo lives on its own fixed compositing layer.
         Avoids the jank/flicker from `background-attachment: fixed`
         (which causes the browser to repaint the bg every scroll frame). -->
    <div class="fixed-hero-bg" aria-hidden="true"></div>

    <div class="content-stack">
      <Suspense>
        <template #default>
          <div>
            <NavBar />
            <RouterView />
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
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import loadingSpinner from './components/loadingSpinner.vue';

const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
const BackToTop = defineAsyncComponent(() => import('./components/BackToTop.vue'));
</script>

<style scoped>
* {
  scrollbar-width: thin;
  scrollbar-color: #0f1219 #f1f1f1;
}

/* Stacking context: bg behind, content above */
.app-shell {
  position: relative;
  background-color: #0f1219;
  isolation: isolate;
}

.content-stack {
  position: relative;
  z-index: 1;
}

/* Hero photo on its own fixed compositing layer — GPU-promoted via
   translateZ + will-change so scrolling never repaints it. */
.fixed-hero-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: #0f1219;
  background-image:
    linear-gradient(
      to right,
      rgba(15, 18, 25, 0.65) 0%,
      rgba(15, 18, 25, 0.30) 50%,
      rgba(15, 18, 25, 0.20) 100%
    ),
    url('/hero2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Promote to its own GPU layer */
  transform: translateZ(0);
  will-change: transform;
  /* Avoid sub-pixel hairlines on high-DPI displays */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@media (max-width: 768px) {
  .fixed-hero-bg {
    background-position: 35% center;
    background-image:
      linear-gradient(
        to bottom,
        rgba(15, 18, 25, 0.55) 0%,
        rgba(15, 18, 25, 0.40) 40%,
        rgba(15, 18, 25, 0.50) 100%
      ),
      url('/hero2.webp');
  }
}
</style>
