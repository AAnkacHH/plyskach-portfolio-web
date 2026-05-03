<template>
    <section id="about" class="scroll-mt-28">
        <!-- Hero Part: House background with O NAS text -->
        <!-- Background Content Removed to show Global Fixed Background -->
        <div class="relative w-full h-[500px] flex items-center container mx-auto px-6 md:px-12 lg:px-20">
            <div class="text-white max-w-2xl" data-aos="fade-up">
                <h2 class="text-5xl md:text-6xl font-bold uppercase mb-4 tracking-wide">{{ t('about.title') }}</h2>
                <p class="text-xl md:text-2xl font-light opacity-90">
                    {{ t('about.subtitle_line1') }} <br/>
                    {{ t('about.subtitle_line2') }}
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
                            <h3 class="text-2xl font-bold text-gray-900">{{ t('about.person_name') }}</h3>
                            <p class="text-gray-600 font-medium">{{ t('about.person_role') }}</p>
                        </div>
                    </div>

                    <!-- Bio Text -->
                    <div class="max-w-2xl text-center md:text-left" data-aos="fade-left">
                        <p class="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                            {{ t('about.bio_p1') }}
                        </p>
                        <p class="text-gray-600 mb-8">
                            {{ t('about.bio_p2') }}
                        </p>
                        
                        <button 
                             @click="scrollToSection('#contact')"
                            class="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-sm shadow-md transition-all"
                        >
                            {{ t('about.contact_btn') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Values / Philosophy Section -->
            <div class="py-20 border-t border-gray-200">
                 <div class="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                     <h2 class="text-3xl font-bold text-gray-800 uppercase tracking-widest mb-16">{{ t('about.values_title') }}</h2>
                     
                     <div class="grid md:grid-cols-3 gap-12">
                         <!-- Step 1: Site Visit & Quote -->
                         <div class="flex flex-col items-center relative" data-aos="fade-up" data-aos-delay="0">
                             <div class="w-16 h-16 mb-6 rounded-full bg-[#f57d1f] text-white flex items-center justify-center text-2xl font-bold">
                                 1
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('about.values.step1.title') }}</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 {{ t('about.values.step1.desc') }}
                             </p>
                         </div>

                         <!-- Step 2: Date Agreement -->
                         <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="150">
                             <div class="w-16 h-16 mb-6 rounded-full bg-[#f57d1f] text-white flex items-center justify-center text-2xl font-bold">
                                 2
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('about.values.step2.title') }}</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 {{ t('about.values.step2.desc') }}
                             </p>
                         </div>

                         <!-- Step 3: Honest Work -->
                         <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                             <div class="w-16 h-16 mb-6 rounded-full bg-[#f57d1f] text-white flex items-center justify-center text-2xl font-bold">
                                 3
                             </div>
                             <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('about.values.step3.title') }}</h3>
                             <p class="text-gray-600 max-w-xs mx-auto">
                                 {{ t('about.values.step3.desc') }}
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
import { useI18n } from 'vue-i18n';

const { scrollToSection } = useScrollToSection();
const { t } = useI18n();
</script>
