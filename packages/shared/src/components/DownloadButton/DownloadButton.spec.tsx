/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DownloadButton } from './DownloadButton';

const DownloadButtonSelector = 'download-button';

describe('DownloadButton', () => {
    it('should render component', () => {
        const { getByTestId } = render(<DownloadButton onDownload={vi.fn()} />);
        expect(getByTestId(DownloadButtonSelector)).toBeTruthy();
    });

    it('should call onDownload on click', async () => {
        const onDownloadStub = vi.fn();
        const { getByTestId } = render(<DownloadButton onDownload={onDownloadStub} />);
        await userEvent.click(getByTestId(DownloadButtonSelector));
        expect(onDownloadStub).toHaveBeenCalled();
    });

    it('should have default aria-label', () => {
        const { getByTestId } = render(<DownloadButton onDownload={vi.fn()} />);
        expect(getByTestId(DownloadButtonSelector).getAttribute('aria-label')).toBe('Download');
    });

    it('should accepts custom aria-label', () => {
        const customAriaLabel = 'Custom Download Label';
        const { getByTestId } = render(<DownloadButton onDownload={vi.fn()} ariaLabel={customAriaLabel} />);
        expect(getByTestId(DownloadButtonSelector).getAttribute('aria-label')).toBe(customAriaLabel);
    });
});
