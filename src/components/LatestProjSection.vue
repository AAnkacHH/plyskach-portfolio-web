<template>
    <section class="scroll-mt-28" id="projects">
        <!-- Header -->
        <div class="relative w-full h-80 flex items-center justify-center text-center text-white">
            <div class="relative z-10 px-4 max-w-3xl">
                <h2 class="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
                    {{ t('portfolio.title') }}
                </h2>
                <p class="text-lg md:text-xl text-gray-200">{{ t('portfolio.subtitle') }}</p>
            </div>
        </div>

        <!-- Gallery marquee -->
        <div class="w-full bg-white/90 backdrop-blur-sm py-16">
            <div
                class="marquee"
                :class="{ 'marquee--static': reduceMotion }"
                data-aos="fade-up"
                role="group"
                :aria-label="t('portfolio.title')"
            >
                <ul
                    class="marquee__track"
                    :style="reduceMotion ? undefined : { animationDuration: duration }"
                >
                    <li
                        v-for="(item, i) in marqueeItems"
                        :key="i"
                        class="gallery-tile group"
                        :aria-hidden="i >= items.length ? 'true' : undefined"
                    >
                        <button
                            type="button"
                            class="gallery-tile-button"
                            :aria-label="item.caption"
                            :tabindex="i >= items.length ? -1 : undefined"
                            @click="openAt(i % items.length)"
                        >
                            <img
                                :src="item.src"
                                :alt="i >= items.length ? '' : item.caption"
                                loading="lazy"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </button>
                        <figcaption class="gallery-caption" aria-hidden="true">
                            <span class="gallery-caption-num">
                                Nº {{ String((i % items.length) + 1).padStart(2, '0') }}
                            </span>
                            <span class="gallery-caption-text">{{ item.caption }}</span>
                        </figcaption>
                    </li>
                </ul>
            </div>

            <!-- CTA to full gallery -->
            <div class="text-center mt-12">
                <RouterLink :to="localePath('/galerie')" class="view-all-cta">
                    <span>{{ t('portfolio.viewAll') }}</span>
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </RouterLink>
            </div>
        </div>

        <GalleryModal :items="items" v-model:index="lightboxIndex" />
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useGallery } from '../lib/gallery';
import { localePath } from '../router';
import GalleryModal from './gallery/GalleryModal.vue';

const { t } = useI18n();
const { items } = useGallery();

// Duplicate the set once so the loop can translate by -50% seamlessly.
const marqueeItems = computed(() =>
    reduceMotion.value ? items.value : [...items.value, ...items.value],
);

// ~4.5 s of travel per photo — calm, readable pace regardless of count.
const duration = computed(() => `${Math.max(items.value.length * 4.5, 20)}s`);

const lightboxIndex = ref<number | null>(null);
const openAt = (i: number) => {
    lightboxIndex.value = i;
};

const reduceMotion = ref(false);
let mq: MediaQueryList | null = null;
const onMqChange = (e: MediaQueryListEvent) => {
    reduceMotion.value = e.matches;
};
onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotion.value = mq.matches;
    mq.addEventListener('change', onMqChange);
});
onUnmounted(() => {
    mq?.removeEventListener('change', onMqChange);
});
</script>

<style scoped>
.marquee {
    position: relative;
    overflow: hidden;
    /* Soft fade on both edges so tiles ease in/out of view. */
    -webkit-mask-image: linear-gradient(
        to right,
        transparent 0,
        #000 6%,
        #000 94%,
        transparent 100%
    );
    mask-image: linear-gradient(
        to right,
        transparent 0,
        #000 6%,
        #000 94%,
        transparent 100%
    );
}

.marquee__track {
    display: flex;
    width: max-content;
    gap: 1rem;
    padding: 0 0.5rem;
    margin: 0;
    list-style: none;
    animation: marquee-scroll linear infinite;
}

/* Right-to-left: content slides leftwards by exactly one set. */
@keyframes marquee-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
    animation-play-state: paused;
}

.gallery-tile {
    position: relative;
    flex: 0 0 auto;
    width: clamp(200px, 22vw, 300px);
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #e5e7eb;
}

/* Reduced motion: no animation, fall back to a manual horizontal scroll. */
.marquee--static {
    -webkit-mask-image: none;
    mask-image: none;
}

.marquee--static .marquee__track {
    width: auto;
    animation: none;
    overflow-x: auto;
    padding-bottom: 0.75rem;
    scroll-snap-type: x mandatory;
}

.marquee--static .gallery-tile {
    scroll-snap-align: start;
}

.gallery-tile-button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
}

.gallery-tile-button:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: -2px;
}

.gallery-caption {
    position: absolute;
    inset: auto 0 0 0;
    padding: 1rem 1.25rem;
    background: linear-gradient(
        to top,
        rgba(15, 18, 25, 0.92) 0%,
        rgba(15, 18, 25, 0.7) 60%,
        rgba(15, 18, 25, 0) 100%
    );
    color: #fefdfb;
    transform: translateY(8px);
    opacity: 0;
    transition: transform 0.4s ease, opacity 0.4s ease;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.group:hover .gallery-caption,
.group:focus-within .gallery-caption {
    opacity: 1;
    transform: translateY(0);
}

.gallery-caption-num {
    font-family: 'Oswald', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.28em;
    color: #f57d1f;
    font-weight: 600;
    text-transform: uppercase;
}

.gallery-caption-text {
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

/* Always show caption on touch — no hover */
@media (pointer: coarse) {
    .gallery-caption {
        opacity: 1;
        transform: translateY(0);
    }
}

.view-all-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1.5rem;
    background: var(--orange);
    color: var(--ink);
    font-family: var(--display-font);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.view-all-cta:hover,
.view-all-cta:focus-visible {
    background: var(--orange-hover);
    outline: none;
}

.view-all-cta svg { transition: transform 0.2s ease; }
.view-all-cta:hover svg,
.view-all-cta:focus-visible svg { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
    .marquee__track { animation: none !important; }
    .view-all-cta,
    .view-all-cta svg { transition: none !important; }
}
</style>
