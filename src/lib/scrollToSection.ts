import { ref } from 'vue';

export function useScrollToSection() {
    // Індикатор відкритості меню, з типом boolean
    const isMenuOpen = ref<boolean>(false);

    // Скроли до секції за selector (тип string)
    const scrollToSection = (href: string): void => {
        isMenuOpen.value = false;

        // Отримуємо елемент за селектором
        const section = document.querySelector<HTMLElement>(href);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return {
        isMenuOpen,
        scrollToSection
    };
}
