<template>
  <header class="legal-hero text-white pt-32 pb-16 border-b border-white/10 relative">
    <div class="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
      <p class="uppercase tracking-[0.2em] text-xs text-blue-400 mb-4">{{ kicker }}</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{{ title }}</h1>
      <p v-if="intro" class="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">{{ intro }}</p>
      <p class="text-sm text-gray-400">
        <span class="uppercase tracking-wider mr-2">{{ lastUpdatedLabel }}:</span>
        <time>{{ effectiveDate }}</time>
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  kicker: string;
  title: string;
  intro?: string;
  lastUpdatedLabel: string;
  effectiveDate: string;
}>();
</script>

<style scoped>
.legal-hero {
  background-color: #0f1219;
  background-image:
    linear-gradient(
      to right,
      rgba(15, 18, 25, 0.65) 0%,
      rgba(15, 18, 25, 0.30) 50%,
      rgba(15, 18, 25, 0.20) 100%
    ),
    url('/hero2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .legal-hero {
    background-position: 35% center;
    background-image:
      linear-gradient(
        to bottom,
        rgba(15, 18, 25, 0.55) 0%,
        rgba(15, 18, 25, 0.40) 40%,
        rgba(15, 18, 25, 0.50) 100%
      ),
      url('/hero2.webp');
  }
}
</style>
