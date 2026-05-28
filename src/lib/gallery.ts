import { computed, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

export interface GalleryItem {
    src: string;
    caption: string;
}

type Locale = 'cs' | 'en' | 'uk';

const captions: Record<Locale, Record<string, string>> = {
    cs: {
        rekonstrukce: 'Rekonstrukce pokoje',
        pokladka: 'Pokládka dlažby',
        dlazby: 'Dlažby',
        detail: 'Dekorativní obklad',
        stuk: 'Dekorativní štuk s plátkovým zlatem',
        mural: 'Umělecký mural',
        mural_detail: 'Mural — atmosférní pohled',
    },
    en: {
        rekonstrukce: 'Room renovation',
        pokladka: 'Tile laying',
        dlazby: 'Tile samples',
        detail: 'Decorative tile',
        stuk: 'Decorative stucco with gold leaf',
        mural: 'Artistic mural',
        mural_detail: 'Mural — atmospheric view',
    },
    uk: {
        rekonstrukce: 'Реконструкція кімнати',
        pokladka: 'Укладання плитки',
        dlazby: 'Зразки плитки',
        detail: 'Декоративна плитка',
        stuk: 'Декоративна штукатурка з сухозліткою',
        mural: 'Художній мурал',
        mural_detail: 'Мурал — атмосферний вид',
    },
};

const sources: { src: string; key: string }[] = [
    { src: '/gallery/rekonstrukce-pokoje.webp', key: 'rekonstrukce' },
    { src: '/gallery/pokladka-dlazby.webp', key: 'pokladka' },
    { src: '/gallery/dlazby.webp', key: 'dlazby' },
    { src: '/gallery/projekt-04.webp', key: 'detail' },
    { src: '/gallery/dekorativni-stuk-koral.webp', key: 'stuk' },
    { src: '/gallery/mural-portret.webp', key: 'mural' },
    { src: '/gallery/mural-portret-detail.webp', key: 'mural_detail' },
];

export function useGallery(): { items: ComputedRef<GalleryItem[]> } {
    const { locale } = useI18n();
    const items = computed<GalleryItem[]>(() => {
        const c = captions[locale.value as Locale] || captions.cs;
        return sources.map(({ src, key }) => ({ src, caption: c[key] }));
    });
    return { items };
}
