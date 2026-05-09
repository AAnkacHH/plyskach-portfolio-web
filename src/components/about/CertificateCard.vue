<template>
    <div class="cert-card">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            class="w-12 h-12 mb-6"
            aria-hidden="true"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <h3 class="cert-card-title">{{ title }}</h3>
        <p class="cert-card-issuer">{{ issuer }}</p>
        <p class="cert-card-year">{{ year }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    issuer: string;
    year: string;
}>();
</script>

<style scoped>
.cert-card {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: border-color 0.3s ease;
    color: var(--orange);
}

.cert-card:hover { border-color: var(--orange); }

.cert-card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
    line-height: 1.25;
}

.cert-card-issuer {
    font-size: 0.875rem;
    color: #4b5563;
    margin-bottom: 0.75rem;
}

.cert-card-year {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.16em;
}
</style>
