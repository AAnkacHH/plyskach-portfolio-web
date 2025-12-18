<template>
  <section class="py-20 bg-blue-600 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
       <svg class="h-full w-full text-white" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
         <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"/>
       </svg>
    </div>

    <div class="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
      <h2 class="text-4xl font-bold text-white text-left mb-12 px-4 xl:pl-16">{{ t('testimonials.title') }}</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in (tm('testimonials.items') as any[])" 
          :key="testimonial.id"
          class="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          data-aos="fade-up"
          :data-aos-delay="testimonial.id * 100"
        >
          <!-- Stars -->
          <div class="flex text-yellow-400 mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <!-- Comment -->
          <p class="text-gray-600 mb-6 italic min-h-[80px]">"{{ rt(testimonial.comment) }}"</p>

          <!-- Author -->
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
               {{ rt(testimonial.fullName).charAt(0) }}
             </div>
             <div>
               <h4 class="font-bold text-gray-900">{{ rt(testimonial.fullName) }}</h4>
               <p class="text-xs text-blue-600 font-bold uppercase tracking-wide">{{ rt(testimonial.role) }}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();
</script>