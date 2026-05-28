<template>
    <article class="bg-white text-gray-900">
        <header class="gallery-hero text-white pt-32 pb-16 border-b border-white/10 relative">
            <div class="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
                <p class="uppercase tracking-[0.2em] text-xs text-orange-400 mb-4">
                    {{ t('gallery.kicker') }}
                </p>
                <h1 class="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    {{ t('gallery.title') }}
                </h1>
                <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {{ t('gallery.intro') }}
                </p>
            </div>
        </header>

        <section class="w-full bg-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <figure
                        v-for="(item, index) in items"
                        :key="item.src"
                        class="gallery-tile group relative overflow-hidden aspect-[4/5] bg-gray-200"
                    >
                        <button
                            type="button"
                            class="gallery-tile-button"
                            :aria-label="item.caption"
                            @click="openAt(index)"
                        >
                            <img
                                :src="item.src"
                                :alt="item.caption"
                                loading="lazy"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </button>
                        <figcaption class="gallery-caption" aria-hidden="true">
                            <span class="gallery-caption-num">
                                Nº {{ String(index + 1).padStart(2, '0') }}
                            </span>
                            <span class="gallery-caption-text">{{ item.caption }}</span>
                        </figcaption>
                    </figure>
                </div>

                <div class="mt-16 pt-8 border-t border-gray-200 text-center">
                    <RouterLink
                        :to="localePath('/')"
                        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {{ t('gallery.backToHome') }}
                    </RouterLink>
                </div>
            </div>
        </section>

        <GalleryModal :items="items" v-model:index="lightboxIndex" />
    </article>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useGallery } from '../lib/gallery';
import { localePath } from '../router';
import GalleryModal from './gallery/GalleryModal.vue';

const { t } = useI18n();
const { items } = useGallery();

const lightboxIndex = ref<number | null>(null);

const openAt = (i: number) => {
    lightboxIndex.value = i;
};

let previousTitle = '';

const applyTitle = () => {
    document.title = `${t('gallery.title')} — Mykhaylo Plyskach`;
};

onMounted(() => {
    previousTitle = document.title;
    applyTitle();
});

onBeforeUnmount(() => {
    if (previousTitle) document.title = previousTitle;
});

watch(() => t('gallery.title'), applyTitle);
</script>

<style scoped>
.gallery-hero {
    background-color: #0f1219;
    background-image:
        linear-gradient(
            to right,
            rgba(15, 18, 25, 0.7) 0%,
            rgba(15, 18, 25, 0.40) 50%,
            rgba(15, 18, 25, 0.30) 100%
        ),
        url('/hero2.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

@media (max-width: 768px) {
    .gallery-hero {
        background-position: 35% center;
        background-image:
            linear-gradient(
                to bottom,
                rgba(15, 18, 25, 0.60) 0%,
                rgba(15, 18, 25, 0.45) 40%,
                rgba(15, 18, 25, 0.55) 100%
            ),
            url('/hero2.webp');
    }
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

@media (pointer: coarse) {
    .gallery-caption {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
