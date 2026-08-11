/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDoDontAssets } from './useDoDontAssets';

const mocks = vi.hoisted(() => ({
    openAssetChooser: vi.fn(),
    closeAssetChooser: vi.fn(),
    openFileDialog: vi.fn(),
    uploadFile: vi.fn(),
}));

const uploadState = vi.hoisted(() => ({
    selectedFiles: undefined as FileList | undefined,
    results: undefined as Array<{ id: number; alternativeText?: string }> | undefined,
    doneAll: false,
}));

vi.mock('@frontify/app-bridge', () => ({
    useAssetChooser: () => ({
        openAssetChooser: mocks.openAssetChooser,
        closeAssetChooser: mocks.closeAssetChooser,
    }),
    useFileInput: () => [mocks.openFileDialog, { selectedFiles: uploadState.selectedFiles }],
    useAssetUpload: ({ onUploadProgress }: { onUploadProgress: () => void }) => {
        mocks.uploadFile.mockImplementation(() => onUploadProgress());
        return [mocks.uploadFile, { results: uploadState.results, doneAll: uploadState.doneAll }];
    },
}));

vi.mock('@frontify/guideline-blocks-settings', () => ({
    AssetChooserObjectType: { ImageVideo: 'IMAGE_VIDEO' },
    FileExtensionSets: { Images: ['jpg', 'png'] },
}));

const defaultProps = {
    id: 'item-1',
    appBridge: {} as never,
    onChangeItem: vi.fn(),
    updateAssetIdsFromKey: vi.fn().mockResolvedValue(undefined),
};

describe('useDoDontAssets', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        uploadState.selectedFiles = undefined;
        uploadState.results = undefined;
        uploadState.doneAll = false;
    });

    it('should open the file dialog', () => {
        const { result } = renderHook(() => useDoDontAssets(defaultProps));

        act(() => result.current.onUploadClick());

        expect(mocks.openFileDialog).toHaveBeenCalledOnce();
    });

    it('should open the image asset chooser with single selection', () => {
        const { result } = renderHook(() => useDoDontAssets(defaultProps));

        act(() => result.current.onOpenAssetChooser());

        expect(mocks.openAssetChooser).toHaveBeenCalledWith(expect.any(Function), {
            multiSelection: false,
            objectTypes: ['IMAGE_VIDEO'],
            extensions: ['jpg', 'png'],
        });
    });

    it('should store a chosen asset and use its alt text', async () => {
        const onChangeItem = vi.fn();
        const updateAssetIdsFromKey = vi.fn().mockResolvedValue(undefined);
        const { result } = renderHook(() =>
            useDoDontAssets({ ...defaultProps, alt: undefined, onChangeItem, updateAssetIdsFromKey })
        );

        act(() => result.current.onOpenAssetChooser());
        const chooseAsset = mocks.openAssetChooser.mock.calls[0]?.[0] as (
            assets: Array<{ id: number; alternativeText?: string }>
        ) => Promise<void>;

        await act(() => chooseAsset([{ id: 123, alternativeText: 'Asset alt text' }]));

        expect(updateAssetIdsFromKey).toHaveBeenCalledWith('item-1', [123]);
        expect(onChangeItem).toHaveBeenCalledWith('item-1', { alt: 'Asset alt text' });
        expect(result.current.localAltText).toBe('Asset alt text');
        expect(result.current.isUploadLoading).toBe(false);
        expect(mocks.closeAssetChooser).toHaveBeenCalledOnce();
    });

    it('should keep an existing alt text when choosing an asset', async () => {
        const onChangeItem = vi.fn();
        const { result } = renderHook(() =>
            useDoDontAssets({ ...defaultProps, alt: 'Existing alt', onChangeItem })
        );

        act(() => result.current.onOpenAssetChooser());
        const chooseAsset = mocks.openAssetChooser.mock.calls[0]?.[0] as (
            assets: Array<{ id: number; alternativeText?: string }>
        ) => Promise<void>;
        await act(() => chooseAsset([{ id: 123, alternativeText: 'New alt' }]));

        expect(onChangeItem).toHaveBeenCalledWith('item-1', { alt: 'Existing alt' });
        expect(result.current.localAltText).toBe('Existing alt');
    });

    it('should upload selected files and store the uploaded asset', async () => {
        const file = new File(['image'], 'image.png', { type: 'image/png' });
        const onChangeItem = vi.fn();
        const updateAssetIdsFromKey = vi.fn().mockResolvedValue(undefined);
        const { result, rerender } = renderHook(() =>
            useDoDontAssets({ ...defaultProps, alt: undefined, onChangeItem, updateAssetIdsFromKey })
        );

        uploadState.selectedFiles = [file] as unknown as FileList;
        rerender();

        expect(mocks.uploadFile).toHaveBeenCalledWith(uploadState.selectedFiles);
        expect(result.current.isUploadLoading).toBe(true);

        uploadState.results = [{ id: 456, alternativeText: 'Uploaded alt' }];
        uploadState.doneAll = true;
        rerender();

        await waitFor(() => expect(updateAssetIdsFromKey).toHaveBeenCalledWith('item-1', [456]));
        expect(onChangeItem).toHaveBeenCalledWith('item-1', { alt: 'Uploaded alt' });
        expect(result.current.localAltText).toBe('Uploaded alt');
        expect(result.current.isUploadLoading).toBe(false);
    });
});
