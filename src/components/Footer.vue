<template>
    <footer class="bg-[#1e2a4a] text-white pt-16 pb-8 border-t border-[#33353F] z-10 relative">
        <div class="container mx-auto px-6 md:px-12 lg:px-20">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                <!-- Column 1: KONTAKT (Centers the "About Me" removal request by keeping Contact prominent) -->
                <div>
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-6">{{ t('footer.contact_title') }}</h3>
                    <ul class="space-y-4 text-gray-300">
                        <li class="flex items-center gap-3 group">
                             <svg class="w-5 h-5 text-blue-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                             <span>{{ t('contact.info.phone') }}</span>
                        </li>
                        <li class="flex items-center gap-3 group">
                            <svg class="w-5 h-5 text-blue-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span>{{ t('contact.info.email') }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Column 2: NAŠE SLUŽBY (Taking place of Quick Links/About Me) -->
                <div>
                     <h3 class="text-lg font-bold uppercase tracking-wider mb-6">{{ t('footer.services_title') }}</h3>
                     <ul class="space-y-2 text-gray-300">
                        <li v-for="category in (tm('services.categories') as any[])" :key="category.id">
                            <a href="#services" class="hover:text-white hover:pl-2 transition-all duration-300">{{ rt(category.title) }}</a>
                        </li>
                     </ul>
                </div>

                 <!-- Socials (Kept separate or under info) -->
                 <div class="lg:col-span-1">
                     <h3 class="text-lg font-bold uppercase tracking-wider mb-6">{{ t('footer.follow_us_title') }}</h3>
                     <p class="text-gray-400 text-sm mb-4">
                         {{ t('footer.follow_us_desc') }}
                     </p>
                    <div class="flex gap-4">
                        <a href="#" class="text-gray-400 hover:text-white transition text-2xl"><i class="fab fa-facebook"></i> F</a>
                        <a href="#" class="text-gray-400 hover:text-white transition text-2xl"><i class="fab fa-linkedin"></i> In</a>
                        <a href="#" class="text-gray-400 hover:text-white transition text-2xl"><i class="fab fa-instagram"></i> Ig</a>
                    </div>
                </div>
            </div>

            <!-- Copyright Bar -->
            <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>{{ t('footer.copyright') }}</p>
                <div class="mt-4 md:mt-0">
                    {{ t('footer.design_credit') }}
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();
</script>
