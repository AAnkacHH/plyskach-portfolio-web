<template>
  <section class="services-section relative py-24 md:py-32 scroll-mt-20" id="services">
    <!-- Paper-grain noise (very subtle) -->
    <div class="grain absolute inset-0 pointer-events-none"></div>

    <!-- Section header -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
      <div class="text-center" data-aos="fade-up">
        <span class="section-eyebrow">— Co umím</span>
        <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1815] uppercase tracking-tight mt-3 mb-4">
          {{ t('services.title') }}
        </h2>
        <p class="text-[#5e564b] text-lg max-w-2xl mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Editorial top rule with metadata — spans full viewport width -->
    <div class="spread-rule spread-rule-top" aria-hidden="true">
      <span class="rule-line"></span>
      <span class="rule-tag">
        Práce Nº {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(categories.length).padStart(2, '0') }}
      </span>
      <span class="rule-line rule-line-flex"></span>
      <span class="rule-tag rule-tag-r">
        Mykhaylo Plyskach &nbsp;×&nbsp; {{ rt(categories[activeIndex]?.title || '').toUpperCase() }}
      </span>
      <span class="rule-line"></span>
    </div>

    <!-- Slideshow — slide bleeds full-bleed right, left edge aligns with max-w-7xl -->
    <div
      class="spread-area"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div
        class="carousel"
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
                <!-- Vertical sidebar runner (desktop only) -->
                <div class="slide-rail" aria-hidden="true">
                  <span class="slide-rail-text">
                    Práce Nº {{ String(index + 1).padStart(2, '0') }}
                    &nbsp;·&nbsp;
                    {{ getRailMeta() }}
                  </span>
                </div>

                <!-- Text panel -->
                <div class="slide-panel">
                  <!-- Giant outline number -->
                  <span class="slide-bignum" aria-hidden="true">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>

                  <div class="slide-content">
                    <span class="slide-kicker">
                      {{ rt(category.title).toUpperCase() }}
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
                      <span>{{ t('services.cta_btn') }}</span>
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Photo panel -->
                <div class="slide-photo">
                  <div
                    class="slide-photo-bg"
                    :style="{ backgroundImage: `url(${cardImage(category.id)})` }"
                    role="img"
                    :aria-label="rt(category.title)"
                  ></div>

                  <!-- Contact-sheet stamp (right-bottom) -->
                  <div class="slide-stamp">
                    <span class="slide-stamp-num">
                      Nº {{ String(index + 1).padStart(2, '0') }} / {{ String(categories.length).padStart(2, '0') }}
                    </span>
                    <span class="slide-stamp-label">
                      {{ rt(category.title).toUpperCase() }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Prev/Next (desktop) -->
        <button
          type="button"
          class="nav-btn nav-btn-prev hidden md:flex"
          @click="prev"
          aria-label="Previous"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          class="nav-btn nav-btn-next hidden md:flex"
          @click="next"
          aria-label="Next"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>

    <!-- Editorial bottom rule -->
    <div class="spread-rule spread-rule-bottom" aria-hidden="true">
      <span class="rule-line"></span>
      <span class="rule-tag rule-tag-mono">{{ getRailMeta() }}</span>
      <span class="rule-line"></span>
    </div>

    <!-- Tape-measure ruler pagination — constrained to max-w-7xl -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="ruler-wrap" data-aos="fade-up" data-aos-delay="350">
        <div class="ruler" role="tablist">
          <button
            v-for="(category, index) in categories"
            :key="category.id"
            type="button"
            class="ruler-tick"
            :class="{ 'ruler-tick-active': index === activeIndex }"
            :aria-label="`Slide ${index + 1}`"
            :aria-selected="index === activeIndex"
            @click="goTo(index)"
          >
            <span class="ruler-tick-bar"></span>
            <span class="ruler-tick-num">{{ index }}</span>
          </button>
          <!-- Final right tick (closing the ruler) -->
          <span class="ruler-tick ruler-tick-final" aria-hidden="true">
            <span class="ruler-tick-bar"></span>
            <span class="ruler-tick-num">{{ categories.length }}</span>
          </span>

          <!-- Progress fill -->
          <div class="ruler-progress" :key="progressKey" :class="{ paused: isPaused }"></div>
        </div>
        <span class="ruler-counter">
          Nº {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(categories.length).padStart(2, '0') }}
        </span>
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
const { t, tm, rt, locale } = useI18n();

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
const prev = () =>
  goTo((activeIndex.value - 1 + categories.value.length) % categories.value.length);

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

