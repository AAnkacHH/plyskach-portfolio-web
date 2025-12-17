<template>
    <section class="bg-white/90 scroll-mt-28 backdrop-blur-sm" id="projects">
        <!-- Header with Background Image -->
        <div class="relative w-full h-80 flex items-center justify-center text-center text-white">
            <div class="absolute inset-0 overflow-hidden">
                <img src="../assets/image.png" alt="Portfolio header" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/50"></div>
            </div>
            <div class="relative z-10 px-4">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">Naše portfolio</h2>
                <p class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                    Prohlédněte si naše dokončené stavební projekty a nechte se inspirovat.
                </p>
            </div>
        </div>

        <!-- Filter Navigation -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                    v-for="category in categories" 
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                        'px-6 py-2 rounded-sm text-sm font-bold transition-all duration-200',
                        selectedCategory === category 
                            ? 'bg-[#4b4845] text-white' 
                            : 'bg-transparent text-[#4b4845] hover:bg-gray-100'
                    ]"
                >
                    {{ category }}
                </button>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
                <div v-for="project in filteredProjects" :key="project.id" class="group cursor-pointer">
                    <!-- Image Card -->
                    <div class="relative overflow-hidden aspect-[4/3] bg-gray-200 mb-4">
                        <img 
                            :src="project.image" 
                            :alt="project.title" 
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    
                    <!-- Content -->
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {{ project.title }}
                            </h3>
                            <p class="text-sm text-gray-500 mt-1" v-if="project.location">
                                {{ project.location }}
                            </p>
                        </div>
                        <div class="text-gray-400 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import projectKitchen from '../assets/project_kitchen.png';
import projectHouse from '../assets/project_house.png';
import projectBathroom from '../assets/project_bathroom.png';
import projectLoft from '../assets/project_loft.png';
import projectOffice from '../assets/project_office.png';

// Categories matching the screenshot
const categories = ['Vše', 'Novostavby', 'Rekonstrukce', 'Koupelny', 'Interiéry', 'Exteriéry'];
const selectedCategory = ref('Vše');

const Projects = ref([
    {
        id: 1,
        category: 'Rekonstrukce',
        image: projectKitchen,
        title: 'Rekonstrukce kuchyně v Praze',
        location: 'Praha'
    },
    {
        id: 2,
        category: 'Novostavby',
        image: projectHouse,
        title: 'Novostavba rodinného domu',
        location: 'Brno'
    },
    {
        id: 3,
        category: 'Koupelny',
        image: projectBathroom,
        title: 'Designová koupelna',
        location: 'Plzeň'
    },
    {
        id: 4,
        category: 'Interiéry',
        image: projectLoft,
        title: 'Půdní vestavba',
        location: 'Olomouc'
    },
    {
        id: 5,
        category: 'Rekonstrukce',
        image: projectOffice,
        title: 'Rekonstrukce kanceláří',
        location: 'Ostrava'
    },
    {
        id: 6,
        category: 'Exteriéry',
        image: projectHouse,
        title: 'Terasa a pergolové přístřešky',
        location: 'Liberec'
    }
]);

const filteredProjects = computed(() => {
    if (selectedCategory.value === 'Vše') {
        return Projects.value;
    }
    return Projects.value.filter(project => project.category === selectedCategory.value);
})

</script>
