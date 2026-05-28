# Gallery — Plan

Окрема сторінка галереї + лайтбокс у стилі `MapModal`.

## Контекст

- Зараз `LatestProjSection.vue` показує всі 7 фото в гріді 4-col з hover-caption, без кліку.
- Зразок дизайну — `src/components/contact/MapModal.vue` (Teleport → темна обкладинка → шапка з eyebrow+title → тіло з `EditorialStamp` → footer з orange CTA).
- Реюзабельні примітиви: `EditorialStamp.vue`, `useModalLock.ts` (Esc + body-lock), CSS-токени `--ink`, `--ink-deep`, `--orange`, `--display-font`.

## Рішення (узгоджені)

- **Footer модалки:** ← prev / next → (без Download CTA, без лічильника справа).
- **Клік по фото в модалці:** перехід до наступного.
- **Captions:** залишаються як зараз (hover-caption на гріді + caption як title у шапці модалки).
- **Головна показує 4 фото**, повна галерея — на окремій сторінці.
- **Нав-лінк "Galerie"** залишається скролом до `#projects` (4-фото тизер). Повна сторінка `/galerie` відкривається через CTA в тизері. *(трейд-офф: 2 кліки до повної галереї — прийнятно)*
- **URL slug:** `/galerie` (один для всіх локалей — за патерном `/privacy`, `/terms`).

## Нові файли

### 1. `src/lib/gallery.ts`
Спільний джерело даних для тизера + сторінки.

- Експортує функцію `useGallery()` → `{ items: ComputedRef<{src, caption}[]> }`
- `captions: Record<Locale, Record<string, string>>` — як зараз у `LatestProjSection.vue:56-84`

### 2. `src/components/gallery/GalleryModal.vue`
Структура копіює `MapModal.vue` (Teleport → overlay → shell з 3 зонами).

- **Header:** eyebrow `— GALERIE · Nº 03 / 07` (динамічно) + title = caption поточного фото.
- **Body:** `<img>` з `object-fit: contain` на `var(--ink)` фоні; `EditorialStamp` "Nº 03 · FOTO" top-right; клік по фото → next (wrap-around).
- **Footer:** зліва ← prev + next → (orange icon-buttons), справа порожньо.
- **Props:** `items: {src, caption}[]`, `index: number | null`, `v-model:index`.
- **Клавіші:** Esc (через `useModalLock`), `←` `→` для навігації.
- **Focus trap:** Tab цикл між close → prev → next.
- **Preload сусідніх** через `new Image()` при зміні index.
- **a11y:** `role="dialog"`, `aria-modal="true"`, `aria-label`.
- **prefers-reduced-motion** → вимкнути transition.

### 3. `src/components/GalleryPage.vue`
Повна сторінка з усіма фото.

- Шапка — `LegalHero` НЕ підходить як є (там `lastUpdatedLabel`/`effectiveDate`). Зробити кастомну хедер-секцію з тих самих стилів (`.legal-hero` фон + контейнер).
- Сітка з усіх 7 фото (`lg:grid-cols-4`, `aspect-[4/5]`).
- Той же `GalleryModal` для лайтбокса.
- `onMounted`: `document.title = ${t('gallery.title')} — Mykhaylo Plyskach` (бо сайт не має vue-meta).
- Кнопка "Zpět na hlavní stránku" внизу.

## Зміни існуючих файлів

### `src/components/LatestProjSection.vue`
- Виносимо джерело даних → `useGallery()` з `src/lib/gallery.ts`.
- `gallery.slice(0, 4)` — показуємо тільки перші 4.
- Під гридом — orange CTA: `<RouterLink :to="localePath('/galerie')">` **"Zobrazit celou galerii →"** (✅ через `localePath` — інакше зламається мультимовність).
- Структура плитки — `<figure>` як враппер (flow content), `<button>` всередині обгортає `<img>` (✅ валідний HTML5):
  ```html
  <figure class="gallery-tile">
    <button :aria-label="caption" @click="open(i)">
      <img :src="..." :alt="caption" />
    </button>
    <figcaption class="gallery-caption" aria-hidden="true">...</figcaption>
  </figure>
  ```
