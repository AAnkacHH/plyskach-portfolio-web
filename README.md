# Plyskach Portfolio Web

Moderní webové portfolio pro stavební firmu **Michal Stavitel / Mykhaylo Plyskach**.
Projekt je postaven na **Vue 3**, **Vite** a využívá **Tailwind CSS** pro stylování. Backend pro odesílání emailů je řešen pomocí **Vercel Serverless Functions**.

## 🚀 Technologie

-   **Frontend Framework**: [Vue 3](https://vuejs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend / API**: [Vercel Serverless Functions](https://vercel.com/docs/functions)
-   **Email Service**: [Nodemailer](https://nodemailer.com/) (SMTP)
-   **Animace**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)

## 🛠 Instalace a spuštění

### 1. Klonování repozitáře

```bash
git clone https://github.com/AAnkacHH/plyskach-portfolio-web.git
cd plyskach-portfolio-web
```

### 2. Instalace závislostí

```bash
npm install
```

### 3. Konfigurace prostředí (Environment Variables)

Pro správné fungování kontaktního formuláře (odesílání emailů) je nutné vytvořit soubor `.env` v kořenovém adresáři projektu.

Vytvořte soubor `.env` a přidejte následující proměnné (nahraďte vlastními údaji):

```env
# Konfigurace SMTP (např. pro Gmail, Wedos, Seznam...)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=vas-email@gmail.com
# Pokud používáte Gmail s 2FA, musíte použít "App Password"
SMTP_PASS=vase-heslo-nebo-app-password
SMTP_SECURE=true

# Email, na který budou chodit poptávky z formuláře
CONTACT_EMAIL=ankach.ua@gmail.com
```

> **Poznámka:** Pokud `SMTP_SECURE` nastavíte na `true`, použije se obvykle port `465`. Pro `false` (STARTTLS) se používá port `587`.

### 4. Spuštění lokálního serveru

Pro lokální vývoj **doporučujeme používat Vercel CLI**, protože standardní `npm run dev` (Vite) neumí spustit backendové API (`/api/send-email`).

Pokud nemáte Vercel CLI, nainstalujte ho:
```bash
npm i -g vercel
```

Spuštění projektu (frontend + backend API):
```bash
vercel dev
```
Aplikace poběží na `http://localhost:3000`.

## 📂 Struktura Projektu

-   `/api` - Serverless funkce (backend).
    -   `send-email.js` - Endpoint pro odeslání kontaktního formuláře via SMTP.
-   `/src`
    -   `/assets` - Obrázky a statické soubory.
    -   `/components` - Vue komponenty (jednotlivé sekce webu).
        -   `HeroSection.vue` - Úvodní sekce.
        -   `AboutSection.vue` - Sekce "O nás" s profilem a hodnotami.
        -   `ServicesSection.vue` - Přehled služeb.
        -   `LatestProjSection.vue` - Portfolio/Reference filtr.
        -   `ContactSection.vue` - Kontaktní formulář.
    -   `App.vue` - Hlavní layout aplikace (obsahuje fixní pozadí).

## 🌍 Nasazení (Deployment) na Vercel

Tento projekt je optimalizován pro nasazení na [Vercel](https://vercel.com).

1.  Pushněte kód na GitHub.
2.  Importujte projekt ve Vercel Dashboardu.
3.  V nastavení projektu na Vercelu (**Settings > Environment Variables**) přidejte stejné proměnné jako v `.env` (`SMTP_HOST`, `SMTP_USER`, atd.).
4.  Vercel automaticky rozpozná Vite a Serverless functions a nasadí web.

## 🎨 Designové prvky

Web využívá efekt **"plovoucího textu"** nad fixním pozadím.
-   **Pozadí**: `App.vue` definuje globální fixní pozadí (`.fixed-bg`) s tmavým filtrem.
-   **Sekce**: Jednotlivé komponenty mají nastavenou průhlednost (`bg-white/90 backdrop-blur-sm`), aby byl text čitelný, ale pozadí stále prosvítalo.
-   **O nás / Portfolio**: Tyto sekce mají "průhlednou hlavičku", kde je vidět čisté pozadí, a obsah následuje pod ní v plné šířce.

---
*Created by Andrii Plyskach*