<template>
    <Teleport to="body">
        <Transition name="cert-modal">
            <div
                v-if="open"
                class="cert-modal"
                role="dialog"
                aria-modal="true"
                :aria-label="title"
                @click.self="close"
            >
                <div class="cert-modal-shell" @click.stop>
                    <header class="cert-modal-header">
                        <div class="cert-modal-header-info">
                            <span class="cert-modal-eyebrow">— {{ courseLabel }}</span>
                            <h3 class="cert-modal-title">{{ title }}</h3>
                            <p class="cert-modal-subtitle">{{ subtitle }}</p>
                        </div>
                        <button
                            type="button"
                            class="cert-modal-close"
                            @click="close"
                            :aria-label="closeLabel"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>

                    <div class="cert-modal-body">
                        <img
                            :src="image"
                            :alt="alt"
                            :width="width"
                            :height="height"
                            class="cert-modal-image"
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    <footer class="cert-modal-footer">
                        <dl class="cert-modal-meta">
                            <dt class="cert-modal-meta-label">{{ issuedLabel }}</dt>
                            <dd class="cert-modal-meta-value">{{ datesFull }}</dd>
                        </dl>
                        <a
                            class="cert-modal-cta"
                            :href="issuerUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{{ issuerLinkLabel }}</span>
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
import { useModalLock } from '../../lib/useModalLock';

const props = defineProps<{
    open: boolean;
    title: string;
    subtitle: string;
    image: string;
    alt: string;
    width: number;
    height: number;
    datesFull: string;
    issuerUrl: string;
    courseLabel: string;
    issuedLabel: string;
    issuerLinkLabel: string;
    closeLabel: string;
}>();

const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const close = () => emit('update:open', false);

useModalLock(toRef(props, 'open'), close);
</script>

<style scoped>
.cert-modal {
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
    .cert-modal { padding: 0; }
}

.cert-modal-shell {
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
    .cert-modal-shell { max-height: 100vh; height: 100vh; }
}

.cert-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--ink-deep);
    border-bottom: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

.cert-modal-header-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.cert-modal-eyebrow {
    font-family: var(--display-font);
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--orange);
    font-weight: 600;
}

.cert-modal-title {
    font-family: var(--display-font);
    font-size: 1.05rem;
    font-weight: 700;
    color: #fefdfb;
    letter-spacing: 0.06em;
    line-height: 1.2;
    margin: 0.15rem 0 0;
}

.cert-modal-subtitle {
    font-size: 0.78rem;
    color: rgba(254, 253, 251, 0.7);
    line-height: 1.35;
    margin: 0.15rem 0 0;
    font-style: italic;
}

.cert-modal-close {
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

.cert-modal-close:hover {
    background: var(--orange);
    color: var(--ink);
    border-color: var(--orange);
}

.cert-modal-body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    background: #1a1714;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    overflow: auto;
}

.cert-modal-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.cert-modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1.25rem;
    background: var(--ink-deep);
    border-top: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
    flex-wrap: wrap;
}

@media (max-width: 640px) {
    .cert-modal-footer { padding: 0.85rem 1rem; gap: 0.75rem; }
}

.cert-modal-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.85rem;
    row-gap: 0.15rem;
    margin: 0;
    min-width: 0;
}

.cert-modal-meta-label {
    font-family: var(--display-font);
    font-size: 0.58rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--orange);
    font-weight: 600;
    align-self: center;
}

.cert-modal-meta-value {
    font-size: 0.82rem;
    color: #fefdfb;
    line-height: 1.35;
    margin: 0;
}

.cert-modal-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 1.2rem;
    background: var(--orange);
    color: var(--ink);
    font-family: var(--display-font);
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: none;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
}

.cert-modal-cta:hover {
    background: var(--orange-hover);
    transform: translateX(2px);
}

.cert-modal-cta svg { transition: transform 0.2s ease; }
.cert-modal-cta:hover svg { transform: translateX(4px); }

/* Modal enter/leave transition */
.cert-modal-enter-active,
.cert-modal-leave-active { transition: opacity 0.25s ease; }

.cert-modal-enter-active .cert-modal-shell,
.cert-modal-leave-active .cert-modal-shell {
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}

.cert-modal-enter-from,
.cert-modal-leave-to { opacity: 0; }

.cert-modal-enter-from .cert-modal-shell,
.cert-modal-leave-to .cert-modal-shell {
    transform: translateY(16px) scale(0.98);
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .cert-modal-cta,
    .cert-modal-cta svg { transition: none !important; }
}
</style>