- `<GalleryModal :items="firstFour" v-model:index="lightboxIndex" />` під гридом.
- State: `const lightboxIndex = ref<number | null>(null)`.

### `src/router.ts`
- Додати `/galerie` в `makeLocalisedRoutes` (cs/en/uk):
  ```ts
  { path: `${prefix}/galerie`, component: GalleryPage, meta: { locale } }
  ```
- `GalleryPage` — лінива загрузка через `() => import(...)`.

### `src/locales/{cs,en,uk}.json`
Нові ключі:
```json
"gallery": {
  "kicker": "PRÁCE",
  "title": "Galerie prací",
  "intro": "Ukázky realizací z posledních let...",
  "backToHome": "Zpět na hlavní stránku",
  "viewAll": "Zobrazit celou galerii"
},
"portfolio": {
  "lightbox": {
    "eyebrow": "Galerie",
    "stampLabel": "FOTO",
    "prevLabel": "Předchozí",
    "nextLabel": "Další",
    "closeLabel": "Zavřít"
  }
}
```

Переклади:
- **cs:** `Galerie / Předchozí / Další / Zavřít / FOTO / PRÁCE / Galerie prací`
- **en:** `Gallery / Previous / Next / Close / PHOTO / WORK / Selected work`
- **uk:** `Галерея / Попереднє / Далі / Закрити / ФОТО / РОБОТИ / Галерея робіт`

### `src/components/NavBar.vue`
**Без змін** — `#projects` лишається скрол-анкором до тизера.

### `public/sitemap.xml` ⚠️ Must-update
Додати 3 записи для `/galerie`, `/en/galerie`, `/uk/galerie` з `priority 0.7`, `changefreq monthly`, hreflang-альтернативами (за патерном legal-сторінок). Без цього Google не зінде́ксує нову сторінку.

## Виправлення з ревью

1. **Валідний HTML:** `<button>` всередині `<figure>`, НЕ навпаки.
2. **Мультимовність:** CTA використовує `localePath('/galerie')`, не сирий шлях.
3. **Sitemap:** 3 нові записи в `public/sitemap.xml`.
4. **`<title>` для /galerie:** через `document.title` в `onMounted`.

## a11y / UX деталі

- Грід-плитка — клікабельний `<button>` з `aria-label=caption`, `<figcaption>` як `aria-hidden`.
- Лайтбокс відкривається з конкретного index, який передається через `v-model:index`.
- Закриття лайтбокса повертає фокус на тригер (`previouslyFocused` як у `MapModal`).
- `loading="eager"` для активного фото в модалці, `lazy` для гріда.
- `max-h: calc(100vh - 200px)` на фото в модалці — не обрізатиметься на mobile.
- Wrap-around при навігації (з 7-го → 1-ше).

## Що НЕ робимо в цій ітерації

- Не додаємо swipe-навігацію на тач (тільки клік + arrows).
- Не додаємо zoom на фото (object-fit: contain — і все).
- Не оптимізуємо сітку під 8-е фото.
- Не міняємо поточні captions.
- Не торкаємось NavBar.

## Послідовність робіт

1. Створити `src/lib/gallery.ts` — винести дані з `LatestProjSection.vue`.
2. Створити `src/components/gallery/GalleryModal.vue`.
3. Створити `src/components/GalleryPage.vue`.
4. Додати ключі в `cs/en/uk.json`.
5. Додати маршрут в `router.ts`.
6. Оновити `LatestProjSection.vue`: slice(0, 4) + CTA + інтеграція з `GalleryModal`.
7. Оновити `public/sitemap.xml`.
8. Локальна перевірка: `npm run build` + `npm run dev` → пройтись по тизер/повна-галерея/лайтбокс/клавіші/мультимовність CTA.
9. Комміт + push.
