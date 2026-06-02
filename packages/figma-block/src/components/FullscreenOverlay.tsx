/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE_SELECTORS =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FullscreenOverlayProps = {
    isFullScreen: boolean;
    onClose: () => void;
    children: ReactNode;
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

                if (focusable.length === 0) {
                    e.preventDefault();
                    overlayRef.current.focus();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement as HTMLElement | null;

                const isInsideOverlay = active && overlayRef.current.contains(active);

                if (e.shiftKey && (!isInsideOverlay || active === first)) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && (!isInsideOverlay || active === last)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (previouslyFocused && document.contains(previouslyFocused)) {
                previouslyFocused.focus();
            }
        };
    }, [isFullScreen, onClose]);

    const content = (
        <div
            ref={overlayRef}
            role={isFullScreen ? 'dialog' : undefined}
            aria-modal={isFullScreen || undefined}
            tabIndex={isFullScreen ? -1 : undefined}
            className={
                isFullScreen ? 'tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200] tw-outline-none' : undefined
            }
        >
            {children}
        </div>
    );

    return isFullScreen ? createPortal(content, document.body) : content;
};
