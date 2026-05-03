<template>
  <section class="services-section relative py-24 scroll-mt-20" id="services">
    <!-- Section header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
      <div class="text-center" data-aos="fade-up">
        <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2a25] uppercase tracking-tight mb-4">
          {{ t('services.title') }}
        </h2>
        <p class="text-[#5e564b] text-lg max-w-2xl mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Slideshow -->
    <div
      class="carousel relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      data-aos="fade-up"
      data-aos-delay="200"
      @mouseenter="pause"
      @mouseleave="resume"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="carousel-viewport">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
        >
          <article
            v-for="(category, index) in categories"
            :key="category.id"
            class="slide"
            :aria-hidden="index !== activeIndex"
          >
            <div class="slide-grid">
              <!-- Text column -->
              <div class="slide-content">
                <span class="slide-counter">
                  {{ String(index + 1).padStart(2, '0') }} · {{ rt(category.title).toUpperCase() }}
                </span>
                <h3 class="slide-title">{{ rt(category.title) }}</h3>
                <ul class="slide-items">
                  <li v-for="item in category.items" :key="item.id">
                    <span class="bullet">✓</span>
                    <span>{{ rt(item.title) }}</span>
                  </li>
                </ul>
                <button
                  type="button"
                  @click="scrollToSection('#contact')"
                  class="slide-cta"
                >
                  {{ t('services.cta_btn') }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <!-- Image column -->
              <div
                class="slide-image"
                :style="{ backgroundImage: `url(${cardImage(category.id)})` }"
                role="img"
                :aria-label="rt(category.title)"
              ></div>
            </div>
          </article>
        </div>
      </div>

      <!-- Prev/Next (desktop) -->
      <button type="button" class="nav-btn nav-btn-prev hidden md:flex" @click="prev" aria-label="Previous slide">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" class="nav-btn nav-btn-next hidden md:flex" @click="next" aria-label="Next slide">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Pagination + counter + progress -->
      <div class="carousel-bottom">
        <div class="dots" role="tablist">
          <button
            v-for="(category, index) in categories"
            :key="category.id"
            type="button"
            class="dot"
            :class="{ 'dot-active': index === activeIndex }"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-selected="index === activeIndex"
            @click="goTo(index)"
          ></button>
        </div>
        <span class="counter">
          {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(categories.length).padStart(2, '0') }}
        </span>
      </div>

      <div class="progress">
        <div class="progress-fill" :key="progressKey" :class="{ paused: isPaused }"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';
import projectHouse from '../assets/project_house.png';

const { scrollToSection } = useScrollToSection();
const { t, tm, rt } = useI18n();

const categories = computed<any[]>(() => tm('services.categories') as any[]);

const activeIndex = ref(0);
const isPaused = ref(false);
const progressKey = ref(0);

const SLIDE_DURATION = 8000;
let timer: number | null = null;
let startTime = 0;
let elapsed = 0;

const startTimer = (delay = SLIDE_DURATION) => {
  if (timer) clearTimeout(timer);
  startTime = Date.now();
  timer = window.setTimeout(next, delay);
};

const goTo = (index: number) => {
  activeIndex.value = index;
  progressKey.value++;
  elapsed = 0;
  if (!isPaused.value) startTimer();
};

const next = () => goTo((activeIndex.value + 1) % categories.value.length);
const prev = () => goTo((activeIndex.value - 1 + categories.value.length) % categories.value.length);

const pause = () => {
  isPaused.value = true;
  if (timer) {
    clearTimeout(timer);
    elapsed += Date.now() - startTime;
    timer = null;
  }
};

const resume = () => {
  isPaused.value = false;
  startTimer(Math.max(500, SLIDE_DURATION - elapsed));
};

// Touch swipe
let touchStartX = 0;
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
};
const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) next();
    else prev();
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

// TODO: replace with category-specific real photos as they become available.
const cardImage = (id: string): string => {
  switch (id) {
    case 'tiles': return '/gpthero.png';
    case 'facades': return '/hero2.png';
    case 'masonry':
    default: return projectHouse;
  }
};
</script>

<style scoped>
/* ─────────── Section: warm cream — matches site palette ─────────── */

