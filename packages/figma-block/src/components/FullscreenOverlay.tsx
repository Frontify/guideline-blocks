/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE_SELECTORS =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FullscreenOverlayProps = {
    isFullScreen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const FullscreenOverlay = ({ isFullScreen, onClose, children }: FullscreenOverlayProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isFullScreen) {
            return;
        }

        const previouslyFocused = document.activeElement as HTMLElement | null;
        overlayRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab' && overlayRef.current) {
                const focusable = Array.from(overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [isFullScreen, onClose]);

    const content = (
        <div
            ref={overlayRef}
            {...(isFullScreen && {
                role: 'dialog',
                'aria-modal': true,
                tabIndex: -1,
                className: 'tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200] tw-outline-none',
            })}
        >
            {children}
        </div>
    );

    return isFullScreen ? createPortal(content, document.body) : content;
};
