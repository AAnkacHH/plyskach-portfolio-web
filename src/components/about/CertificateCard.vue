<template>
    <button
        type="button"
        class="cert-card"
        :aria-label="`${viewLabel}: ${title}`"
        @click="$emit('open')"
    >
        <div class="cert-card-image-wrap">
            <img
                :src="thumb"
                :alt="alt"
                :width="width"
                :height="height"
                loading="lazy"
                decoding="async"
                class="cert-card-image"
            />
            <div class="cert-card-overlay" aria-hidden="true">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m-3-3h6" />
                </svg>
                <span class="cert-card-overlay-text">{{ viewLabel }}</span>
            </div>
            <span v-if="sessionCount && sessionCount > 1" class="cert-card-badge">
                {{ sessionsText }}
            </span>
        </div>
        <div class="cert-card-body">
            <h3 class="cert-card-title">{{ title }}</h3>
            <p class="cert-card-subtitle">{{ subtitle }}</p>
            <p class="cert-card-meta">
                <span class="cert-card-issuer">{{ issuer }}</span>
            </p>
            <p class="cert-card-year">{{ year }}</p>
        </div>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
    issuer: string;
    year: string;
    thumb: string;
    alt: string;
    width: number;
    height: number;
    viewLabel: string;
    sessionCount?: number;
    sessionsText?: string;
}>();

defineEmits<{
    open: [];
}>();
</script>

<style scoped>
.cert-card {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    color: var(--orange);
    cursor: pointer;
    font: inherit;
    width: 100%;
}

.cert-card:hover,
.cert-card:focus-visible {
    border-color: var(--orange);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.cert-card:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 2px;
}

.cert-card-image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #f5f5f4;
}

.cert-card-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.2, 0, 0.2, 1);
}

.cert-card:hover .cert-card-image,
.cert-card:focus-visible .cert-card-image {
    transform: scale(1.04);
}

.cert-card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(12, 10, 8, 0.55);
    color: #fefdfb;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.cert-card:hover .cert-card-overlay,
.cert-card:focus-visible .cert-card-overlay {
    opacity: 1;
}

.cert-card-overlay-text {
    font-family: var(--display-font);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
}

.cert-card-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: var(--orange);
    color: var(--ink);
    font-family: var(--display-font);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.32rem 0.6rem;
    line-height: 1;
}

.cert-card-body {
    padding: 1.4rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
}

.cert-card-title {
    font-family: var(--display-font);
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.2;
    letter-spacing: 0.04em;
}

.cert-card-subtitle {
    font-size: 0.88rem;
    color: #4b5563;
    margin: 0.35rem 0 0;
    line-height: 1.35;
    font-style: italic;
}

.cert-card-meta {
    font-size: 0.78rem;
    color: #4b5563;
    margin: 0.85rem 0 0;
    line-height: 1.4;
}

.cert-card-issuer {
    color: #374151;
}

.cert-card-year {
    font-size: 0.7rem;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-weight: 600;
    margin: 0.35rem 0 0;
}

@media (prefers-reduced-motion: reduce) {
    .cert-card,
    .cert-card-image,
    .cert-card-overlay { transition: none !important; }
    .cert-card:hover { transform: none !important; }
    .cert-card:hover .cert-card-image { transform: none !important; }
}
</style>
