<template>
  <section class="scroll-mt-28" id="contact">

    <!-- Hero strip (shows global fixed background) -->
    <div class="relative w-full h-72 md:h-80 flex items-center justify-center text-center text-white px-4">
      <div class="relative z-10 max-w-3xl" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">{{ t('contact.title') }}</h2>
        <p class="text-base md:text-lg text-gray-200 leading-relaxed">{{ t('contact.subtitle') }}</p>
      </div>
    </div>

    <!-- ─────────────── Paper editorial canvas ─────────────── -->
    <div class="contact-paper relative">
      <div class="grain absolute inset-0 pointer-events-none"></div>

      <!-- Editorial top rule -->
      <div class="spread-rule spread-rule-top relative z-10" aria-hidden="true">
        <span class="rule-line"></span>
        <span class="rule-tag">Nº 04&nbsp;&nbsp;/&nbsp;&nbsp;{{ getSectionTag() }}</span>
        <span class="rule-line rule-line-flex"></span>
        <span class="rule-tag rule-tag-r">PRAHA&nbsp;&nbsp;·&nbsp;&nbsp;MICHLE</span>
        <span class="rule-line"></span>
      </div>

      <!-- Main grid: contact register + dispatch ticket -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          <!-- ─── RIGHT — Contact register (compact directory) ─── -->
          <div class="lg:col-span-5 lg:order-2 register-col" data-aos="fade-left">
            <span class="register-eyebrow">— {{ t('contact.contact_eyebrow') }}</span>

            <ol class="register">
              <a
                :href="`tel:${t('contact.info.phone').replace(/\s/g, '')}`"
                class="register-row"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <span class="register-row-num">01</span>
                <div class="register-row-body">
                  <span class="register-row-label">{{ t('contact.labels.phone') }}</span>
                  <span class="register-row-value">{{ t('contact.info.phone') }}</span>
                </div>
                <span class="register-row-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                :href="`mailto:${t('contact.info.email')}`"
                class="register-row"
                data-aos="fade-up"
                data-aos-delay="80"
              >
                <span class="register-row-num">02</span>
                <div class="register-row-body">
                  <span class="register-row-label">{{ t('contact.labels.email') }}</span>
                  <span class="register-row-value">{{ t('contact.info.email') }}</span>
                </div>
                <span class="register-row-arrow" aria-hidden="true">↗</span>
              </a>

              <div
                class="register-row register-row--address"
                data-aos="fade-up"
                data-aos-delay="160"
              >
                <span class="register-row-num">03</span>
                <div class="register-row-body">
                  <span class="register-row-label">{{ t('contact.labels.address') }}</span>
                  <span class="register-row-value">{{ t('contact.info.address') }}</span>
                  <div class="register-row-actions">
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
                  </div>
                </div>
              </div>

              <div
                class="register-row register-row--static"
                data-aos="fade-up"
                data-aos-delay="240"
              >
                <span class="register-row-num">04</span>
                <div class="register-row-body">
                  <span class="register-row-label">{{ t('contact.labels.hours') }}</span>
                  <span class="register-row-value">{{ t('contact.info.hours') }}</span>
                </div>
                <span class="register-row-arrow register-row-arrow--mute" aria-hidden="true">·</span>
              </div>
            </ol>
          </div>

          <!-- ─── LEFT — Inquiry form (primary) ─── -->
          <aside class="lg:col-span-7 lg:order-1 dispatch" data-aos="fade-right">
            <header class="dispatch-header">
              <h3 class="dispatch-title">{{ t('contact.form.title') }}</h3>
              <p class="dispatch-hint">{{ t('contact.form_hint') }}</p>
            </header>

            <!-- System Error Alert -->
            <div v-if="!hasEmailToken" class="dispatch-alert">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <p>{{ t('contact.form.error_email_down') }}</p>
            </div>

            <form class="dispatch-form" @submit.prevent="handleSubmit">
              <fieldset :disabled="!hasEmailToken" class="dispatch-fieldset">
                <div class="dispatch-grid-2">
                  <div class="field">
                    <label class="field-label"><span class="field-label-num">F-01</span> {{ t('contact.form.name_label') }}</label>
                    <input
                      type="text"
                      v-model="name"
                      @blur="validateName"
                      @input="nameError = ''"
                      :placeholder="t('contact.form.name_placeholder')"
                      class="field-input"
                      :class="{ 'field-input--error': nameError }"
                      required
                    />
                    <p v-if="nameError" class="field-error-msg">{{ nameError }}</p>
                  </div>
                  <div class="field">
                    <label class="field-label"><span class="field-label-num">F-02</span> {{ t('contact.form.email_label') }}</label>
                    <input
                      type="email"
                      v-model="email"
                      @blur="validateEmail"
                      @input="emailError = ''"
                      :placeholder="t('contact.form.email_placeholder')"
                      class="field-input"
                      :class="{ 'field-input--error': emailError }"
                      required
                    />
                    <p v-if="emailError" class="field-error-msg">{{ emailError }}</p>
                  </div>
                </div>

                <div class="dispatch-grid-2">
                  <div class="field">
                    <label class="field-label"><span class="field-label-num">F-03</span> {{ t('contact.form.phone_label') }}</label>
                    <input
                      type="tel"
                      v-model="phone"
                      @blur="validatePhone"
                      @input="phoneError = ''"
                      :placeholder="t('contact.form.phone_placeholder')"
                      class="field-input"
                      :class="{ 'field-input--error': phoneError }"
                      required
                    />
                    <p v-if="phoneError" class="field-error-msg">{{ phoneError }}</p>
                  </div>
                  <div class="field">
                    <label class="field-label"><span class="field-label-num">F-04</span> {{ t('contact.form.service_label') }}</label>
                    <div class="field-select-wrap">
                      <select
                        v-model="serviceType"
                        @blur="validateService"
                        @change="serviceError = ''"
                        class="field-input field-select"
                        :class="{ 'field-input--error': serviceError }"
                        required
                      >
                        <option disabled>{{ t('contact.form.service_placeholder') }}</option>
                        <option>{{ t('contact.form.service_options.masonry') }}</option>
                        <option>{{ t('contact.form.service_options.tiles') }}</option>
                        <option>{{ t('contact.form.service_options.facades') }}</option>
                        <option>{{ t('contact.form.service_options.bathroom_reno') }}</option>
                        <option>{{ t('contact.form.service_options.other') }}</option>
                      </select>
                      <span class="field-select-caret" aria-hidden="true">▾</span>
                    </div>
                    <p v-if="serviceError" class="field-error-msg">{{ serviceError }}</p>
                  </div>
                </div>

                <div class="field">
                  <label class="field-label"><span class="field-label-num">F-05</span> {{ t('contact.form.message_label') }}</label>
                  <textarea
                    v-model="message"
                    @blur="validateMessage"
                    @input="messageError = ''"
                    rows="4"
                    :placeholder="t('contact.form.message_placeholder')"
                    class="field-input field-textarea"
                    :class="{ 'field-input--error': messageError }"
                    required
                  ></textarea>
                  <p v-if="messageError" class="field-error-msg">{{ messageError }}</p>
                </div>

                <div class="field">
                  <label class="field-upload">
                    <input type="file" multiple @change="handleFileUpload" class="hidden" />
                    <span class="field-upload-icon" aria-hidden="true">⬆</span>
                    <span v-if="files.length === 0">{{ t('contact.form.upload_default') }}</span>
                    <span v-else class="field-upload-active">
                      {{ t('contact.form.upload_add') }}
                    </span>
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

      <!-- Editorial bottom rule — soft transition into next section -->
      <div class="spread-rule spread-rule-bottom relative z-10" aria-hidden="true">
        <span class="rule-line"></span>
        <span class="rule-tag rule-tag-mono">END&nbsp;&nbsp;/&nbsp;&nbsp;Nº&nbsp;04</span>
        <span class="rule-line"></span>
      </div>
    </div>

    <!-- ─── Map modal ─── -->
    <Teleport to="body">
      <Transition name="map-modal">
        <div
          v-if="showMap"
          class="map-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="t('contact.location_title')"
          @click.self="showMap = false"
        >
          <div class="map-modal-shell" @click.stop>
            <header class="map-modal-header">
              <div class="map-modal-header-info">
                <span class="map-modal-eyebrow">— {{ t('contact.location_title') }}</span>
                <span class="map-modal-address">{{ t('contact.info.address') }}</span>
              </div>
              <button
                type="button"
                class="map-modal-close"
                @click="showMap = false"
                :aria-label="t('contact.hide_map')"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div class="map-modal-body">
              <iframe
                class="map-modal-iframe"
                :title="t('contact.info.address')"
                :src="mapEmbedUrl"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>

              <div class="map-stamp map-stamp--modal" aria-hidden="true">
                <span class="map-stamp-num">Nº&nbsp;04&nbsp;·&nbsp;GPS</span>
                <span class="map-stamp-label">{{ MAP_COORDS_LABEL }}</span>
              </div>
            </div>

            <footer class="map-modal-footer">
              <a
                class="map-modal-cta"
                :href="googleMapsLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ t('contact.open_in_maps') }}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </footer>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import FilePreview from './FilePreview.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// ─── Map: shown as a modal; iframe only loads when user opens it ───
