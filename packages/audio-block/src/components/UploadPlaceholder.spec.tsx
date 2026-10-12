/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { UploadPlaceholder } from './UploadPlaceholder';

const UPLOAD_PLACEHOLDER_TEST_ID = 'upload-placeholder';
const LOADING_CIRCLE_TEST_ID = 'fondue-loading-circle-content';

describe('Upload Placeholder', () => {
    it('should render an upload placeholder', () => {
        render(
            <UploadPlaceholder
                onUploadClick={vi.fn()}
                onAssetChooseClick={vi.fn()}
                loading={false}
                onFilesDrop={vi.fn()}
            />
        );

        expect(screen.getByTestId(UPLOAD_PLACEHOLDER_TEST_ID)).toBeInTheDocument();
    });

    it('should render a loading circle when loading', () => {
        render(
            <UploadPlaceholder onUploadClick={vi.fn()} onAssetChooseClick={vi.fn()} loading onFilesDrop={vi.fn()} />
        );

        expect(screen.getByTestId(LOADING_CIRCLE_TEST_ID)).toBeInTheDocument();
    });
});
