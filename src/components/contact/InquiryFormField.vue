<template>
    <div class="field">
        <label class="field-label">
            <span class="field-label-num">{{ num }}</span>
            <span>{{ label }}</span>
        </label>

        <!-- textarea -->
        <textarea
            v-if="type === 'textarea'"
            :value="modelValue"
            :placeholder="placeholder"
            :rows="rows"
            :class="['field-input', 'field-textarea', { 'field-input--error': error }]"
            required
            @input="onInput"
            @blur="$emit('blur')"
        ></textarea>

        <!-- select -->
        <div v-else-if="type === 'select'" class="field-select-wrap">
            <select
                :value="modelValue"
                :class="['field-input', 'field-select', { 'field-input--error': error }]"
                required
                @change="onChange"
                @blur="$emit('blur')"
            >
                <slot />
            </select>
            <span class="field-select-caret" aria-hidden="true">▾</span>
        </div>

        <!-- text/email/tel -->
        <input
            v-else
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :class="['field-input', { 'field-input--error': error }]"
            required
            @input="onInput"
            @blur="$emit('blur')"
        />

        <p v-if="error" class="field-error-msg">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select';

withDefaults(
    defineProps<{
        num: string;
        label: string;
        modelValue: string;
        error?: string;
        type?: FieldType;
        placeholder?: string;
        rows?: number;
    }>(),
    { type: 'text', rows: 4 }
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
    blur: [];
}>();

const onInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value);
};

const onChange = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLSelectElement).value);
};
</script>

<style scoped>
.field { min-width: 0; }

.field-label {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.55rem;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 0.55rem;
    line-height: 1.35;
}

.field-label-num {
    font-family: var(--display-font);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(245, 125, 31, 0.8);
    text-transform: uppercase;
    flex-shrink: 0;
    padding: 0.05rem 0.4rem;
    border: 1px solid rgba(245, 125, 31, 0.32);
    line-height: 1.35;
    transform: translateY(-1px);
}

.field-input {
    width: 100%;
    background: transparent;
    border: 0;
    border-bottom: 1.5px solid rgba(26, 24, 21, 0.35);
    border-radius: 0;
    padding: 0.55rem 0;
    font-size: 1rem;
    color: var(--ink);
    font-family: inherit;
    transition: border-color 0.2s ease;
    appearance: none;
}

.field-input::placeholder {
    color: rgba(26, 24, 21, 0.32);
    font-style: italic;
}

.field-input:focus {
    outline: none;
    border-bottom-color: var(--orange);
}

.field-input--error { border-bottom-color: var(--danger) !important; }

.field-textarea {
    border: 1.5px solid rgba(26, 24, 21, 0.25);
    padding: 0.75rem 0.85rem;
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
}

.field-textarea:focus { border-color: var(--orange); }
.field-textarea.field-input--error { border-color: var(--danger) !important; }

.field-select-wrap { position: relative; }

.field-select {
    padding-right: 1.75rem;
    cursor: pointer;
    color: var(--ink);
}

.field-select-caret {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 0.85rem;
    color: rgba(26, 24, 21, 0.55);
}

.field-error-msg {
    color: var(--danger);
    font-size: 0.78rem;
    margin-top: 0.4rem;
    font-weight: 500;
}
</style>
