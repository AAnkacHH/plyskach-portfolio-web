export interface CertificateMeta {
    slug: string;
    image: string;
    thumb: string;
    width: number;
    height: number;
    issuerUrl: string;
    datesFull: string;
    yearRange: string;
    sessionCount?: number;
}

export const CERTIFICATES: CertificateMeta[] = [
    {
        slug: 'grassello-600',
        image: '/certificates/grassello-600.webp',
        thumb: '/certificates/grassello-600-thumb.webp',
        width: 1280,
        height: 810,
        issuerUrl: 'https://www.decoritalia.cz',
        datesFull: '5.5.2023 · 2.10.2023 · 9.1.2024',
        yearRange: '2023 · 2024',
        sessionCount: 3
    },
    {
        slug: 'marmorino-floor-unico',
        image: '/certificates/marmorino-floor-unico.webp',
        thumb: '/certificates/marmorino-floor-unico-thumb.webp',
        width: 1480,
        height: 1110,
        issuerUrl: 'https://www.decoritalia.cz',
        datesFull: '16.5.2023',
        yearRange: '2023'
    },
    {
        slug: 'marmorino-travertino',
        image: '/certificates/marmorino-travertino.webp',
        thumb: '/certificates/marmorino-travertino-thumb.webp',
        width: 1340,
        height: 880,
        issuerUrl: 'https://www.decoritalia.cz',
        datesFull: '27.6.2023',
        yearRange: '2023'
    },
    {
        slug: 'velature-metalliche',
        image: '/certificates/velature-metalliche.webp',
        thumb: '/certificates/velature-metalliche-thumb.webp',
        width: 1490,
        height: 1100,
        issuerUrl: 'https://www.decoritalia.cz',
        datesFull: '26.3.2024',
        yearRange: '2024'
    },
    {
        slug: 'poptavej-reliable-supplier',
        image: '/certificates/poptavej-reliable-supplier.webp',
        thumb: '/certificates/poptavej-reliable-supplier-thumb.webp',
        width: 1169,
        height: 827,
        issuerUrl: 'https://www.poptavej.cz/',
        datesFull: '20.9.2025',
        yearRange: '2025'
    }
];
