<template>
    <section class="scroll-mt-28" id="projects">
        <!-- Header -->
        <div class="relative w-full h-80 flex items-center justify-center text-center text-white">
            <div class="relative z-10 px-4 max-w-3xl">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">{{ t('portfolio.title') }}</h2>
                <p class="text-lg md:text-xl text-gray-200">{{ t('portfolio.subtitle') }}</p>
            </div>
        </div>

        <!-- Gallery Grid -->
        <div class="w-full bg-white/90 backdrop-blur-sm py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
                    <div
                        v-for="(image, index) in galleryImages"
                        :key="index"
                        class="group overflow-hidden aspect-[4/3] bg-gray-200 rounded-sm"
                    >
                        <img
                            :src="image"
                            alt=""
                            loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import projectKitchen from '../assets/project_kitchen.png';
import projectHouse from '../assets/project_house.png';
import projectBathroom from '../assets/project_bathroom.png';
import projectLoft from '../assets/project_loft.png';
import projectOffice from '../assets/project_office.png';

const { t } = useI18n();

// Plain image gallery — to be filled with real photos as collected.
const galleryImages = [
    projectKitchen,
    projectBathroom,
    projectHouse,
    projectLoft,
    projectOffice,
    projectHouse
];
</script>
