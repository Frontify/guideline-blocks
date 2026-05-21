/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './ImageStageControls';

const ICON_ZOOM_IN_SELECTOR = 'fondue-icons-plus';
const ICON_ZOOM_OUT_SELECTOR = 'fondue-icons-minus';
const ICON_REJECT_SELECTOR = 'fondue-icons-cross';
const ICON_EXPAND_SELECTOR = 'fondue-icons-arrow-expand';

describe('Image Control Buttons', () => {
    describe('DrawFullScreenActionButton', () => {
        const onClick = vi.fn();

        it('renders button with icon expand', () => {
            render(<DrawFullScreenActionButton onClick={onClick} />);

            expect(screen.getByTestId(ICON_EXPAND_SELECTOR)).toBeInTheDocument();
        });

        it('renders button with icon reject', () => {
            render(<DrawFullScreenActionButton isFullScreen onClick={onClick} />);

            expect(screen.getByTestId(ICON_REJECT_SELECTOR)).toBeInTheDocument();
        });
    });

    describe('DrawZoomInOutButtons', () => {
        it('renders Zoom In and Out buttons', () => {
            render(<DrawZoomInOutButtons onClickZoomIn={vi.fn()} onClickZoomOut={vi.fn()} />);

            expect(screen.getByTestId(ICON_ZOOM_IN_SELECTOR)).toBeInTheDocument();
            expect(screen.getByTestId(ICON_ZOOM_OUT_SELECTOR)).toBeInTheDocument();
        });

        it('tests the onClick action', async () => {
            const onClickZoomIn = vi.fn();
            const onClickZoomOut = vi.fn();

            const user = userEvent.setup();

            render(<DrawZoomInOutButtons onClickZoomIn={onClickZoomIn} onClickZoomOut={onClickZoomOut} />);

            const buttons = screen.getAllByRole('button');

            await user.click(buttons[0]);
            await user.click(buttons[1]);

            expect(onClickZoomIn).toHaveBeenCalledTimes(1);
            expect(onClickZoomOut).toHaveBeenCalledTimes(1);
        });
    });
});
