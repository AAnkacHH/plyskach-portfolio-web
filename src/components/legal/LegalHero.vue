<template>
  <header class="text-white pt-32 pb-16 border-b border-white/10 relative">
    <div class="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
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
