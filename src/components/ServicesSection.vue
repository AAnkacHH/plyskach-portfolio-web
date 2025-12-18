<template>
  <section class="py-20 bg-white/90 scroll-mt-20 backdrop-blur-sm" id="services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ t('services.title') }}</h2>
        <p class="text-gray-600 text-lg">{{ t('services.subtitle') }}</p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div 
          v-for="(category, index) in (tm('services.categories') as any[])" 
          :key="category.id" 
          class="space-y-8" 
          data-aos="fade-up" 
          :data-aos-delay="index * 150"
        >
          <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-transparent pb-2">{{ rt(category.title) }}</h3>
          
          <div v-for="item in category.items" :key="item.id" class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="icons[item.id]"/>
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">{{ rt(item.title) }}</h4>
               <p class="text-gray-600 text-sm mt-1">{{ rt(item.desc) }}</p>
             </div>
          </div>
        </div>

      </div>
      
      <!-- CTA Button -->
      <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
        <button 
           @click="scrollToSection('#contact')"
           class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors shadow-sm"
        >
          {{ t('services.cta_btn') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';
import { icons } from '../constants/icons';

const { scrollToSection } = useScrollToSection();
const { t, tm, rt } = useI18n();
</script>
