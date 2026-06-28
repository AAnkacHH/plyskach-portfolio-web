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
        fasada: 'Rekonstrukce fasády',
        led: 'Pokoj s LED osvětlením',
        podlaha: 'Pokládka dřevěné podlahy',
        sprcha: 'Obklad sprchového koutu',
        stuk_oliva: 'Dekorativní štuk — olivový',
        stuk_modra: 'Dekorativní štuk — modrý',
        schody: 'Schodiště z velkoformátové dlažby',
        mural_autor: 'Autor u svého muralu',
    },
    en: {
        rekonstrukce: 'Room renovation',
        pokladka: 'Tile laying',
        dlazby: 'Tile samples',
        detail: 'Decorative tile',
        stuk: 'Decorative stucco with gold leaf',
        mural: 'Artistic mural',
        mural_detail: 'Mural — atmospheric view',
        fasada: 'Facade renovation',
        led: 'Room with LED lighting',
        podlaha: 'Wooden floor laying',
        sprcha: 'Shower tiling',
        stuk_oliva: 'Decorative stucco — olive',
        stuk_modra: 'Decorative stucco — blue',
        schody: 'Staircase in large-format tile',
        mural_autor: 'Artist with his mural',
    },
    uk: {
        rekonstrukce: 'Реконструкція кімнати',
        pokladka: 'Укладання плитки',
        dlazby: 'Зразки плитки',
        detail: 'Декоративна плитка',
        stuk: 'Декоративна штукатурка з сухозліткою',
        mural: 'Художній мурал',
        mural_detail: 'Мурал — атмосферний вид',
        fasada: 'Реконструкція фасаду',
        led: 'Кімната з LED-підсвіткою',
        podlaha: 'Укладання дерев’яної підлоги',
        sprcha: 'Облицювання душової',
        stuk_oliva: 'Декоративний штук — оливковий',
        stuk_modra: 'Декоративний штук — синій',
        schody: 'Сходи з великоформатної плитки',
        mural_autor: 'Автор біля свого муралу',
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
    { src: '/gallery/autor-u-muralu.webp', key: 'mural_autor' },
    { src: '/gallery/dekorativni-stuk-oliva.webp', key: 'stuk_oliva' },
    { src: '/gallery/dekorativni-stuk-modra.webp', key: 'stuk_modra' },
    { src: '/gallery/obklad-sprchoveho-koutu.webp', key: 'sprcha' },
    { src: '/gallery/pokladka-drevene-podlahy.webp', key: 'podlaha' },
    { src: '/gallery/pokoj-led-osvetleni.webp', key: 'led' },
    { src: '/gallery/schodiste-kamenna-dlazba.webp', key: 'schody' },
    { src: '/gallery/rekonstrukce-fasady.webp', key: 'fasada' },
];

export function useGallery(): { items: ComputedRef<GalleryItem[]> } {
    const { locale } = useI18n();
    const items = computed<GalleryItem[]>(() => {
        const c = captions[locale.value as Locale] || captions.cs;
        return sources.map(({ src, key }) => ({ src, caption: c[key] }));
    });
    return { items };
}
