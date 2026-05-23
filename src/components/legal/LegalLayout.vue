<template>
  <article class="bg-white text-gray-900">
    <LegalHero
      :kicker="t(`legal.${page}.kicker`)"
      :title="t(`legal.${page}.title`)"
      :intro="t(`legal.${page}.intro`)"
      :last-updated-label="t('legal.lastUpdated')"
      :effective-date="t(`legal.${page}.effectiveDate`)"
    />

    <section class="container mx-auto px-6 md:px-12 lg:px-20 py-16 max-w-4xl">
      <!-- TOC -->
      <nav v-if="sections.length > 1" :aria-label="t('legal.tocTitle')" class="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">{{ t('legal.tocTitle') }}</h2>
        <ol class="space-y-2 text-sm">
          <li v-for="s in sections" :key="s.id">
            <a :href="`#${s.id}`" class="text-blue-600 hover:text-blue-800 hover:underline">{{ s.title }}</a>
          </li>
        </ol>
      </nav>

      <!-- Sections -->
      <div class="prose-legal space-y-12">
        <section
          v-for="s in sections"
          :key="s.id"
          :id="s.id"
          class="scroll-mt-24"
        >
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{{ s.title }}</h2>
          <p
            v-for="(para, i) in s.paragraphs"
            :key="i"
            class="text-gray-700 leading-relaxed mb-4 whitespace-pre-line"
            v-html="renderParagraph(para)"
          />
          <ul v-if="s.list" class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li v-for="(item, i) in s.list" :key="i" v-html="renderParagraph(item)" />
          </ul>
        </section>
      </div>

      <!-- AI translation disclaimer (non-authoritative locales only) -->
      <aside
        v-if="locale !== 'cs'"
        class="mt-16 p-4 bg-amber-50 border-l-4 border-amber-300 text-sm text-amber-900 rounded-r"
      >
        {{ rt(t('legal.aiTranslationNote'), emailParams) }}
      </aside>

      <!-- Back to home -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <RouterLink
          :to="homeLink"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('legal.backToHome') }}
        </RouterLink>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LegalHero from './LegalHero.vue';

interface Section {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
}

const props = defineProps<{
  page: 'privacy' | 'terms' | 'notice';
}>();

const { t, tm, rt, locale } = useI18n();

const emailParams = {
  privacyEmail: 'privacy@mykhayloplyskach.com',
  workEmail: 'maria.andrej@centrum.cz',
};

const sections = computed<Section[]>(() => {
  const raw = tm(`legal.${props.page}.sections`) as Section[] | undefined;
  return Array.isArray(raw) ? raw : [];
});

const homeLink = computed(() => (locale.value === 'cs' ? '/' : `/${locale.value}`));

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c] as string));

function renderParagraph(text: string): string {
  // Render {privacyEmail}/{workEmail} as mailto links; expand bare URLs into links.
  let html = escapeHtml(text);
  html = html.replace(/\{privacyEmail\}/g, () =>
    `<a class="text-blue-600 hover:underline" href="mailto:${emailParams.privacyEmail}">${emailParams.privacyEmail}</a>`,
  );
  html = html.replace(/\{workEmail\}/g, () =>
    `<a class="text-blue-600 hover:underline" href="mailto:${emailParams.workEmail}">${emailParams.workEmail}</a>`,
  );
  html = html.replace(/\bhttps?:\/\/[^\s<]+/g, (url) =>
    `<a class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href="${url}">${url}</a>`,
  );
  return html;
}
</script>

<style scoped>
.prose-legal :deep(strong) {
  font-weight: 600;
  color: #111827;
}
</style>