const showMap = ref(false);

const onKeydown = (e) => {
    if (e.key === 'Escape') showMap.value = false;
};

watch(showMap, (open) => {
    if (typeof document === 'undefined') return;
    if (open) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeydown);
    } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeydown);
    }
});

onUnmounted(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
});

// Approximate GPS for Na líše 1231/11, 141 00 Praha 4 — Michle.
// Using coordinates (not address query) to avoid Google matching to the wrong business
// ("Výškové práce") that's registered at the same address. Adjust if needed.
const MAP_LAT = 50.04553;
const MAP_LNG = 14.46622;
const MAP_COORDS_LABEL = `${MAP_LAT.toFixed(4)}° N · ${MAP_LNG.toFixed(4)}° E`;

const mapEmbedUrl = computed(
    () => `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`
);

const googleMapsLink = computed(
    () => `https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LNG}`
);

// Split "Na líše 1231/11, 141 00 Praha 4 - Michle" into 2 lines for the pin card
const addressParts = computed(() => {
    const full = t('contact.info.address') || '';
    const idx = full.indexOf(',');
    if (idx === -1) return { line1: full, line2: '' };
    return {
        line1: full.slice(0, idx).trim(),
        line2: full.slice(idx + 1).trim()
    };
});

// Locale-aware short tag for the editorial top rule
const getSectionTag = () => {
    const tags = { cs: 'Kontakt', en: 'Contact', uk: 'Контакт' };
    return tags[locale.value] || tags.cs;
};

