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
          <form class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Vaše jméno a příjmení</label>
                <input type="text" placeholder="Vaše jméno a příjmení" class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" />
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">E-mailová adresa</label>
                <input type="email" placeholder="E-mailová adresa" class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
               <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Telefonní číslo</label>
                <input type="tel" placeholder="Telefonní číslo" class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white" />
              </div>
              <div>
                 <label class="block text-sm font-bold text-gray-700 mb-1">Typ služby</label>
                 <select class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-500">
                   <option>Vyberte z nabídky...</option>
                   <option>Hrubá stavba</option>
                   <option>Rekonstrukce</option>
                 </select>
              </div>
            </div>

            <div>
               <label class="block text-sm font-bold text-gray-700 mb-1">Popis vašeho projektu</label>
               <textarea rows="4" placeholder="Popis vašeho projektu" class="w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
            </div>

            <!-- Upload Button Fake -->
            <button type="button" class="w-full border-2 border-gray-400 border-dashed rounded-md p-3 text-gray-600 font-medium hover:bg-gray-50 transition">
              ⬆ Nahrát soubory (plány, fotky)
            </button>

            <!-- Submit Button -->
            <button type="submit" class="w-full bg-[#f57d1f] hover:bg-[#e06c10] text-white font-bold py-4 rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5 mt-4">
              Odeslat poptávku
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
