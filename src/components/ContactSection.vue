<template>
    <section class="scroll-mt-28" id="contact">

        <SectionHero :title="t('contact.title')" :subtitle="t('contact.subtitle')" />

        <!-- Paper editorial canvas -->
        <div class="paper-canvas relative">
            <div class="grain absolute inset-0 pointer-events-none"></div>

            <EditorialRule
                class="relative z-10"
                position="top"
                :tag-l="`Nº 04 / ${t('nav.contact')}`"
                tag-r="PRAHA · MICHLE"
                tag-r-variant="orange"
            />

            <!-- Main grid: contact register + dispatch ticket -->
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <div class="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">

                    <!-- RIGHT (lg:order-2): contact register -->
                    <div class="lg:col-span-5 lg:order-2 register-col" data-aos="fade-left">
                        <span class="register-eyebrow">— {{ t('contact.contact_eyebrow') }}</span>

                        <ol class="register">
                            <ContactRegisterRow
                                num="01"
                                :label="t('contact.labels.phone')"
                                :value="t('contact.info.phone')"
                                variant="link"
                                :href="`tel:${t('contact.info.phone').replace(/\s/g, '')}`"
                                data-aos="fade-up"
                                data-aos-delay="0"
                            />
                            <ContactRegisterRow
                                num="02"
                                :label="t('contact.labels.email')"
                                :value="t('contact.info.email')"
                                variant="link"
                                :href="`mailto:${t('contact.info.email')}`"
                                data-aos="fade-up"
                                data-aos-delay="80"
                            />
                            <ContactRegisterRow
                                num="03"
                                :label="t('contact.labels.address')"
                                :value="t('contact.info.address')"
                                variant="address"
                                data-aos="fade-up"
                                data-aos-delay="160"
                            >
                                <template #actions>
                                    <button
                                        type="button"
                                        class="register-row-action"
                                        @click="showMap = true"
                                    >
                                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        <span>{{ t('contact.show_map') }}</span>
                                    </button>
                                    <a
                                        class="register-row-action"
                                        :href="googleMapsLink"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>{{ t('contact.open_in_maps') }}</span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                </template>
                            </ContactRegisterRow>
                            <ContactRegisterRow
                                num="04"
                                :label="t('contact.labels.hours')"
                                :value="t('contact.info.hours')"
                                variant="static"
                                data-aos="fade-up"
                                data-aos-delay="240"
                            />
                        </ol>
                    </div>

                    <!-- LEFT (lg:order-1): inquiry form -->
                    <aside class="lg:col-span-7 lg:order-1 dispatch" data-aos="fade-right">
                        <header class="dispatch-header">
                            <h3 class="dispatch-title">{{ t('contact.form.title') }}</h3>
                            <p class="dispatch-hint">{{ t('contact.form_hint') }}</p>
                        </header>

                        <div v-if="!hasEmailToken" class="dispatch-alert">
                            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            <p>{{ t('contact.form.error_email_down') }}</p>
                        </div>

                        <form class="dispatch-form" @submit.prevent="handleSubmit">
                            <fieldset :disabled="!hasEmailToken" class="dispatch-fieldset">
                                <InquiryFormField
                                    v-model="name"
                                    num="F-01"
                                    type="text"
                                    :label="t('contact.form.name_label')"
                                    :placeholder="t('contact.form.name_placeholder')"
                                    :error="nameError"
                                    @blur="validateName"
                                    @update:model-value="nameError = ''"
                                />
                                <InquiryFormField
                                    v-model="email"
                                    num="F-02"
                                    type="email"
                                    :label="t('contact.form.email_label')"
                                    :placeholder="t('contact.form.email_placeholder')"
                                    :error="emailError"
                                    @blur="validateEmail"
                                    @update:model-value="emailError = ''"
                                />
                                <InquiryFormField
                                    v-model="phone"
                                    num="F-03"
                                    type="tel"
                                    :label="t('contact.form.phone_label')"
                                    :placeholder="t('contact.form.phone_placeholder')"
                                    :error="phoneError"
                                    @blur="validatePhone"
                                    @update:model-value="phoneError = ''"
                                />
                                <InquiryFormField
                                    v-model="serviceType"
                                    num="F-04"
                                    type="select"
                                    :label="t('contact.form.service_label')"
                                    :error="serviceError"
                                    @blur="validateService"
                                    @update:model-value="serviceError = ''"
                                >
                                    <option disabled>{{ t('contact.form.service_placeholder') }}</option>
                                    <option>{{ t('contact.form.service_options.masonry') }}</option>
                                    <option>{{ t('contact.form.service_options.tiles') }}</option>
                                    <option>{{ t('contact.form.service_options.facades') }}</option>
                                    <option>{{ t('contact.form.service_options.bathroom_reno') }}</option>
                                    <option>{{ t('contact.form.service_options.other') }}</option>
                                </InquiryFormField>
                                <InquiryFormField
                                    v-model="message"
                                    num="F-05"
                                    type="textarea"
                                    :label="t('contact.form.message_label')"
                                    :placeholder="t('contact.form.message_placeholder')"
                                    :error="messageError"
                                    :rows="4"
                                    @blur="validateMessage"
                                    @update:model-value="messageError = ''"
                                />

                                <div class="field">
                                    <label class="field-upload">
                                        <input type="file" multiple @change="handleFileUpload" class="hidden" />
                                        <span class="field-upload-icon" aria-hidden="true">⬆</span>
                                        <span v-if="files.length === 0">{{ t('contact.form.upload_default') }}</span>
                                        <span v-else class="field-upload-active">{{ t('contact.form.upload_add') }}</span>
                                    </label>
                                    <p v-if="fileError" class="field-error-msg field-error-msg--center">{{ fileError }}</p>
                                    <FilePreview :files="files" @remove="removeFile" />
                                </div>

                                <button
                                    type="button"
                                    @click="handleSubmit"
                                    :disabled="isSubmitting"
                                    class="dispatch-submit"
                                >
                                    <span>{{ isSubmitting ? t('contact.form.submitting_btn') : t('contact.form.submit_btn') }}</span>
                                    <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                                <p v-if="submitStatus === 'success'" class="dispatch-success" role="status">{{ t('contact.form.success_msg') }}</p>
                                <p v-if="submitStatus === 'error'" class="dispatch-error" role="alert">{{ t('contact.form.error_msg') }}</p>
                            </fieldset>
                        </form>
                    </aside>

                </div>
            </div>

            <EditorialRule
                class="relative z-10"
                position="bottom"
                tag-l="END / Nº 04"
                tag-l-variant="mono"
            />
        </div>

        <MapModal
            v-model:open="showMap"
            :title="t('contact.location_title')"
            :address="t('contact.info.address')"
            :embed-url="mapEmbedUrl"
            :external-link="googleMapsLink"
            :coords-label="MAP_COORDS_LABEL"
            :open-label="t('contact.open_in_maps')"
            :close-label="t('contact.hide_map')"
            stamp-num="04"
        />
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilePreview from './FilePreview.vue';
import { useI18n } from 'vue-i18n';
import SectionHero from './editorial/SectionHero.vue';
import EditorialRule from './editorial/EditorialRule.vue';
import ContactRegisterRow from './contact/ContactRegisterRow.vue';
import InquiryFormField from './contact/InquiryFormField.vue';
import MapModal from './contact/MapModal.vue';

