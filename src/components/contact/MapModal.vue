<template>
    <Teleport to="body">
        <Transition name="map-modal">
            <div
                v-if="open"
                class="map-modal"
                role="dialog"
                aria-modal="true"
                :aria-label="title"
                @click.self="close"
            >
                <div class="map-modal-shell" @click.stop>
                    <header class="map-modal-header">
                        <div class="map-modal-header-info">
                            <span class="map-modal-eyebrow">— {{ title }}</span>
                            <span class="map-modal-address">{{ address }}</span>
                        </div>
                        <button
                            type="button"
                            class="map-modal-close"
                            @click="close"
                            :aria-label="closeLabel"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>

                    <div class="map-modal-body">
                        <iframe
                            class="map-modal-iframe"
                            :title="address"
                            :src="embedUrl"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>

                        <EditorialStamp
                            class="map-stamp-position"
                            :num="`Nº ${stampNum} · GPS`"
                            :label="coordsLabel"
                            size="sm"
                        />
                    </div>

                    <footer class="map-modal-footer">
                        <a
                            class="map-modal-cta"
                            :href="externalLink"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{{ openLabel }}</span>
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import EditorialStamp from '../editorial/EditorialStamp.vue';
import { useModalLock } from '../../lib/useModalLock';

const props = defineProps<{
    open: boolean;
    title: string;
    address: string;
    embedUrl: string;
    externalLink: string;
    coordsLabel: string;
    openLabel: string;
    closeLabel: string;
    stampNum?: string;
}>();

const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const close = () => emit('update:open', false);

useModalLock(toRef(props, 'open'), close);
</script>

<style scoped>
.map-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(12, 10, 8, 0.78);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

@media (max-width: 640px) {
    .map-modal { padding: 0; }
}

.map-modal-shell {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    max-height: calc(100vh - 3rem);
    background: var(--ink);
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.4),
        0 32px 80px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

@media (max-width: 640px) {
    .map-modal-shell { max-height: 100vh; height: 100vh; }
}

.map-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--ink-deep);
    border-bottom: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

.map-modal-header-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.map-modal-eyebrow {
    font-family: var(--display-font);
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--orange);
    font-weight: 600;
}

.map-modal-address {
    font-size: 0.95rem;
    font-weight: 500;
    color: #fefdfb;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (max-width: 640px) {
    .map-modal-address { white-space: normal; font-size: 0.85rem; }
}

.map-modal-close {
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

.map-modal-close:hover {
    background: var(--orange);
    color: var(--ink);
    border-color: var(--orange);
}

.map-modal-body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    background: var(--ink);
}

.map-modal-iframe {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 360px;
    border: 0;
    filter: grayscale(0.12) contrast(0.96) sepia(0.04);
}

.map-stamp-position {
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 2;
}

@media (max-width: 640px) {
    .map-stamp-position { right: 12px; top: 12px; }
}

.map-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.85rem 1.25rem;
    background: var(--ink-deep);
    border-top: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

@media (max-width: 640px) {
    .map-modal-footer { padding: 0.85rem 1rem; }
}

.map-modal-cta {
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
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.map-modal-cta:hover {
    background: var(--orange-hover);
    transform: translateX(2px);
}

.map-modal-cta svg { transition: transform 0.2s ease; }
.map-modal-cta:hover svg { transform: translateX(4px); }

/* Modal enter/leave transition */
.map-modal-enter-active,
.map-modal-leave-active { transition: opacity 0.25s ease; }

.map-modal-enter-active .map-modal-shell,
.map-modal-leave-active .map-modal-shell {
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}

.map-modal-enter-from,
.map-modal-leave-to { opacity: 0; }

.map-modal-enter-from .map-modal-shell,
.map-modal-leave-to .map-modal-shell {
    transform: translateY(16px) scale(0.98);
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .map-modal-cta,
    .map-modal-cta svg { transition: none !important; }
}
</style>
