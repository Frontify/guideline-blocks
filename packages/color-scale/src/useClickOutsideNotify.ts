import { useEffect } from 'react';

export const useClickOutsideNotify = (reference: HTMLElement | null, callback: () => void): void => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!reference?.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [reference, callback]);
};
