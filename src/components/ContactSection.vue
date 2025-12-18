<template>
  <section class="py-20 bg-white/90 scroll-mt-28 backdrop-blur-sm" id="contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8items-start">
        
        <!-- Usage Info Left Column -->
        <div class="space-y-8" data-aos="fade-right">
          <div>
             <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ t('contact.title') }}</h2>
             <p class="text-gray-600 text-lg leading-relaxed max-w-md">
               {{ t('contact.subtitle') }}
             </p>
          </div>

          <div class="space-y-6">
             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Phone -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">{{ t('contact.info.phone') }}</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Mail -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">{{ t('contact.info.email') }}</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Location -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">{{ t('contact.info.address') }}</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Clock -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">{{ t('contact.info.hours') }}</span>
             </div>
          </div>

          <!-- Social Icons -->
          <div class="flex gap-4 mt-8">
            <a href="#" class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
               <!-- FB Icon (simplified) -->
               <span class="font-bold text-xl">f</span>
            </a>
            <a href="#" class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
               <!-- LinkedIn Icon (simplified) -->
               <span class="font-bold text-xl">in</span>
            </a>
             <a href="#" class="w-12 h-12 flex items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700 transition">
               <!-- Insta Icon (simplified) -->
               <span class="font-bold text-xl">IG</span>
            </a>
          </div>
        </div>

        <!-- Form Right Column -->
        <div class="bg-gray-200/80 rounded-2xl p-8 shadow-sm" data-aos="fade-left">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ t('contact.form.title') }}</h3>
          
          <!-- System Error Alert -->
          <div v-if="!hasEmailToken" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ t('contact.form.error_email_down') }}
                </p>
              </div>
            </div>
          </div>

          <form class="space-y-4">
            <fieldset :disabled="!hasEmailToken" class="space-y-4 group-disabled:opacity-50">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">{{ t('contact.form.name_label') }}</label>
                <input 
                  type="text" 
                  v-model="name"
                  @blur="validateName"
                  @input="nameError = ''"
                  :placeholder="t('contact.form.name_placeholder')" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': nameError}"
                  required 
                />
                <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">{{ t('contact.form.email_label') }}</label>
                <input 
                  type="email" 
                  v-model="email" 
                  @blur="validateEmail"
                  @input="emailError = ''"
                  :placeholder="t('contact.form.email_placeholder')" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': emailError}"
                  required 
                />
                <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
               <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">{{ t('contact.form.phone_label') }}</label>
                <input 
                  type="tel" 
                  v-model="phone" 
                  @blur="validatePhone"
                  @input="phoneError = ''"
                  :placeholder="t('contact.form.phone_placeholder')" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': phoneError}"
                  required
                />
                <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">{{ t('contact.form.service_label') }}</label>
                 <select 
                   v-model="serviceType" 
                   @blur="validateService"
                   @change="serviceError = ''"
                   class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-500"
                   :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': serviceError}"
                   required
                 >
                   <option disabled>{{ t('contact.form.service_placeholder') }}</option>
                   <option>{{ t('contact.form.service_options.rough') }}</option>
                   <option>{{ t('contact.form.service_options.reconstruction') }}</option>
                 </select>
                 <p v-if="serviceError" class="text-red-500 text-sm mt-1">{{ serviceError }}</p>
              </div>
            </div>

            <div>
               <label class="block text-sm font-bold text-gray-700 mb-1">{{ t('contact.form.message_label') }}</label>
               <textarea 
                 v-model="message" 
                 @blur="validateMessage"
                 @input="messageError = ''"
                 rows="4" 
                 :placeholder="t('contact.form.message_placeholder')" 
                 class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
                 :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': messageError}"
                 required
               ></textarea>
               <p v-if="messageError" class="text-red-500 text-sm mt-1">{{ messageError }}</p>
            </div>

            <!-- Upload Button -->
            <div>
              <label class="block w-full border-2 border-gray-400 border-dashed rounded-md p-3 text-gray-600 font-medium hover:bg-gray-50 transition text-center cursor-pointer">
                <input type="file" multiple @change="handleFileUpload" class="hidden" />
                <span v-if="files.length === 0">{{ t('contact.form.upload_default') }}</span>
                <span v-else class="text-blue-600">
                    {{ t('contact.form.upload_add') }}
                </span>
              </label>
              <p v-if="fileError" class="text-red-500 text-sm mt-1 text-center">{{ fileError }}</p>
              
              <!-- Component for File List -->
              <FilePreview :files="files" @remove="removeFile" />
            </div>

            <!-- Submit Button -->
            <button 
              type="button" 
              @click="handleSubmit" 
              :disabled="isSubmitting"
              class="w-full bg-[#f57d1f] hover:bg-[#e06c10] text-white font-bold py-4 rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSubmitting ? t('contact.form.submitting_btn') : t('contact.form.submit_btn') }}
            </button>
            
            <p v-if="submitStatus === 'success'" class="text-green-600 mt-2 font-bold text-center">{{ t('contact.form.success_msg') }}</p>
            <p v-if="submitStatus === 'error'" class="text-red-600 mt-2 font-bold text-center">{{ t('contact.form.error_msg') }}</p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilePreview from './FilePreview.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// We assume the API endpoint /api/send-email exists. 
// If you want to toggle the form based on env vars, you'd need to expose a VITE_ var.
// For now, we assume it's always available if the app is deployed.
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
// Vercel Serverless Payload limit is 4.5MB. We set a safe limit of 4MB for the total request body.
const MAX_TOTAL_SIZE = 4 * 1024 * 1024; // 4 MB

// Actions
const removeFile = (index) => {
    files.value.splice(index, 1);
    fileError.value = ''; // Clear error when removing files
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
    // simple check for at least 9 digits
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

// Calculate current total size of existing files
const currentTotalSize = computed(() => {
    return files.value.reduce((acc, file) => {
        // file.data is base64 string. 
        // Rough size approximation: (base64 length * 3) / 4 = original bytes
        // Or we can store original size. 
        // For simplicity, let's assume we store original size or calculate from base64.
        // But in `files` array we only have `data` (base64) and names.
        // Let's store the size when adding.
        return acc + (file.size || 0);
    }, 0);
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
                 size: file.size // Store size for calculation
             });
        };
        reader.readAsDataURL(file);
    });
    
    event.target.value = ''; 
};

const submitStatus = ref(null);

const handleSubmit = async () => {
    // Validate all fields
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
            // to: is handled by backend env var CONTACT_EMAIL
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            submitStatus.value = 'success';
            // Reset form
            name.value = '';
            email.value = '';
            phone.value = '';
            serviceType.value = t('contact.form.service_placeholder');
            message.value = '';
            files.value = []; 
            
            // Reset errors
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
