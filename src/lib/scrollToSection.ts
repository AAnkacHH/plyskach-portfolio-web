import { ref } from 'vue';

export function useScrollToSection() {
    // Індикатор відкритості меню, з типом boolean
    const isMenuOpen = ref<boolean>(false);

    // Скроли до секції за selector (тип string)
    const scrollToSection = (href: string): void => {
        isMenuOpen.value = false;

        // Даємо час на закриття меню перед скролінгом (важливо для мобільних)
        setTimeout(() => {
            // Отримуємо елемент за селектором
            const section = document.querySelector<HTMLElement>(href);
            if (section) {
                // Offset для sticky header (80px)
                const headerOffset = 80;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    return {
        isMenuOpen,
        scrollToSection
    };
}
