<template>
  <div v-if="files.length > 0" class="mt-4 space-y-2">
    <div 
      v-for="(file, index) in files" 
      :key="index" 
      class="group relative flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3 transition-colors hover:bg-gray-100"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <!-- File Icon -->
        <div class="bg-blue-100 p-2 rounded-lg text-blue-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
        </div>
        <!-- File Info -->
        <div class="min-w-0">
            <p class="text-sm font-medium text-gray-700 truncate block">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ formatSize(file.data.length * 0.75) }}</p>
        </div>
      </div>

      <!-- Delete Button (Visible on Hover) -->
      <button 
        type="button"
        @click="$emit('remove', index)"
        class="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-red-500 hover:text-red-700 p-2 transition-opacity"
        :title="t('file_preview.remove_file_title')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  files: {
    type: Array,
    required: true
  }
});

defineEmits(['remove']);

const { t } = useI18n();

const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
</script>
