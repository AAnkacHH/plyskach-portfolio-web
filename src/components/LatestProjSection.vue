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

        <!-- Gallery Grid -->
        <div class="w-full bg-white/90 backdrop-blur-sm py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" data-aos="fade-up">
                    <figure
                        v-for="(item, index) in gallery"
                        :key="index"
                        class="group relative overflow-hidden aspect-[4/5] bg-gray-200"
                        :data-aos-delay="index * 100"
                        data-aos="fade-up"
                    >
                        <img
                            :src="item.src"
                            :alt="item.caption"
                            loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <!-- Caption overlay (visible on hover) -->
                        <figcaption class="gallery-caption">
                            <span class="gallery-caption-num">
                                Nº {{ String(index + 1).padStart(2, '0') }}
                            </span>
                            <span class="gallery-caption-text">{{ item.caption }}</span>
                        </figcaption>
                    </figure>
                </div>

                <!-- Footer note: more photos available -->
                <p class="text-center text-sm text-gray-600 mt-10 italic">
                    {{ t('portfolio.note') }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// Real project photos sourced from firemniprofil.cz/firma/61893801/mykhaylo-plyskach
const captions: Record<string, Record<string, string>> = {
    cs: {
        rekonstrukce: 'Rekonstrukce pokoje',
        pokladka: 'Pokládka dlažby',
        dlazby: 'Dlažby',
        detail: 'Dekorativní obklad'
    },
    en: {
        rekonstrukce: 'Room renovation',
        pokladka: 'Tile laying',
        dlazby: 'Tile samples',
        detail: 'Decorative tile'
    },
    uk: {
        rekonstrukce: 'Реконструкція кімнати',
        pokladka: 'Укладання плитки',
        dlazby: 'Зразки плитки',
        detail: 'Декоративна плитка'
    }
};

const gallery = computed(() => {
    const c = captions[locale.value] || captions.cs;
    return [
        { src: '/gallery/rekonstrukce-pokoje.jpg', caption: c.rekonstrukce },
        { src: '/gallery/pokladka-dlazby.jpg', caption: c.pokladka },
        { src: '/gallery/dlazby.jpg', caption: c.dlazby },
        { src: '/gallery/projekt-04.jpg', caption: c.detail }
    ];
});
</script>

<style scoped>
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

.group:hover .gallery-caption {
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
</style>
