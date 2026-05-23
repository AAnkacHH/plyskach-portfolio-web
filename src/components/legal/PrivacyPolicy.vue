<template>
  <LegalLayout page="privacy" />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import LegalLayout from './LegalLayout.vue';

const { t } = useI18n();

watchEffect(() => {
  if (typeof document === 'undefined') return;
  document.title = t('legal.privacy.metaTitle');
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', t('legal.privacy.metaDescription'));
});
</script>
