<template>
    <div
        class="relative w-full flex items-center justify-center text-center text-white px-4"
        :class="heightClass"
    >
        <div class="relative z-10 max-w-3xl" data-aos="fade-up">
            <h2 :class="titleClass">
                <slot name="title">{{ title }}</slot>
            </h2>
            <p v-if="subtitle || $slots.subtitle" :class="subtitleClass">
                <slot name="subtitle">{{ subtitle }}</slot>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    title?: string;
    subtitle?: string;
    /** Strip height variant: short (default) or tall (e.g. main "About me" hero). */
    height?: 'short' | 'tall';
    /** Title scale. */
    size?: 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    height: 'short',
    size: 'md'
});

const heightClass = computed(() =>
    props.height === 'tall' ? 'h-[420px] md:h-[500px]' : 'h-72 md:h-80'
);

const titleClass = computed(() =>
    props.size === 'lg'
        ? 'text-5xl md:text-6xl font-bold uppercase mb-4 tracking-wide'
        : 'text-4xl md:text-5xl font-bold uppercase mb-4 tracking-wide'
);

const subtitleClass = computed(() =>
    props.size === 'lg'
        ? 'text-xl md:text-2xl font-light opacity-90'
        : 'text-base md:text-lg text-gray-200 leading-relaxed'
);
</script>
