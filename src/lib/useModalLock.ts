import { watch, onUnmounted, type Ref } from 'vue';

/**
 * Lock body scroll and listen for Escape key while a modal is open.
 *
 * Naively snapshots `body.style.overflow` on first lock and restores it
 * on close, so any pre-existing inline overflow set elsewhere is preserved.
 * Assumes a single concurrent modal — concurrent modals would need a
 * reference-counted lock instead.
 */
export function useModalLock(isOpen: Ref<boolean>, onClose: () => void): void {
    let prevOverflow: string | null = null;

    const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    const lock = () => {
        if (typeof document === 'undefined') return;
        prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeydown);
    };

    const unlock = () => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = prevOverflow ?? '';
        prevOverflow = null;
        document.removeEventListener('keydown', onKeydown);
    };

    watch(
        isOpen,
        (open) => {
            if (open) lock();
            else unlock();
        },
        { immediate: true }
    );

    onUnmounted(unlock);
}
