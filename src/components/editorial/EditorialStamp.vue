<template>
    <div class="editorial-stamp" :class="sizeClass">
        <span class="editorial-stamp-num">{{ num }}</span>
        <span v-if="label" class="editorial-stamp-label">{{ label }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    num: string;
    label?: string;
    size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), { size: 'md' });

const sizeClass = computed(() =>
    props.size === 'sm' ? 'editorial-stamp--sm' : ''
);
</script>

<style scoped>
.editorial-stamp--sm {
    padding: 0.5rem 0.75rem 0.55rem;
}
.editorial-stamp--sm :deep(.editorial-stamp-num) { font-size: 0.62rem; }
.editorial-stamp--sm :deep(.editorial-stamp-label) {
    font-size: 0.54rem;
    letter-spacing: 0.22em;
}
</style>
