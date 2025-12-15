<template>
  <section class="py-20 bg-white" id="services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Naše služby</h2>
        <p class="text-gray-600 text-lg">Komplexní stavební řešení pro váš domov a firmu.</p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <!-- Column 1: Hrubá stavba -->
        <div class="space-y-8" data-aos="fade-up" data-aos-delay="0">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-transparent pb-2">Hrubá stavba</h3>
          
          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Concrete/Foundation -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Základy a základové desky</h4>
               <p class="text-gray-600 text-sm mt-1">Realizace pevných základů pro rodinné domy a komerční objekty.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
                <!-- Icon: Brick Wall -->
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 4h2a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2m0 0V2h10v2m-10 0h10M3 10h18M3 16h18m-9-6v12m-5-6v6m10-6v6" />
                </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Zdění a nosné konstrukce</h4>
               <p class="text-gray-600 text-sm mt-1">Profesionální vyzdívání z cihel, tvárnic a jiných materiálů.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
                <!-- Icon: Roof -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Střechy a krovy</h4>
               <p class="text-gray-600 text-sm mt-1">Montáž krovů, pokládka střešních krytin a klempířské práce.</p>
             </div>
          </div>
        </div>

        <!-- Column 2: Rekonstrukce a úpravy -->
        <div class="space-y-8" data-aos="fade-up" data-aos-delay="150">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-transparent pb-2">Rekonstrukce a úpravy</h3>
          
          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
                <!-- Icon: Tools -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Kompletní rekonstrukce bytů</h4>
               <p class="text-gray-600 text-sm mt-1">Modernizace bytových jader, elektroinstalace a nové rozvody.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Bath -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Rekonstrukce koupelen</h4>
               <p class="text-gray-600 text-sm mt-1">Obklady, dlažby, sanita a instalatérské práce na klíč.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Insulation/Check -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Zateplení fasád</h4>
               <p class="text-gray-600 text-sm mt-1">Energeticky úsporná řešení a renovace vnějších omítek.</p>
             </div>
          </div>
        </div>

        <!-- Column 3: Dokončovací práce -->
        <div class="space-y-8" data-aos="fade-up" data-aos-delay="300">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-transparent pb-2">Dokončovací práce</h3>
          
          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Paint/Brush -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Omítky a štuky</h4>
               <p class="text-gray-600 text-sm mt-1">Ruční i strojní omítání vnitřních a vnějších stěn.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Roller -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Malířské a natěračské práce</h4>
               <p class="text-gray-600 text-sm mt-1">Kvalitní výmalba interiérů a nátěry fasád.</p>
             </div>
          </div>

          <div class="flex gap-4 items-start">
             <div class="flex-shrink-0 w-10 h-10 text-blue-600">
               <!-- Icon: Layers/Flooring -->
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
             </div>
             <div>
               <h4 class="text-lg font-bold text-gray-900">Pokládka podlah</h4>
               <p class="text-gray-600 text-sm mt-1">Instalace plovoucích podlah, parket, vinylu a dlažby.</p>
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
          Mám zájem o nezávaznou poptávku
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollToSection } from '../lib/scrollToSection.ts';
const { scrollToSection } = useScrollToSection();
</script>