// We assume the API endpoint /api/send-email exists.
// If you want to toggle the form based on env vars, you'd need to expose a VITE_ var.
const hasEmailToken = true;

const name = ref('');
const email = ref('');
const phone = ref('');
const serviceType = ref(t('contact.form.service_placeholder'));
const message = ref('');
const isSubmitting = ref(false);

// Validation Errors
const emailError = ref('');
const nameError = ref('');
const messageError = ref('');
const phoneError = ref('');
const serviceError = ref('');

// File Upload State
const files = ref([]);
const fileError = ref('');
// Vercel Serverless Payload limit is 4.5MB. Safe limit: 4MB.
const MAX_TOTAL_SIZE = 4 * 1024 * 1024; // 4 MB

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

const currentTotalSize = computed(() => {
    return files.value.reduce((acc, file) => acc + (file.size || 0), 0);
});

const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    fileError.value = '';

    let newSize = 0;
    selectedFiles.forEach(f => newSize += f.size);

    if (currentTotalSize.value + newSize > MAX_TOTAL_SIZE) {
        fileError.value = `${t('contact.validation.file_size_error')} Vybráno: ${((currentTotalSize.value + newSize) / 1024 / 1024).toFixed(2)} MB`;
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

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isMessageValid) {
        return;
    }

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
/* ─────────────── Paper canvas + grain (matches ServicesSection) ─────────────── */

.contact-paper {
    background: #faf6ee;
    position: relative;
}

.grain {
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.18;
    mix-blend-mode: multiply;
}

/* ─────────────── Editorial spread rules ─────────────── */

.spread-rule {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1.5rem;
    position: relative;
}

.spread-rule-top { padding-top: 1.5rem; }
.spread-rule-mid { margin-top: 1rem; }
.spread-rule-bottom { padding-bottom: 1.5rem; padding-top: 1rem; }

.rule-line {
    flex: 0 0 36px;
    height: 1px;
    background: #1a1815;
    opacity: 0.85;
}

.rule-line-flex { flex: 1 1 auto; }

.rule-tag {
    font-family: 'Oswald', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #1a1815;
    font-weight: 500;
    white-space: nowrap;
}

.rule-tag-r { color: #f57d1f; }

.rule-tag-mono {
    font-size: 0.62rem;
    letter-spacing: 0.42em;
    color: rgba(26, 24, 21, 0.55);
}

@media (max-width: 768px) {
    .rule-tag {
        font-size: 0.58rem;
        letter-spacing: 0.22em;
        white-space: normal;
    }
    .rule-line { flex: 0 0 16px; }
    .spread-rule { padding: 0 1rem; }
    .spread-rule-top { padding-top: 1.25rem; }
}

/* ─────────────── LEFT — Contact register ─────────────── */

.register-eyebrow {
    display: block;
    font-family: 'Oswald', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #f57d1f;
    font-weight: 600;
    margin-bottom: 1.25rem;
}

.register-col { padding-top: 0.5rem; }

.register {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(26, 24, 21, 0.18);
}

.register-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.25rem;
    padding: 1.5rem 0.25rem 1.5rem 0;
    border-bottom: 1px solid rgba(26, 24, 21, 0.18);
    text-decoration: none;
    color: #1a1815;
    transition: padding 0.35s cubic-bezier(0.7, 0, 0.2, 1),
                background 0.35s ease,
                color 0.25s ease;
    position: relative;
}

