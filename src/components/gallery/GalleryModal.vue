<template>
    <Teleport to="body">
        <Transition name="gallery-modal">
            <div
                v-if="isOpen"
                class="gallery-modal"
                role="dialog"
                aria-modal="true"
                :aria-label="t('portfolio.lightbox.eyebrow')"
                @click.self="close"
                @keydown="onKeydown"
            >
                <div class="gallery-modal-shell" @click.stop>
                    <header class="gallery-modal-header">
                        <div class="gallery-modal-header-info">
                            <span class="gallery-modal-eyebrow">
                                — {{ t('portfolio.lightbox.eyebrow') }} · Nº {{ counter }}
                            </span>
                            <span class="gallery-modal-title">{{ current?.caption }}</span>
                        </div>
                        <button
                            ref="closeBtnRef"
                            type="button"
                            class="gallery-modal-close"
                            @click="close"
                            :aria-label="t('portfolio.lightbox.closeLabel')"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>

                    <div class="gallery-modal-body">
                        <img
                            v-if="current"
                            :key="current.src"
                            :src="current.src"
                            :alt="current.caption"
                            class="gallery-modal-img"
                            loading="eager"
                            @click="next"
                        />

                        <EditorialStamp
                            class="gallery-stamp-position"
                            :num="`Nº ${stampNum} · ${t('portfolio.lightbox.stampLabel')}`"
                            size="sm"
                        />
                    </div>

                    <footer class="gallery-modal-footer">
                        <button
                            ref="prevBtnRef"
                            type="button"
                            class="gallery-modal-nav"
                            :aria-label="t('portfolio.lightbox.prevLabel')"
                            @click="prev"
                        >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>{{ t('portfolio.lightbox.prevLabel') }}</span>
                        </button>
                        <button
                            ref="nextBtnRef"
                            type="button"
                            class="gallery-modal-nav"
                            :aria-label="t('portfolio.lightbox.nextLabel')"
                            @click="next"
                        >
                            <span>{{ t('portfolio.lightbox.nextLabel') }}</span>
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import EditorialStamp from '../editorial/EditorialStamp.vue';
import { useModalLock } from '../../lib/useModalLock';
import type { GalleryItem } from '../../lib/gallery';

const props = defineProps<{
    items: GalleryItem[];
    index: number | null;
}>();

const emit = defineEmits<{
    'update:index': [value: number | null];
}>();

const { t } = useI18n();

const isOpen = computed(() => props.index !== null);

const current = computed<GalleryItem | null>(() => {
    if (props.index === null) return null;
    return props.items[props.index] ?? null;
});

const counter = computed(() => {
    if (props.index === null) return '';
    const total = props.items.length;
    const cur = String(props.index + 1).padStart(2, '0');
    const tot = String(total).padStart(2, '0');
    return `${cur} / ${tot}`;
});

const stampNum = computed(() => {
    if (props.index === null) return '';
    return String(props.index + 1).padStart(2, '0');
});

const close = () => emit('update:index', null);

const next = () => {
    if (props.index === null || props.items.length === 0) return;
    const n = (props.index + 1) % props.items.length;
    emit('update:index', n);
};

const prev = () => {
    if (props.index === null || props.items.length === 0) return;
    const n = (props.index - 1 + props.items.length) % props.items.length;
    emit('update:index', n);
};

useModalLock(isOpen, close);

const closeBtnRef = ref<HTMLButtonElement | null>(null);
const prevBtnRef = ref<HTMLButtonElement | null>(null);
const nextBtnRef = ref<HTMLButtonElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

watch(isOpen, async (open) => {
    if (open) {
        previouslyFocused = (document.activeElement as HTMLElement) ?? null;
        await nextTick();
        closeBtnRef.value?.focus();
    } else if (previouslyFocused) {
        previouslyFocused.focus();
        previouslyFocused = null;
    }
});

