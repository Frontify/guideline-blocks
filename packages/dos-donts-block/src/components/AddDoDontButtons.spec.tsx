/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AddDoDontButtons } from './AddDoDontButtons';

const DOS_DONTS_ADD_BUTTONS = 'dos-donts-block-add-buttons';

describe('AddDoDontButtons', () => {
    it('should stack on top of each other on containers below @sm(440px) breakpoint', () => {
        render(<AddDoDontButtons isContainerSmall onAddItem={vi.fn()} />);

        expect(screen.getByTestId(DOS_DONTS_ADD_BUTTONS)).toHaveClass('tw-flex-col', '@sm:tw-flex-row');
    });

    it('should be rendered side by side on containers larger than @sm(440px) breakpoint', () => {
        render(<AddDoDontButtons isContainerSmall={false} onAddItem={vi.fn()} />);

        expect(screen.getByTestId(DOS_DONTS_ADD_BUTTONS)).toHaveClass('tw-flex-col', '@sm:tw-flex-row');
    });
});
