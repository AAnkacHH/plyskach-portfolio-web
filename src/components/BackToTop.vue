<template>
    <Transition name="fade">
        <button 
            v-if="isVisible" 
            @click="scrollToTop" 
            class="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-40"
            aria-label="Back to top"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        </button>
    </Transition>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const isVisible = ref(false);

    // rAF-throttled scroll handler — fires at most once per frame (60fps),
    // not on every pixel-scroll event. Combined with `passive: true`, this
    // unblocks the main thread so scrolling stays buttery.
    let rafId = null;
    const handleScroll = () => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            isVisible.value = window.scrollY > 300;
            rafId = null;
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const listenerOpts = { passive: true };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, listenerOpts);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll, listenerOpts);
        if (rafId !== null) cancelAnimationFrame(rafId);
    });
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
