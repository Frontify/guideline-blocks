/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getAppBridgeBlockStub } from '@frontify/app-bridge/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ThumbnailItemProps } from '../../types';

import { Item } from './Item';

import type * as AppBridge from '@frontify/app-bridge';

const uploadFile = vi.fn();

vi.mock('@frontify/app-bridge', async (importOriginal) => ({
    ...(await importOriginal<typeof AppBridge>()),
    useAssetUpload: () => [uploadFile, { results: [], doneAll: false }],
}));

vi.mock('./UploadPlaceholder', () => ({
    UploadPlaceholder: ({ onFilesDrop }: { onFilesDrop: (files: FileList) => void }) => (
        <button type="button" onClick={() => onFilesDrop([new File([''], 'image.png')] as unknown as FileList)}>
            drop file
        </button>
    ),
}));

const renderItem = (isLoading: boolean) => {
    const onFilesSelected = vi.fn();
    const props: ThumbnailItemProps = {
        appBridge: getAppBridgeBlockStub({ editorState: true }),
        item: { id: '1' },
        image: undefined,
        isEditing: true,
        updateItem: vi.fn(),
        onRemoveItem: vi.fn(),
        showGrabHandle: false,
        showDeleteButton: false,
        thumbnailStyles: {
            captionPositionClassNames: '',
            imageIsAboveOrBelow: true,
            alignmentClassNames: '',
            width: '100%',
        },
        isLoading,
        onFilesSelected,
        onFilesUploaded: vi.fn(),
        onAssetsSelected: vi.fn(),
    };
    render(<Item {...props} />);
    return { onFilesSelected };
};

describe('Thumbnail Item', () => {
    beforeEach(() => {
        uploadFile.mockClear();
    });

    it('should start an upload when files are dropped on an idle item', () => {
        const { onFilesSelected } = renderItem(false);

        fireEvent.click(screen.getByRole('button', { name: 'drop file' }));

        expect(onFilesSelected).toHaveBeenCalledOnce();
        expect(uploadFile).toHaveBeenCalledOnce();
    });

    it('should not start a second upload when files are dropped while the item is loading', () => {
        const { onFilesSelected } = renderItem(true);

        fireEvent.click(screen.getByRole('button', { name: 'drop file' }));

        expect(onFilesSelected).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });
});
