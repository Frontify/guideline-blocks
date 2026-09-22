/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { CopyButton } from './CopyButton';

const COPY_BUTTON_TEST_ID = 'copy-button';
const TOOLTIP_CONTENT_TEST_ID = 'fondue-tooltip-content';

describe('CopyButton', () => {
    it('should copy the content and confirm with a label', async () => {
        const user = userEvent.setup();
        render(<CopyButton content="const a = 1;" testId={COPY_BUTTON_TEST_ID} />);

        const copyButton = screen.getByTestId(COPY_BUTTON_TEST_ID);
        expect(copyButton).toHaveTextContent('Copy');

        await user.click(copyButton);

        expect(await navigator.clipboard.readText()).toBe('const a = 1;');
        await waitFor(() => {
            expect(copyButton).toHaveTextContent('Copied');
        });
    });

    it('should copy the content and confirm in the tooltip', async () => {
        const user = userEvent.setup();
        render(<CopyButton content="const a = 1;" testId={COPY_BUTTON_TEST_ID} withTooltip />);

        const copyButton = screen.getByTestId(COPY_BUTTON_TEST_ID);

        await user.hover(copyButton);
        await waitFor(() => {
            expect(screen.getByTestId(TOOLTIP_CONTENT_TEST_ID)).toHaveTextContent('Copy to clipboard');
        });

        await user.click(copyButton);

        expect(await navigator.clipboard.readText()).toBe('const a = 1;');
        await waitFor(() => {
            expect(screen.getByTestId(TOOLTIP_CONTENT_TEST_ID)).toHaveTextContent('Copied');
        });
    });

    it('should name the icon-only button for assistive technology', async () => {
        const user = userEvent.setup();
        render(<CopyButton content="const a = 1;" testId={COPY_BUTTON_TEST_ID} withTooltip />);

        expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeInTheDocument();

        await user.click(screen.getByTestId(COPY_BUTTON_TEST_ID));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
        });
    });

    it('should render the tooltip trigger as the button itself', () => {
        const { container } = render(<CopyButton content="const a = 1;" testId={COPY_BUTTON_TEST_ID} withTooltip />);

        expect(container.querySelectorAll('button')).toHaveLength(1);
    });
});