.register-row::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scaleY(0);
    transform-origin: center;
    width: 2px;
    height: 70%;
    background: #f57d1f;
    transition: transform 0.35s cubic-bezier(0.7, 0, 0.2, 1);
}

.register-row:hover:not(.register-row--static) {
    padding-left: 1.25rem;
    background: rgba(245, 125, 31, 0.04);
    color: #f57d1f;
}

.register-row:hover:not(.register-row--static)::before {
    transform: translateY(-50%) scaleY(1);
}

.register-row-num {
    font-family: 'Oswald', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #f57d1f;
    min-width: 2rem;
    line-height: 1;
}

.register-row-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
}

.register-row-label {
    font-family: 'Oswald', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(26, 24, 21, 0.55);
    font-weight: 500;
}

.register-row-value {
    font-size: 1.15rem;
    font-weight: 500;
    color: inherit;
    line-height: 1.35;
    word-break: break-word;
    transition: color 0.25s ease;
}

@media (min-width: 1024px) {
    .register-row-value { font-size: 1.25rem; }
}

.register-row-arrow {
    font-family: 'Oswald', sans-serif;
    font-size: 1.35rem;
    line-height: 1;
    color: rgba(26, 24, 21, 0.35);
    transition: opacity 0.3s ease, transform 0.3s ease, color 0.25s ease;
    align-self: center;
}

.register-row:hover:not(.register-row--static) .register-row-arrow {
    transform: translateX(4px);
    color: #f57d1f;
}

.register-row-arrow--mute {
    color: rgba(26, 24, 21, 0.25);
    font-size: 1.6rem;
}

/* Address row uses inline action buttons instead of an arrow. */
.register-row--address {
    grid-template-columns: auto 1fr;
}

.register-row--address:hover {
    padding-left: 0;
    background: transparent;
    color: #1a1815;
}

.register-row-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.6rem;
}

.register-row-action {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.8rem;
    background: transparent;
    color: #1a1815;
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: 1.5px solid #1a1815;
    cursor: pointer;
    border-radius: 0;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
}

.register-row-action:hover {
    background: #1a1815;
    color: #f57d1f;
    border-color: #1a1815;
}

@media (max-width: 640px) {
    .register-row {
        gap: 1rem;
        padding: 1.25rem 0;
    }
    .register-row-num { font-size: 1.1rem; }
    .register-row-value { font-size: 1.05rem; }
    .register-row-arrow { font-size: 1.1rem; }
    .register-row-action { font-size: 0.66rem; padding: 0.4rem 0.7rem; }
}

/* ─────────────── RIGHT — Dispatch ticket / Form ─────────────── */

.dispatch {
    background: #fefdfb;
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

/* Subtle orange top edge — visual cue without hazard-tape noise */
.dispatch::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #f57d1f;
}

.dispatch-header {
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed rgba(26, 24, 21, 0.22);
}

.dispatch-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.65rem;
    text-transform: uppercase;
    color: #1a1815;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.05;
    margin-bottom: 0.5rem;
}

.dispatch-hint {
    font-size: 0.92rem;
    color: rgba(26, 24, 21, 0.65);
    line-height: 1.45;
    max-width: 38ch;
}

@media (min-width: 1024px) {
    .dispatch-title { font-size: 1.85rem; }
}

