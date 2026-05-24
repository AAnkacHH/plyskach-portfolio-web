<template>
    <main class="preview">
        <header class="bar">
            <h1>Email preview</h1>
            <div class="controls">
                <div class="group">
                    <button
                        v-for="t in templateTypes"
                        :key="t"
                        :class="['btn', { active: activeType === t }]"
                        @click="activeType = t"
                    >{{ t }}</button>
                </div>
                <div class="group">
                    <button
                        v-for="l in locales"
                        :key="l"
                        :class="['btn', { active: activeLocale === l }]"
                        @click="activeLocale = l"
                    >{{ l.toUpperCase() }}</button>
                </div>
                <div class="group">
                    <span class="meta">Subject:</span>
                    <code class="meta">{{ subject }}</code>
                </div>
            </div>
        </header>
        <iframe
            class="frame"
            :srcdoc="html"
            sandbox=""
            title="Email preview"
        ></iframe>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import csLocale from '../locales/cs.json';
import enLocale from '../locales/en.json';
import ukLocale from '../locales/uk.json';
import { buildOwnerEmail, buildAckEmail } from '../lib/emailTemplates.js';

const templateTypes = ['owner', 'ack'];
const locales = ['cs', 'en', 'uk'];

const activeType = ref('owner');
const activeLocale = ref('cs');

onMounted(() => {
    document.title = 'Email preview · Mykhaylo Plyskach';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
});

const localeBundles = { cs: csLocale, en: enLocale, uk: ukLocale };

const sampleData = {
    name: 'Jan Novák',
    email: 'jan.novak@example.com',
    phone: '+420 777 123 456',
    service: 'Obklady a dlažba',
    message: 'Dobrý den,\n\npotřeboval bych obložit koupelnu o ploše cca 8 m². Plánuju to udělat během srpna. Keramiku už mám, hledám zkušeného zedníka.\n\nDíky,\nJan',
};

function interpolate(str, params) {
    return str.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '');
}

const ownerBlock = computed(() => localeBundles[activeLocale.value].contact.form.owner);
const ackBlock = computed(() => localeBundles[activeLocale.value].contact.form.ack);

const subject = computed(() => {
    if (activeType.value === 'owner') {
        return interpolate(ownerBlock.value.subject, { service: sampleData.service, name: sampleData.name });
    }
    return ackBlock.value.subject;
});

const html = computed(() => {
    if (activeType.value === 'owner') {
        const b = ownerBlock.value;
        return buildOwnerEmail(sampleData, {
            eyebrow: b.eyebrow,
            heading: b.heading,
            fields: b.fields,
            message_label: b.message_label,
        });
    }
    const b = ackBlock.value;
    return buildAckEmail(sampleData, {
        eyebrow: b.eyebrow,
        greeting: interpolate(b.greeting, { name: sampleData.name }),
        intro: b.intro,
        summary_label: b.summary_label,
        fields: b.fields,
        message_label: b.message_label,
        signoff: b.signoff,
        signoff_name: b.signoff_name,
        footer: b.footer,
    });
});
</script>

<style scoped>
.preview {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #1a1a1a;
    color: #f4f1ea;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.bar {
    padding: 16px 24px;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
}

h1 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #f57d1f;
}

.controls {
    display: flex;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;
}

.group {
    display: flex;
    gap: 6px;
    align-items: center;
}

.btn {
    background: transparent;
    border: 1px solid #444;
    color: #aaa;
    padding: 6px 12px;
    font-size: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.btn:hover {
    color: #f4f1ea;
    border-color: #666;
}

.btn.active {
    background: #f57d1f;
    border-color: #f57d1f;
    color: #1a1a1a;
    font-weight: 600;
}

.meta {
    font-size: 12px;
    color: #888;
}

code.meta {
    color: #f4f1ea;
    background: #2a2a2a;
    padding: 4px 8px;
    border-radius: 2px;
    font-family: 'SF Mono', Menlo, monospace;
}

.frame {
    flex: 1;
    width: 100%;
    border: none;
    background: #f4f1ea;
}
</style>
