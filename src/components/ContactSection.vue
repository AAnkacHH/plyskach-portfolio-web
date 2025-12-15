<template>
  <section class="py-20 bg-white" id="contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8items-start">
        
        <!-- Usage Info Left Column -->
        <div class="space-y-8" data-aos="fade-right">
          <div>
             <h2 class="text-4xl font-bold text-gray-900 mb-4">Spojte se s námi</h2>
             <p class="text-gray-600 text-lg leading-relaxed max-w-md">
               Kontaktujte nás pro nezávaznou konzultaci nebo cenovou nabídku. Jsme tu pro vás, abychom zrealizovali vaše stavební plány.
             </p>
          </div>

          <div class="space-y-6">
             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Phone -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">+420 123 456 789</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Mail -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">info@profistavitel.cz</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Location -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">Dělnická 123, 170 00 Praha 7</span>
             </div>

             <div class="flex items-center gap-4">
               <div class="bg-[#1e2a4a] p-3 rounded-full text-white">
                 <!-- Icon: Clock -->
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
               </div>
               <span class="text-xl font-medium text-gray-800">Po-Pá: 8:00 - 17:00</span>
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
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Nezávazná poptávka a konzultace</h3>
          
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
                  Odesílání emailů dočasně nefunguje, zkuste to prosím později.
                </p>
              </div>
            </div>
          </div>

          <form class="space-y-4">
            <fieldset :disabled="!hasEmailToken" class="space-y-4 group-disabled:opacity-50">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Vaše jméno a příjmení *</label>
                <input 
                  type="text" 
                  v-model="name"
                  @blur="validateName"
                  @input="nameError = ''"
                  placeholder="Vaše jméno a příjmení" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': nameError}"
                  required 
                />
                <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">E-mailová adresa *</label>
                <input 
                  type="email" 
                  v-model="email" 
                  @blur="validateEmail"
                  @input="emailError = ''"
                  placeholder="E-mailová adresa" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': emailError}"
                  required 
                />
                <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
               <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Telefonní číslo *</label>
                <input 
                  type="tel" 
                  v-model="phone" 
                  @blur="validatePhone"
                  @input="phoneError = ''"
                  placeholder="Telefonní číslo" 
                  class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': phoneError}"
                  required
                />
                <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">Typ služby *</label>
                 <select 
                   v-model="serviceType" 
                   @blur="validateService"
                   @change="serviceError = ''"
                   class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-500"
                   :class="{'border-red-500 focus:border-red-500 focus:ring-red-500': serviceError}"
                   required
                 >
                   <option disabled>Vyberte z nabídky...</option>
                   <option>Hrubá stavba</option>
                   <option>Rekonstrukce</option>
                 </select>
                 <p v-if="serviceError" class="text-red-500 text-sm mt-1">{{ serviceError }}</p>
              </div>
            </div>

            <div>
               <label class="block text-sm font-bold text-gray-700 mb-1">Popis vašeho projektu *</label>
               <textarea 
                 v-model="message" 
                 @blur="validateMessage"
                 @input="messageError = ''"
                 rows="4" 
                 placeholder="Popis vašeho projektu" 
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
                <span v-if="files.length === 0">⬆ Nahrát soubory (plány, fotky)</span>
                <span v-else class="text-blue-600">
                    Přidat soubory
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
              {{ isSubmitting ? 'Odesílání...' : 'Odeslat poptávku' }}
            </button>
            
            <p v-if="submitStatus === 'success'" class="text-green-600 mt-2 font-bold text-center">Zpráva byla úspěšně odeslána!</p>
            <p v-if="submitStatus === 'error'" class="text-red-600 mt-2 font-bold text-center">Chyba při odesílání. Zkuste to prosím znovu.</p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { MailService } from "@genezio/email-service";
import FilePreview from './FilePreview.vue';

const hasEmailToken = !!import.meta.env.VITE_EMAIL_SERVICE_TOKEN;

const name = ref('');
const email = ref('');
const phone = ref('');
const serviceType = ref('Vyberte z nabídky...');
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
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Actions
const removeFile = (index) => {
    files.value.splice(index, 1);
};

const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value) {
        emailError.value = 'E-mail je povinný.';
        return false;
    }
    if (!re.test(email.value)) {
        emailError.value = 'Prosím zadejte platnou e-mailovou adresu.';
        return false;
    }
    emailError.value = '';
    return true;
};

const validateName = () => {
    if (!name.value.trim()) {
        nameError.value = 'Jméno je povinné.';
        return false;
    }
    nameError.value = '';
    return true;
};

const validatePhone = () => {
    if (!phone.value.trim()) {
        phoneError.value = 'Telefonní číslo je povinné.';
        return false;
    }
    // simple check for at least 9 digits
    const cleanPhone = phone.value.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
        phoneError.value = 'Zadejte platné telefonní číslo.';
        return false;
    }
    phoneError.value = '';
    return true;
};

const validateService = () => {
    if (serviceType.value === 'Vyberte z nabídky...') {
        serviceError.value = 'Vyberte prosím typ služby.';
        return false;
    }
    serviceError.value = '';
    return true;
};

const validateMessage = () => {
    if (!message.value.trim()) {
        messageError.value = 'Popis projektu je povinný.';
        return false;
    }
    messageError.value = '';
    return true;
};

const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Do NOT clear files.value here to allow accumulation
    fileError.value = '';

    selectedFiles.forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
            fileError.value = `Soubor ${file.name} je příliš velký. Maximální velikost je 10 MB.`;
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
             files.value.push({
                 name: file.name,
                 data: e.target.result.split(',')[1],
                 mimeType: file.type
             });
        };
        reader.readAsDataURL(file);
    });
    
    // Clear the input value so the same file can be selected again if needed (or if deleted and re-added)
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
        const response = await MailService.sendMail({
            emailServiceToken: import.meta.env.VITE_EMAIL_SERVICE_TOKEN,
            from: email.value, 
            to: "info@stavitelpro.cz", 
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
        });

        if (response.success) {
            submitStatus.value = 'success';
            // Reset form
            name.value = '';
            email.value = '';
            phone.value = '';
            serviceType.value = 'Vyberte z nabídky...';
            message.value = '';
            files.value = []; // Reset files
            
            // Reset errors
            nameError.value = '';
            emailError.value = '';
            messageError.value = '';
            phoneError.value = '';
            serviceError.value = '';
        } else {
            console.error(response.errorMessage);
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
