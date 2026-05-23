<template>
    <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <!-- Profile Image -->
        <div class="flex-shrink-0" data-aos="fade-right">
            <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                    src="/profile.webp"
                    width="320"
                    height="320"
                    loading="lazy"
                    decoding="async"
                    :alt="name"
                    class="w-full h-full object-cover"
                />
            </div>
            <div class="text-center mt-6">
                <h3 class="text-2xl font-bold text-gray-900">{{ name }}</h3>
                <p class="text-gray-600 font-medium">{{ role }}</p>
            </div>
        </div>

        <!-- Bio -->
        <div class="max-w-2xl text-center md:text-left" data-aos="fade-left">
            <p class="text-gray-700 text-lg leading-relaxed mb-6 font-medium">{{ bio1 }}</p>
            <p class="text-gray-600 mb-6">{{ bio2 }}</p>
            <p class="text-gray-600 mb-8">{{ bio3 }}</p>

            <button
                type="button"
                @click="emit('contact')"
                class="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-sm shadow-md transition-all"
            >
                {{ contactBtn }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    role: string;
    bio1: string;
    bio2: string;
    bio3: string;
    contactBtn: string;
}>();

const emit = defineEmits<{
    contact: [];
}>();
</script>
