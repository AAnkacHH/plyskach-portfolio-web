<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center cursor-pointer" @click="scrollToSection('#app')">
          <div class="flex items-center gap-2">
            <!-- Icon placeholder -->
             <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            <span class="font-bold text-xl text-gray-900 tracking-tight">{{ t('general.brand') }}</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 items-center">
            <a v-for="item in Menu" 
               :key="item.name" 
               :href="item.href"
               class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                @click.prevent="scrollToSection(item.href)"
            >
                {{ item.name }}
            </a>
            
            <!-- Language Switcher (Desktop) -->
            <div class="relative ml-4">
                <button @click="isLangOpen = !isLangOpen" class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium focus:outline-none">
                    <span class="text-xl">{{ currentFlag }}</span> 
                     <!-- Language Code/Name (Hidden on small screens if needed, but requested to show on left) -->
                    <span>{{ currentLangLabel }}</span>
                    <svg class="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                    
                <!-- Dropdown -->
                <div v-if="isLangOpen" class="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
                    <button 
                        @click="switchLanguage('cs')" 
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                         <span class="text-lg">🇨🇿</span> Čeština
                    </button>
                    <button 
                        @click="switchLanguage('en')" 
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                         <span class="text-lg">🇬🇧</span> English
                    </button>
                     <button 
                        @click="switchLanguage('uk')" 
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                         <span class="text-lg">🇺🇦</span> Українська
                    </button>
                </div>
            </div>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
          <a href="#contact" 
             class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors shadow-sm ml-6"
             @click.prevent="scrollToSection('#contact')"
          >
            {{ t('nav.quote_btn') }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-4">
            <!-- Language Switcher (Mobile) -->
             <button @click="toggleLangMobile" class="text-xl focus:outline-none">
                  {{ currentFlag }}
             </button>

          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-700 hover:text-blue-600 focus:outline-none">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-white border-t border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a v-for="item in Menu" 
           :key="item.name" 
           :href="item.href"
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
           @click.prevent="handleMobileClick(item.href)"
        >
          {{ item.name }}
        </a>
         <a href="#contact" 
           class="block w-full text-center mt-4 px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
           @click.prevent="handleMobileClick('#contact')"
        >
            {{ t('nav.quote_btn') }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useScrollToSection } from '../lib/scrollToSection.ts';
import { useI18n } from 'vue-i18n';

const { scrollToSection, isMenuOpen } = useScrollToSection();
const { t, locale } = useI18n();

const isLangOpen = ref(false);

const currentFlag = computed(() => {
    switch(locale.value) {
        case 'cs': return '🇨🇿';
        case 'en': return '🇬🇧';
        case 'uk': return '🇺🇦';
        default: return '🇨🇿';
    }
});

const currentLangLabel = computed(() => {
    switch(locale.value) {
        case 'cs': return 'CZ';
        case 'en': return 'EN';
        case 'uk': return 'UA';
        default: return 'CZ';
    }
});

const switchLanguage = (lang) => {
    locale.value = lang;
    localStorage.setItem('user-locale', lang);
    isLangOpen.value = false;
};

// Simple toggle for mobile if we want to cycle or just show flag
const toggleLangMobile = () => {
    // Cycle CS -> EN -> UK -> CS
    if (locale.value === 'cs') {
        switchLanguage('en');
    } else if (locale.value === 'en') {
        switchLanguage('uk');
    } else {
        switchLanguage('cs');
    }
}

// Close dropdown when clicking outside
onMounted(() => {
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.relative')) {
            isLangOpen.value = false;
        }
    });
});


// Separate logic for mobile to ensure menu closes
const handleMobileClick = (href) => {
    scrollToSection(href);
    isMenuOpen.value = false;
};

// Menu items matching the screenshot
const Menu = computed(() => [
    {name: t('nav.about'), href:'#about'},
    {name: t('nav.services'), href:'#services'},
    {name: t('nav.references'), href:'#projects'}, // Maps to 'Reference' in screenshot, using #projects anchor based on existing code map
    {name: t('nav.contact'), href:'#contact'},
]);
</script>