// Locale-aware rail metadata (sidebar runner)
const getRailMeta = (): string => {
  const labels: Record<string, string> = {
    cs: 'Praha + Středočeský kraj  ·  25 let praxe',
    en: 'Prague + Central Bohemia  ·  25 years of practice',
    uk: 'Прага + Середньочеський край  ·  25 років практики'
  };
  return labels[locale.value] || labels.cs;
};

// TODO: replace with category-specific photos as they become available.
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
/* ─────────────── Section ─────────────── */

.services-section {
  background: #faf6ee;
  position: relative;
}

/* Subtle paper grain (~1.5% opacity) — adds tactility without softening edges */
.grain {
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.18;
  mix-blend-mode: multiply;
}

.section-eyebrow {
  display: inline-block;
  font-family: 'Oswald', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #f57d1f;
  font-weight: 500;
}

/* ─────────────── Editorial spread rules (top + bottom) ─────────────── */

.spread-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
  position: relative;
}

.spread-rule-top {
  margin-bottom: 1.25rem;
}

.spread-rule-bottom {
  margin-top: 1.25rem;
}

.rule-line {
  flex: 0 0 36px;
  height: 1px;
  background: #1a1815;
  opacity: 0.85;
}

.rule-line-flex {
  flex: 1 1 auto;
}

.rule-tag {
  font-family: 'Oswald', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #1a1815;
  font-weight: 500;
  white-space: nowrap;
}

.rule-tag-r {
  color: #f57d1f;
}

.rule-tag-mono {
  font-size: 0.62rem;
  letter-spacing: 0.42em;
  color: rgba(26, 24, 21, 0.55);
}

@media (max-width: 768px) {
  .rule-tag {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    white-space: normal;
  }
  .rule-line {
    flex: 0 0 16px;
  }
}

/* ─────────────── Spread area (slide breaks out right) ─────────────── */

.spread-area {
  position: relative;
  /* Pin LEFT edge to where max-w-7xl (80rem = 1280px) content would start.
     Bleed RIGHT edge to viewport edge — full editorial spread feel. */
  margin-left: max(1rem, calc((100vw - 80rem) / 2));
  margin-right: 0;
}

@media (max-width: 768px) {
  .spread-area {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

/* ─────────────── Carousel ─────────────── */

.carousel {
  position: relative;
}

.carousel-viewport {
  overflow: hidden;
  /* Heavy soft shadow — slide reads as cardstock laid on cream */
  box-shadow:
    0 1px 1px rgba(26, 24, 21, 0.18),
    0 6px 18px rgba(26, 24, 21, 0.10),
    0 28px 60px rgba(26, 24, 21, 0.22);
}

.carousel-track {
  display: flex;
  transition: transform 0.65s cubic-bezier(0.7, 0, 0.2, 1);
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;
}

.slide-grid {
  display: grid;
  /* Fixed text panel; photo expands fluidly into the right bleed area */
  grid-template-columns: 56px minmax(0, 580px) minmax(0, 1fr);
  min-height: 520px;
  background: #1a1815;
}

@media (max-width: 1024px) {
  .slide-grid {
    grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1.1fr);
  }
}

@media (max-width: 768px) {
  .slide-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

/* ─────────────── Vertical sidebar runner ─────────────── */

.slide-rail {
  position: relative;
  border-right: 1px solid rgba(245, 125, 31, 0.22);
  background: #15130f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-rail-text {
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(245, 235, 215, 0.55);
  font-weight: 500;
  white-space: nowrap;
  /* Read bottom-up */
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .slide-rail {
    display: none;
  }
}

/* ─────────────── Text panel ─────────────── */

.slide-panel {
  position: relative;
  padding: 3rem 2.5rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .slide-panel {
    padding: 4rem 3rem 4rem 3.5rem;
  }
}

@media (max-width: 768px) {
  .slide-panel {
    padding: 2.5rem 1.5rem 2rem;
    order: 2;
  }
}

/* Giant outline number — graphic chapter mark */
.slide-bignum {
  position: absolute;
  top: -0.18em;
  right: -0.05em;
  font-family: 'Oswald', sans-serif;
  font-size: 16rem;
  font-weight: 700;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 125, 31, 0.32);
  letter-spacing: -0.04em;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

@media (max-width: 1023px) {
  .slide-bignum {
    font-size: 11rem;
    right: -0.1em;
  }
}

@media (max-width: 768px) {
  .slide-bignum {
    font-size: 9rem;
    top: -0.25em;
    right: 0.5rem;
    -webkit-text-stroke: 1px rgba(245, 125, 31, 0.28);
  }
}

.slide-content {
  position: relative;
  z-index: 1;
}

.slide-kicker {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #f57d1f;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.slide-kicker::before {
  content: '— ';
  color: #f57d1f;
  margin-right: 0.25em;
}

.slide-title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  line-height: 0.95;
  font-weight: 700;
  text-transform: uppercase;
  color: #fefdfb;
  margin-bottom: 2rem;
  letter-spacing: -0.015em;
}

@media (min-width: 1024px) {
  .slide-title {
    font-size: 3.25rem;
  }
}

.slide-items {
  list-style: none;
  padding: 0;
  margin: 0 0 2.25rem;
  border-top: 1px solid rgba(245, 235, 215, 0.10);
}

.slide-items li {
  font-size: 0.98rem;
  color: #c8bfae;
  padding: 0.7rem 0 0.7rem 1.65rem;
  position: relative;
  line-height: 1.4;
  border-bottom: 1px solid rgba(245, 235, 215, 0.10);
}

.bullet {
  position: absolute;
  left: 0;
  top: 0.78rem;
  color: #f57d1f;
  font-weight: 700;
  font-size: 0.85rem;
}

/* CTA — bold flat orange block, no rounded corners (industrial) */
.slide-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 1.75rem;
  background: #f57d1f;
  color: #1a1815;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  border-radius: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.slide-cta:hover {
  background: #ff8e2e;
  transform: translateX(2px);
}

