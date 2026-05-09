import { watch, onUnmounted, type Ref } from 'vue';

/**
 * Lock body scroll and listen for Escape key while a modal is open.
 *
 * Naively sets/clears `body.style.overflow` — assumes a single concurrent
 * modal at a time. If multiple modals could be open simultaneously, this
 * needs to be replaced with a reference-counted lock.
 */
export function useModalLock(isOpen: Ref<boolean>, onClose: () => void): void {
    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    watch(isOpen, (open) => {
        if (typeof document === 'undefined') return;
        if (open) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', onKeydown);
        } else {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeydown);
        }
    });

    onUnmounted(() => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeydown);
    });
}