const { t } = useI18n();

// ─── Map: shown as a modal; iframe only loads when user opens it ───
const showMap = ref(false);

// Approximate GPS for Na líše 1231/11, 141 00 Praha 4 — Michle.
// Using coordinates (not address query) to avoid Google matching to the wrong business
// ("Výškové práce") that's registered at the same address. Adjust if needed.
const MAP_LAT = 50.04553;
const MAP_LNG = 14.46622;
const MAP_COORDS_LABEL = `${MAP_LAT.toFixed(4)}° N · ${MAP_LNG.toFixed(4)}° E`;
const mapEmbedUrl = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LNG}`;

// We assume the API endpoint /api/send-email exists.
const hasEmailToken = true;

const name = ref('');
const email = ref('');
const phone = ref('');
const serviceType = ref(t('contact.form.service_placeholder'));
const message = ref('');
const isSubmitting = ref(false);

const emailError = ref('');
const nameError = ref('');
const messageError = ref('');
const phoneError = ref('');
const serviceError = ref('');

const files = ref([]);
const fileError = ref('');
// Vercel Serverless Payload limit is 4.5MB. Files are sent base64-encoded
// (~33% wire-size inflation), so a 3MB raw cap stays under the limit.
const MAX_TOTAL_SIZE = 3 * 1024 * 1024;

const removeFile = (index) => {
    files.value.splice(index, 1);
    fileError.value = '';
};

const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value) {
        emailError.value = t('contact.validation.email_required');
        return false;
    }
    if (!re.test(email.value)) {
        emailError.value = t('contact.validation.email_invalid');
        return false;
    }
    emailError.value = '';
    return true;
};

const validateName = () => {
    if (!name.value.trim()) {
        nameError.value = t('contact.validation.name_required');
        return false;
    }
    nameError.value = '';
    return true;
};

const validatePhone = () => {
    if (!phone.value.trim()) {
        phoneError.value = t('contact.validation.phone_required');
        return false;
    }
    const cleanPhone = phone.value.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
        phoneError.value = t('contact.validation.phone_invalid');
        return false;
    }
    phoneError.value = '';
    return true;
};

const validateService = () => {
    if (serviceType.value === t('contact.form.service_placeholder')) {
        serviceError.value = t('contact.validation.service_required');
        return false;
    }
    serviceError.value = '';
    return true;
};

const validateMessage = () => {
    if (!message.value.trim()) {
        messageError.value = t('contact.validation.message_required');
        return false;
    }
    messageError.value = '';
    return true;
};

const currentTotalSize = computed(() =>
    files.value.reduce((acc, file) => acc + (file.size || 0), 0)
);

const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    fileError.value = '';

    let newSize = 0;
    selectedFiles.forEach(f => newSize += f.size);

    if (currentTotalSize.value + newSize > MAX_TOTAL_SIZE) {
        const size = ((currentTotalSize.value + newSize) / 1024 / 1024).toFixed(2);
        fileError.value = t('contact.validation.file_size_error', { size });
        event.target.value = '';
        return;
    }

    selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            files.value.push({
                name: file.name,
                data: e.target.result.split(',')[1],
                mimeType: file.type,
                size: file.size
            });
        };
        reader.readAsDataURL(file);
    });

    event.target.value = '';
};

const submitStatus = ref(null);

const handleSubmit = async () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isServiceValid = validateService();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isMessageValid) return;

    isSubmitting.value = true;
    submitStatus.value = null;

    try {
        const payload = {
            from: email.value,
            subject: `Nová poptávka: ${serviceType.value} - ${name.value}`,
            text: `
                Jméno: ${name.value}
                Email: ${email.value}
                Telefon: ${phone.value}
                Služba: ${serviceType.value}

                Zpráva:
                ${message.value}
            `,
            files: files.value
        };

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            submitStatus.value = 'success';
            name.value = '';
            email.value = '';
            phone.value = '';
            serviceType.value = t('contact.form.service_placeholder');
            message.value = '';
            files.value = [];

            nameError.value = '';
            emailError.value = '';
            messageError.value = '';
            phoneError.value = '';
            serviceError.value = '';
        } else {
            console.error(result.errorMessage || result.message);
            submitStatus.value = 'error';
        }
    } catch (error) {
        console.error(error);
        submitStatus.value = 'error';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
/* Form/dispatch styles + register-col styles. Field, register-row, modal, paper, grain,
   spread-rule are all in editorial.css or extracted components. */

.register-col { padding-top: 0.5rem; }

.register-eyebrow {
    display: block;
    font-family: var(--display-font);
    font-size: 0.78rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--orange);
    font-weight: 600;
    margin-bottom: 1.25rem;
}

.register {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(26, 24, 21, 0.18);
}

/* ─── Inquiry form / dispatch ticket ─── */

.dispatch {
    background: var(--paper-card);
    border: 1px solid rgba(26, 24, 21, 0.18);
    padding: 2rem 1.75rem 2.25rem;
    position: relative;
    box-shadow:
        0 1px 1px rgba(26, 24, 21, 0.08),
        0 8px 24px rgba(26, 24, 21, 0.07),
        0 28px 60px rgba(26, 24, 21, 0.10);
}

@media (min-width: 1024px) {
    .dispatch { padding: 2.5rem 2.25rem 2.75rem; }
}

.dispatch::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--orange);
}

.dispatch-header {
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed rgba(26, 24, 21, 0.22);
}

.dispatch-title {
    font-family: var(--display-font);
    font-size: 1.65rem;
    text-transform: uppercase;
    color: var(--ink);
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.05;
    margin-bottom: 0.5rem;
}

@media (min-width: 1024px) {
    .dispatch-title { font-size: 1.85rem; }
}

.dispatch-hint {
    font-size: 0.92rem;
    color: rgba(26, 24, 21, 0.65);
    line-height: 1.45;
    max-width: 38ch;
}

.dispatch-alert {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    background: rgba(209, 28, 28, 0.06);
    border-left: 2px solid var(--danger);
    color: #7a0e0e;
    padding: 0.75rem 0.9rem;
    margin-bottom: 1.25rem;
    font-size: 0.85rem;
    line-height: 1.45;
}

.dispatch-form { font-size: 1rem; }

.dispatch-fieldset {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    border: 0;
    padding: 0;
    margin: 0;
}

.dispatch-fieldset:disabled { opacity: 0.55; }

/* ─── File upload affordance + submit (these don't fit InquiryFormField cleanly) ─── */

.field { min-width: 0; }

.field-error-msg {
    color: var(--danger);
    font-size: 0.78rem;
    margin-top: 0.4rem;
    font-weight: 500;
}

.field-error-msg--center { text-align: center; }

.field-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    border: 1.5px dashed rgba(26, 24, 21, 0.32);
    background: transparent;
    padding: 1rem 1.25rem;
    text-align: center;
    font-family: var(--display-font);
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(26, 24, 21, 0.7);
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.field-upload:hover {
    border-color: var(--orange);
    background: rgba(245, 125, 31, 0.04);
    color: var(--orange);
}

.field-upload-icon {
    font-size: 0.95rem;
    color: var(--orange);
}

.field-upload-active { color: var(--orange); }

.dispatch-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    width: 100%;
    padding: 1.05rem 1.5rem;
    background: var(--orange);
    color: var(--ink);
    font-family: var(--display-font);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 0;
    margin-top: 0.5rem;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 6px 16px rgba(245, 125, 31, 0.22);
}

.dispatch-submit:hover:not(:disabled) {
    background: var(--orange-hover);
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(245, 125, 31, 0.32);
}

.dispatch-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
}

.dispatch-submit svg { transition: transform 0.2s ease; }
.dispatch-submit:hover:not(:disabled) svg { transform: translateX(4px); }

.dispatch-success,
.dispatch-error {
    margin-top: 0.9rem;
    text-align: center;
    font-family: var(--display-font);
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
}

.dispatch-success { color: var(--success); }
.dispatch-error { color: var(--danger); }

@media (prefers-reduced-motion: reduce) {
    .dispatch-submit,
    .dispatch-submit svg { transition: none !important; }
}
</style>