.dispatch-alert {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    background: rgba(209, 28, 28, 0.06);
    border-left: 2px solid #d11c1c;
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

.dispatch-grid-2 {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
}

.field { min-width: 0; }

.field-label {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.55rem;
    font-size: 0.92rem;
    font-weight: 500;
    color: #1a1815;
    margin-bottom: 0.55rem;
    line-height: 1.35;
}

.field-label-num {
    font-family: 'Oswald', sans-serif;
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
    color: #1a1815;
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
    border-bottom-color: #f57d1f;
}

.field-input--error {
    border-bottom-color: #d11c1c !important;
}

.field-textarea {
    border: 1.5px solid rgba(26, 24, 21, 0.25);
    padding: 0.75rem 0.85rem;
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
}

.field-textarea:focus {
    border-color: #f57d1f;
}

.field-textarea.field-input--error {
    border-color: #d11c1c !important;
}

.field-select-wrap {
    position: relative;
}

.field-select {
    padding-right: 1.75rem;
    cursor: pointer;
    color: #1a1815;
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
    color: #d11c1c;
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
    font-family: 'Oswald', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(26, 24, 21, 0.7);
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.field-upload:hover {
    border-color: #f57d1f;
    background: rgba(245, 125, 31, 0.04);
    color: #f57d1f;
}

.field-upload-icon {
    font-size: 0.95rem;
    color: #f57d1f;
}

.field-upload-active { color: #f57d1f; }

.dispatch-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    width: 100%;
    padding: 1.05rem 1.5rem;
    background: #f57d1f;
    color: #1a1815;
    font-family: 'Oswald', sans-serif;
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
    background: #ff8e2e;
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
    font-family: 'Oswald', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
}

.dispatch-success { color: #1c8a4d; }
.dispatch-error { color: #d11c1c; }

/* ─────────────── Map modal ─────────────── */

.map-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(12, 10, 8, 0.78);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

@media (max-width: 640px) {
    .map-modal { padding: 0; }
}

.map-modal-shell {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    max-height: calc(100vh - 3rem);
    background: #1a1815;
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.4),
        0 32px 80px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

@media (max-width: 640px) {
    .map-modal-shell { max-height: 100vh; height: 100vh; }
}

.map-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: #0c0a08;
    border-bottom: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

.map-modal-header-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.map-modal-eyebrow {
    font-family: 'Oswald', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #f57d1f;
    font-weight: 600;
}

.map-modal-address {
    font-size: 0.95rem;
    font-weight: 500;
    color: #fefdfb;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (max-width: 640px) {
    .map-modal-address { white-space: normal; font-size: 0.85rem; }
}

.map-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1.5px solid rgba(245, 235, 215, 0.22);
    color: #fefdfb;
    cursor: pointer;
    border-radius: 0;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    flex-shrink: 0;
}

.map-modal-close:hover {
    background: #f57d1f;
    color: #1a1815;
    border-color: #f57d1f;
}

.map-modal-body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    background: #1a1815;
}

.map-modal-iframe {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 360px;
    border: 0;
    filter: grayscale(0.12) contrast(0.96) sepia(0.04);
}

.map-stamp--modal {
    position: absolute;
    right: 18px;
    top: 18px;
    background: #0c0a08;
    padding: 0.5rem 0.75rem 0.55rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 0.18em;
    z-index: 2;
    border-left: 2px solid #f57d1f;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

.map-stamp-num {
    color: #fefdfb;
    font-size: 0.62rem;
    font-weight: 600;
    text-transform: uppercase;
    white-space: nowrap;
}

.map-stamp-label {
    color: #f57d1f;
    font-size: 0.54rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.22em;
}

@media (max-width: 640px) {
    .map-stamp--modal {
        right: 12px;
        top: 12px;
        padding: 0.4rem 0.6rem 0.45rem;
    }
    .map-stamp-num { font-size: 0.58rem; }
    .map-stamp-label { font-size: 0.5rem; letter-spacing: 0.18em; }
}

.map-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.85rem 1.25rem;
    background: #0c0a08;
    border-top: 1px solid rgba(245, 125, 31, 0.24);
    flex-shrink: 0;
}

@media (max-width: 640px) {
    .map-modal-footer { padding: 0.85rem 1rem; }
}

.map-modal-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 1.2rem;
    background: #f57d1f;
    color: #1a1815;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: none;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.map-modal-cta:hover {
    background: #ff8e2e;
    transform: translateX(2px);
}

.map-modal-cta svg { transition: transform 0.2s ease; }
.map-modal-cta:hover svg { transform: translateX(4px); }

/* Modal enter/leave transition */
.map-modal-enter-active,
.map-modal-leave-active {
    transition: opacity 0.25s ease;
}

.map-modal-enter-active .map-modal-shell,
.map-modal-leave-active .map-modal-shell {
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}

.map-modal-enter-from,
.map-modal-leave-to {
    opacity: 0;
}

.map-modal-enter-from .map-modal-shell,
.map-modal-leave-to .map-modal-shell {
    transform: translateY(16px) scale(0.98);
    opacity: 0;
}

/* ─────────────── Reduced motion ─────────────── */

@media (prefers-reduced-motion: reduce) {
    .register-row,
    .register-row::before,
    .register-row-arrow,
    .dispatch-submit,
    .dispatch-submit svg,
    .map-modal-cta,
    .map-modal-cta svg {
        transition: none !important;
    }
}
</style>