.services-section {
  background: linear-gradient(180deg, #faf7f2 0%, #f0ebe2 100%);
}

/* ─────────── Header in light theme ─────────── */

.services-section :deep(h2) { /* fallback selectors not needed; using direct styles below */ }

.services-section h2,
.slide-title { color: #2d2a25; }

/* Eyebrow + heading + subtitle override (light theme) */
.services-section .text-center > span:first-child {
  /* keep orange */
}

/* ─────────── Carousel ─────────── */

.carousel-viewport {
  overflow: hidden;
  border-radius: 4px;
  box-shadow:
    0 4px 14px rgba(40, 30, 20, 0.10),
    0 18px 44px rgba(40, 30, 20, 0.14);
}

.carousel-track {
  display: flex;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;
}

.slide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 480px;
  background: #fffaf2;
  border: 1px solid rgba(180, 160, 130, 0.22);
}

@media (max-width: 768px) {
  .slide-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

/* ─────────── Slide content (text) ─────────── */

.slide-content {
  padding: 3rem 2.5rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

@media (min-width: 1024px) {
  .slide-content {
    padding: 4rem 3rem 4rem 4rem;
  }
}

@media (max-width: 768px) {
  .slide-content {
    padding: 2rem 1.5rem 2.5rem;
    order: 2;
  }
}

.slide-counter {
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #f57d1f;
  margin-bottom: 1.25rem;
  font-weight: 600;
}

.slide-title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.25rem;
  line-height: 0.95;
  font-weight: 700;
  text-transform: uppercase;
  color: #2d2a25;
  margin-bottom: 1.75rem;
  letter-spacing: -0.01em;
}

@media (min-width: 1024px) {
  .slide-title {
    font-size: 3rem;
  }
}

.slide-items {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.slide-items li {
  font-size: 1rem;
  color: #4d4538;
  padding: 0.45rem 0 0.45rem 1.6rem;
  position: relative;
  line-height: 1.45;
}

.bullet {
  position: absolute;
  left: 0;
  top: 0.45rem;
  color: #f57d1f;
  font-weight: 700;
  font-size: 0.9rem;
}

.slide-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.75rem;
  background: #f57d1f;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  border-radius: 2px;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(245, 125, 31, 0.30);
}

.slide-cta:hover {
  background: #e06c10;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(245, 125, 31, 0.45);
}

.slide-cta svg {
  transition: transform 0.2s ease;
}

.slide-cta:hover svg {
  transform: translateX(4px);
}

/* ─────────── Slide image ─────────── */

.slide-image {
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 320px;
}

@media (max-width: 768px) {
  .slide-image {
    order: 1;
    min-height: 240px;
  }
}

/* Soft fade from cream panel into image (desktop only) */
@media (min-width: 769px) {
  .slide-image::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    background: linear-gradient(
      to right,
      rgba(255, 250, 242, 1) 0%,
      rgba(255, 250, 242, 0) 100%
    );
    pointer-events: none;
  }
}

/* ─────────── Nav buttons ─────────── */

.nav-btn {
  position: absolute;
  top: calc(50% - 1.5rem);
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 250, 242, 0.95);
  border: 1px solid rgba(180, 160, 130, 0.35);
  color: #2d2a25;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(40, 30, 20, 0.12);
}

.nav-btn:hover {
  background: #f57d1f;
  border-color: #f57d1f;
  color: white;
  transform: translateY(-50%) scale(1.05);
}

.nav-btn-prev { left: 2rem; }
.nav-btn-next { right: 2rem; }

/* ─────────── Pagination ─────────── */

.carousel-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.dots {
  display: flex;
  gap: 0.65rem;
}

.dot {
  width: 32px;
  height: 3px;
  background: rgba(45, 42, 37, 0.18);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, width 0.3s ease;
  border-radius: 1px;
}

.dot-active {
  background: #f57d1f;
  width: 56px;
}

.dot:hover:not(.dot-active) {
  background: rgba(45, 42, 37, 0.4);
}

.counter {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  color: rgba(45, 42, 37, 0.55);
  letter-spacing: 0.18em;
  font-weight: 500;
}

/* ─────────── Progress bar ─────────── */

.progress {
  position: relative;
  height: 2px;
  background: rgba(45, 42, 37, 0.10);
  margin: 1rem auto 0;
  max-width: 280px;
  overflow: hidden;
  border-radius: 1px;
}

.progress-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #f57d1f, #ffa15a);
  transform-origin: left;
  animation: fill-progress 8s linear forwards;
}

.progress-fill.paused {
  animation-play-state: paused;
}

@keyframes fill-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* ─────────── Reduced motion ─────────── */

@media (prefers-reduced-motion: reduce) {
  .carousel-track,
  .slide-cta,
  .slide-cta svg,
  .nav-btn {
    transition: none !important;
  }
  .progress-fill {
    animation: none !important;
  }
}
</style>
