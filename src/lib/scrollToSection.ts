import { ref } from 'vue';

export function useScrollToSection() {
    const isMenuOpen = ref<boolean>(false);

    const scrollToSection = (href: string): void => {
        isMenuOpen.value = false;

        setTimeout(() => {
            const section = document.querySelector<HTMLElement>(href);
            if (section) {
                const headerOffset = 80;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                return;
            }

            if (href.startsWith('#')) {
                const path = window.location.pathname;
                const match = /^\/(en|uk)(\/|$)/.exec(path);
                const base = match ? `/${match[1]}` : '/';
                window.location.href = `${base}${href}`;
            }
        }, 100);
    };

    return {
        isMenuOpen,
        scrollToSection
    };
}
