<template>
    <!-- Variant: link (clickable row, opens href) -->
    <a
        v-if="variant === 'link'"
        :href="href"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined"
        class="register-row"
    >
        <span class="register-row-num">{{ num }}</span>
        <div class="register-row-body">
            <span class="register-row-label">{{ label }}</span>
            <span class="register-row-value">{{ value }}</span>
        </div>
        <span class="register-row-arrow" aria-hidden="true">↗</span>
    </a>

    <!-- Variant: address (value + inline action buttons via slot) -->
    <div
        v-else-if="variant === 'address'"
        class="register-row register-row--address"
    >
        <span class="register-row-num">{{ num }}</span>
        <div class="register-row-body">
            <span class="register-row-label">{{ label }}</span>
            <span class="register-row-value">{{ value }}</span>
            <div v-if="$slots.actions" class="register-row-actions">
                <slot name="actions" />
            </div>
        </div>
    </div>

    <!-- Variant: static (no interaction) -->
    <div v-else class="register-row register-row--static">
        <span class="register-row-num">{{ num }}</span>
        <div class="register-row-body">
            <span class="register-row-label">{{ label }}</span>
            <span class="register-row-value">{{ value }}</span>
        </div>
        <span class="register-row-arrow register-row-arrow--mute" aria-hidden="true">·</span>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        num: string;
        label: string;
        value: string;
        variant?: 'link' | 'static' | 'address';
        href?: string;
        external?: boolean;
    }>(),
    { variant: 'static', external: false }
);
</script>

<style scoped>
.register-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.25rem;
    padding: 1.5rem 0.25rem 1.5rem 0;
    border-bottom: 1px solid rgba(26, 24, 21, 0.18);
    text-decoration: none;
    color: var(--ink);
    transition: padding 0.35s cubic-bezier(0.7, 0, 0.2, 1),
                background 0.35s ease,
                color 0.25s ease;
    position: relative;
}

.register-row::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scaleY(0);
    transform-origin: center;
    width: 2px;
    height: 70%;
    background: var(--orange);
    transition: transform 0.35s cubic-bezier(0.7, 0, 0.2, 1);
}

a.register-row:hover {
    padding-left: 1.25rem;
    background: rgba(245, 125, 31, 0.04);
    color: var(--orange);
}

a.register-row:hover::before {
    transform: translateY(-50%) scaleY(1);
}

.register-row-num {
    font-family: var(--display-font);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--orange);
    min-width: 2rem;
    line-height: 1;
}

.register-row-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
}

.register-row-label {
    font-family: var(--display-font);
    font-size: 0.68rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(26, 24, 21, 0.55);
    font-weight: 500;
}

.register-row-value {
    font-size: 1.15rem;
    font-weight: 500;
    color: inherit;
    line-height: 1.35;
    word-break: break-word;
    transition: color 0.25s ease;
}

@media (min-width: 1024px) {
    .register-row-value { font-size: 1.25rem; }
}

.register-row-arrow {
    font-family: var(--display-font);
    font-size: 1.35rem;
    line-height: 1;
    color: rgba(26, 24, 21, 0.35);
    transition: opacity 0.3s ease, transform 0.3s ease, color 0.25s ease;
    align-self: center;
}

a.register-row:hover .register-row-arrow {
    transform: translateX(4px);
    color: var(--orange);
}

.register-row-arrow--mute {
    color: rgba(26, 24, 21, 0.25);
    font-size: 1.6rem;
}

.register-row--address {
    grid-template-columns: auto 1fr;
}

.register-row-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.6rem;
}

:slotted(.register-row-action) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.8rem;
    background: transparent;
    color: var(--ink);
    font-family: var(--display-font);
    font-weight: 600;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: 1.5px solid var(--ink);
    cursor: pointer;
    border-radius: 0;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
}

:slotted(.register-row-action:hover) {
    background: var(--ink);
    color: var(--orange);
    border-color: var(--ink);
}

@media (max-width: 640px) {
    .register-row {
        gap: 1rem;
        padding: 1.25rem 0;
    }
    .register-row-num { font-size: 1.1rem; }
    .register-row-value { font-size: 1.05rem; }
    .register-row-arrow { font-size: 1.1rem; }
    :slotted(.register-row-action) { font-size: 0.66rem; padding: 0.4rem 0.7rem; }
}

@media (prefers-reduced-motion: reduce) {
    .register-row,
    .register-row::before,
    .register-row-arrow { transition: none !important; }
}
</style>