// Preload neighbour images for snappier navigation.
watch(
    () => props.index,
    (idx) => {
        if (idx === null) return;
        const total = props.items.length;
        const neighbours = [
            (idx + 1) % total,
            (idx - 1 + total) % total,
        ];
        for (const n of neighbours) {
            const item = props.items[n];
            if (item) {
                const img = new Image();
                img.src = item.src;
            }
        }
    },
);

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        return;
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        return;
    }
    if (e.key !== 'Tab') return;
    // Focus trap across close → prev → next
    const order = [closeBtnRef.value, prevBtnRef.value, nextBtnRef.value].filter(
        (el): el is HTMLButtonElement => !!el,
    );
    if (order.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const idx = active ? order.indexOf(active as HTMLButtonElement) : -1;
    if (idx === -1) {
        e.preventDefault();
        order[0].focus();
        return;
    }
    const dir = e.shiftKey ? -1 : 1;
    const nextIdx = (idx + dir + order.length) % order.length;
    e.preventDefault();
    order[nextIdx].focus();
};
</script>

<style scoped>
.gallery-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(12, 10, 8, 0.85);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

@media (max-width: 640px) {
    .gallery-modal { padding: 0; }
}

.gallery-modal-shell {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    max-height: calc(100vh - 3rem);
    background: var(--ink);
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.4),
        0 32px 80px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

@media (max-width: 640px) {
    .gallery-modal-shell { max-height: 100vh; height: 100vh; }
}

.gallery-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--ink-deep);
    border-bottom: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

.gallery-modal-header-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.gallery-modal-eyebrow {
    font-family: var(--display-font);
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--orange);
    font-weight: 600;
}

.gallery-modal-title {
    font-size: 0.95rem;
    font-weight: 500;
    color: #fefdfb;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (max-width: 640px) {
    .gallery-modal-title { white-space: normal; font-size: 0.85rem; }
}

.gallery-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1.5px solid rgba(245, 235, 215, 0.22);
    color: #fefdfb;
    cursor: pointer;
    border-radius: 0;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    flex-shrink: 0;
}

.gallery-modal-close:hover,
.gallery-modal-close:focus-visible {
    background: var(--orange);
    color: var(--ink);
    border-color: var(--orange);
    outline: none;
}

.gallery-modal-body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.gallery-modal-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
}

.gallery-stamp-position {
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 2;
    pointer-events: none;
}

@media (max-width: 640px) {
    .gallery-stamp-position { right: 12px; top: 12px; }
}

.gallery-modal-footer {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    background: var(--ink-deep);
    border-top: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

@media (max-width: 640px) {
    .gallery-modal-footer { padding: 0.85rem 1rem; }
}

.gallery-modal-nav {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 1.2rem;
    background: var(--orange);
    color: var(--ink);
    font-family: var(--display-font);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.gallery-modal-nav:hover,
.gallery-modal-nav:focus-visible {
    background: var(--orange-hover);
    outline: none;
}

.gallery-modal-nav svg { transition: transform 0.2s ease; }
.gallery-modal-nav:hover svg:first-child,
.gallery-modal-nav:focus-visible svg:first-child {
    transform: translateX(-4px);
}
.gallery-modal-nav:hover svg:last-child,
.gallery-modal-nav:focus-visible svg:last-child {
    transform: translateX(4px);
}

.gallery-modal-enter-active,
.gallery-modal-leave-active { transition: opacity 0.25s ease; }

.gallery-modal-enter-active .gallery-modal-shell,
.gallery-modal-leave-active .gallery-modal-shell {
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}

.gallery-modal-enter-from,
.gallery-modal-leave-to { opacity: 0; }

.gallery-modal-enter-from .gallery-modal-shell,
.gallery-modal-leave-to .gallery-modal-shell {
    transform: translateY(16px) scale(0.98);
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .gallery-modal-nav,
    .gallery-modal-nav svg,
    .gallery-modal-close { transition: none !important; }
    .gallery-modal-enter-active,
    .gallery-modal-leave-active,
    .gallery-modal-enter-active .gallery-modal-shell,
    .gallery-modal-leave-active .gallery-modal-shell { transition: none !important; }
}
</style>