.slide-cta svg {
  transition: transform 0.2s ease;
}

.slide-cta:hover svg {
  transform: translateX(6px);
}

/* ─────────────── Photo panel ─────────────── */

.slide-photo {
  position: relative;
  overflow: hidden;
  min-height: 320px;
}

@media (max-width: 768px) {
  .slide-photo {
    order: 1;
    min-height: 260px;
  }
}

.slide-photo-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

/* Contact-sheet stamp at bottom-right */
.slide-stamp {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  background: #0c0a08;
  padding: 0.65rem 0.95rem 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 0.18em;
  z-index: 2;
  border-left: 2px solid #f57d1f;
}

.slide-stamp-num {
  color: #fefdfb;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
}

.slide-stamp-label {
  color: #f57d1f;
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

/* ─────────────── Nav buttons ─────────────── */

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: #faf6ee;
  border: 1px solid #1a1815;
  color: #1a1815;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(26, 24, 21, 0.18);
}

.nav-btn:hover {
  background: #1a1815;
  color: #f57d1f;
}

/* Prev hangs at slide left edge; next sits inside the photo area
   (since slide bleeds to viewport edge, "next" can't sit outside) */
.nav-btn-prev { left: -22px; }
.nav-btn-next { right: 1.25rem; background: rgba(255, 246, 238, 0.96); }

@media (max-width: 1024px) {
  .nav-btn-prev { left: 8px; }
  .nav-btn-next { right: 8px; }
}

/* Hide nav buttons on desktop bleed: ruler + swipe + auto-advance is
   enough; arrows feel like SaaS UI on an editorial spread. */
@media (min-width: 1280px) {
  .nav-btn { display: none !important; }
}

/* ─────────────── Tape-measure ruler ─────────────── */

.ruler-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin-top: 2.75rem;
}

.ruler {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 280px;
  height: 28px;
  border-bottom: 1px solid #1a1815;
}

.ruler-tick {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 24px;
  flex-shrink: 0;
}

.ruler-tick-final {
  cursor: default;
}

.ruler-tick-bar {
  display: block;
  width: 1px;
  height: 12px;
  background: #1a1815;
  transition: height 0.3s ease, background 0.3s ease, width 0.3s ease;
}

.ruler-tick-num {
  font-family: 'Oswald', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: rgba(26, 24, 21, 0.5);
  font-weight: 500;
  position: absolute;
  bottom: -1.1rem;
  transition: color 0.3s ease;
}

.ruler-tick-active .ruler-tick-bar {
  height: 22px;
  width: 2px;
  background: #f57d1f;
}

.ruler-tick-active .ruler-tick-num {
  color: #f57d1f;
}

.ruler-tick:hover:not(.ruler-tick-final):not(.ruler-tick-active) .ruler-tick-bar {
  background: #5e564b;
  height: 16px;
}

/* Progress fill underneath ticks */
.ruler-progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  background: #f57d1f;
  transform-origin: left;
  animation: ruler-fill 8s linear forwards;
  width: 100%;
}

.ruler-progress.paused {
  animation-play-state: paused;
}

@keyframes ruler-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.ruler-counter {
  font-family: 'Oswald', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  color: #1a1815;
  font-weight: 500;
  margin-top: 0.5rem;
}

/* ─────────────── Reduced motion ─────────────── */

@media (prefers-reduced-motion: reduce) {
  .carousel-track,
  .slide-cta,
  .slide-cta svg,
  .nav-btn,
  .ruler-tick-bar,
  .ruler-tick-num {
    transition: none !important;
  }
  .ruler-progress {
    animation: none !important;
  }
}
</style>
