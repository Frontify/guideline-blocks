/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen, onClose]);

    useEffect(() => {
        if (!isFullScreen) {
            return;
        }

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullScreen]);

    useEffect(() => {
        if (!isFullScreen) {
            return;
        }

        overlayRef.current?.focus();
    }, [isFullScreen]);

    if (!isFullScreen) {
        return <>{children}</>;
    }

    return createPortal(
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200] tw-outline-none"
        >
            {children}
        </div>,
        document.body
    );
};
