<template>
    <section id="about" class="scroll-mt-28">
        <!-- Hero Part: House background with O NAS text -->
        <!-- Background Content Removed to show Global Fixed Background -->
        <div class="relative w-full h-[500px] flex items-center container mx-auto px-6 md:px-12 lg:px-20">
            <div class="text-white max-w-2xl" data-aos="fade-up">
                <h2 class="text-5xl md:text-6xl font-bold uppercase mb-4 tracking-wide">O NÁS</h2>
                <p class="text-xl md:text-2xl font-light opacity-90">
                    Profesionální stavební služby <br/>
                    s důrazem na kvalitu a spolehlivost.
                </p>
            </div>
        </div>

        <!-- Main Content Area (Full Width) -->
        <div class="w-full bg-white/90 backdrop-blur-sm">
            
            <!-- Profile Section -->
            <div class="container mx-auto px-6 md:px-12 lg:px-20 py-20">
                <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <!-- Profile Image -->
                    <div class="flex-shrink-0" data-aos="fade-right">
                        <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                             <!-- Fallback image since we might not have 'Jan Novak'. Using test.png or mobile.jpg as placeholder -->
                            <img 
                                src="../assets/builder_profile.png" 
                                alt="Mykhaylo Plyskach" 
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="text-center mt-6">
                            <h3 class="text-2xl font-bold text-gray-900">Mykhaylo Plyskach</h3>
                            <p class="text-gray-600 font-medium">Stavební inženýr</p>
                        </div>
                    </div>

                    <!-- Bio Text -->
                    <div class="max-w-2xl text-center md:text-left" data-aos="fade-left">
                        <p class="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                            S více než 20 lety zkušeností v oboru stavíme domy, které vydrží. Mým posláním je přeměňovat vize klientů v realitu, 
                            s důrazem na preciznost, inovace a trvalou udržitelnost.
                        </p>
                        <p class="text-gray-600 mb-8">
                            Specializujeme se na kompletní realizace rodinných domů, rekonstrukce a komerční projekty.
                        </p>
                        
                        <button 
                             @click="scrollToSection('#contact')"
                            class="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-sm shadow-md transition-all"
                        >
                            Kontaktovat
                        </button>
                    </div>
                </div>
            </div>

            <!-- Values / Philosophy Section -->
            <div class="py-20 border-t border-gray-200">
                 <div class="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                     <h2 class="text-3xl font-bold text-gray-800 uppercase tracking-widest mb-16">NAŠE HODNOTY A FILOZOFIE</h2>
                     
                     <div class="grid md:grid-cols-3 gap-12">
                         <!-- Value 1 -->
                         <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="0">
                             <div class="w-20 h-20 mb-6 text-blue-600">
                                 <!-- Quality Icon (Badge/Star) -->
                                 <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                 </svg>
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">Kvalita</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 Používáme pouze prvotřídní materiály a moderní technologie.
                             </p>
                         </div>
                         
                         <!-- Value 2 -->
                         <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="150">
                             <div class="w-20 h-20 mb-6 text-blue-600">
                                 <!-- Transparency Icon (Document/Search) -->
                                 <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">Transparentnost</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 Jasná komunikace a dodržování rozpočtu a termínů.
                             </p>
                         </div>
                         
                         <!-- Value 3 -->
                         <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                             <div class="w-20 h-20 mb-6 text-blue-600">
                                 <!-- Reliability Icon (Shield) -->
                                 <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                 </svg>
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">Spolehlivost</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 Jsme partnerem, na kterého se můžete spolehnout od návrhu po předání.
                             </p>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useScrollToSection } from '../lib/scrollToSection.ts';
const { scrollToSection } = useScrollToSection();
</script>
