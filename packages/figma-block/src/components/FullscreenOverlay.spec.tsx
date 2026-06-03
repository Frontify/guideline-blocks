/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FullscreenOverlay } from './FullscreenOverlay';

describe('FullscreenOverlay', () => {
    afterEach(() => {
        cleanup();
        document.body.style.overflow = '';
        vi.clearAllMocks();
    });

    it('should render as a dialog with aria-modal="true" only when fullscreen', () => {
        const { rerender } = render(
            <FullscreenOverlay isFullScreen={false} onClose={vi.fn()}>
                <div>Overlay content</div>
            </FullscreenOverlay>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        rerender(
            <FullscreenOverlay isFullScreen onClose={vi.fn()}>
                <div>Overlay content</div>
            </FullscreenOverlay>
        );

        const dialog = screen.getByRole('dialog');

        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should call onClose when Escape is pressed', () => {
        const onClose = vi.fn();

        render(
            <FullscreenOverlay isFullScreen onClose={onClose}>
                <div>Overlay content</div>
            </FullscreenOverlay>
        );

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render children in place when not fullscreen', () => {
        render(
            <div data-test-id="parent">
                <FullscreenOverlay isFullScreen={false} onClose={vi.fn()}>
                    <div data-test-id="child">Overlay content</div>
                </FullscreenOverlay>
            </div>
        );

        expect(screen.getByTestId('parent')).toContainElement(screen.getByTestId('child'));
    });

    it('should set body overflow to hidden while fullscreen and restore the previous value on close', () => {
        document.body.style.overflow = 'scroll';

        const { unmount } = render(
            <FullscreenOverlay isFullScreen onClose={vi.fn()}>
                <div>Overlay content</div>
            </FullscreenOverlay>
        );

        expect(document.body.style.overflow).toBe('hidden');

        unmount();

        expect(document.body.style.overflow).toBe('scroll');
    });

    it('should restore focus to the previously focused element on close', () => {
        const previousButton = document.createElement('button');
        previousButton.textContent = 'Previous button';
        document.body.appendChild(previousButton);
        previousButton.focus();

        expect(previousButton).toHaveFocus();

        const { unmount } = render(
            <FullscreenOverlay isFullScreen onClose={vi.fn()}>
                <button type="button">Inside overlay</button>
            </FullscreenOverlay>
        );

        expect(screen.getByRole('dialog')).toHaveFocus();

        unmount();

        expect(previousButton).toHaveFocus();

        previousButton.remove();
    });
});
