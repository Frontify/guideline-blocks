/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen, waitFor } from '@testing-library/react';
import { type ComponentProps, type Ref, createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DosDontsAssets, type DosDontsAssetsRef } from './DosDontsAssets';
import { BlockMode, DoDontType } from './types';

const mocks = vi.hoisted(() => ({
    openAssetChooser: vi.fn(),
    closeAssetChooser: vi.fn(),
    openFileDialog: vi.fn(),
    uploadFile: vi.fn(),
}));

const uploadState = vi.hoisted(() => ({
    selectedFiles: undefined as FileList | undefined,
    uploadResults: undefined as Array<{ id: number; alternativeText?: string }> | undefined,
    doneAll: false,
}));

vi.mock('@frontify/app-bridge', () => ({
    useAssetChooser: () => ({
        openAssetChooser: mocks.openAssetChooser,
        closeAssetChooser: mocks.closeAssetChooser,
    }),
    useFileInput: () => [
        mocks.openFileDialog,
        {
            selectedFiles: uploadState.selectedFiles,
        },
    ],
    useAssetUpload: ({ onUploadProgress }: { onUploadProgress: () => void }) => {
        mocks.uploadFile.mockImplementation(() => {
            onUploadProgress();
        });

        return [
            mocks.uploadFile,
            {
                results: uploadState.uploadResults,
                doneAll: uploadState.doneAll,
            },
        ];
    },
}));

vi.mock('@frontify/guideline-blocks-settings', () => ({
    AssetChooserObjectType: {
        ImageVideo: 'IMAGE_VIDEO',
    },
    FileExtensionSets: {
        Images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    },
    toRgbaString: vi.fn(() => 'rgba(255, 0, 0, 1)'),
}));

vi.mock('@frontify/guideline-blocks-shared', () => ({
    EditAltTextFlyout: ({
        showAltTextMenu,
        onSave,
        localAltText,
    }: {
        showAltTextMenu: boolean;
        onSave: () => void;
        localAltText?: string;
    }) => (
        <div data-test-id="alt-text-flyout" data-open={String(showAltTextMenu)}>
            <span>{localAltText}</span>
            <button type="button" onClick={onSave}>
                Save alt text
            </button>
        </div>
    ),
}));

vi.mock('./components/ImageComponent', () => ({
    default: ({
        alt,
        image,
        isEditing,
        onAssetChooseClick,
        onUploadClick,
        isUploadLoading,
        hasStrikethrough,
        border,
        radiusValue,
        dontColor,
    }: {
        alt?: string;
        image?: unknown;
        isEditing?: boolean;
        onAssetChooseClick: () => void;
        onUploadClick: () => void;
        isUploadLoading: boolean;
        hasStrikethrough: boolean;
        border: string;
        radiusValue?: string;
        dontColor?: unknown;
    }) => (
        <div
            data-test-id="image-component"
            data-alt={alt}
            data-image={image ? 'yes' : 'no'}
            data-editing={String(isEditing)}
            data-loading={String(isUploadLoading)}
            data-strikethrough={String(hasStrikethrough)}
            data-border={border}
            data-radius-value={radiusValue}
            data-dont-color={dontColor ? 'yes' : 'no'}
        >
            <button type="button" onClick={onAssetChooseClick}>
                Choose asset
            </button>
            <button type="button" onClick={onUploadClick}>
                Upload asset
            </button>
        </div>
    ),
}));

type DosDontsAssetsProps = ComponentProps<typeof DosDontsAssets>;

const defaultProps = {
    id: 'item-1',
    appBridge: {},
    mode: BlockMode.TEXT_AND_IMAGE,
    editing: true,
    linkedImage: {
        id: 1,
        previewUrl: 'image-url',
    },
    alt: 'Existing alt text',
    onChangeItem: vi.fn(),
    updateAssetIdsFromKey: vi.fn(),
    isCustomImageHeight: false,
    customImageHeightValue: undefined,
    imageDisplay: undefined,
    draggableProps: undefined,
    imageHeightChoice: undefined,
    isDragging: false,
    type: DoDontType.Do,
    hasStrikethrough: false,
    backgroundColor: undefined,
    hasBackground: false,
    hasRadius: false,
    radiusChoice: undefined,
    borderColor: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    borderStyle: 'solid',
    borderWidth: '1px',
    hasBorder: false,
    radiusValue: '8px',
    dontColor: {
        red: 255,
        green: 55,
        blue: 90,
        alpha: 1,
    },
} as unknown as DosDontsAssetsProps;

const renderDosDontsAssets = (props: Partial<DosDontsAssetsProps> = {}, ref?: Ref<DosDontsAssetsRef>) =>
    render(<DosDontsAssets ref={ref} {...defaultProps} {...props} />);

describe('DosDontsAssets', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        uploadState.selectedFiles = undefined;
        uploadState.uploadResults = undefined;
        uploadState.doneAll = false;
    });

    it('renders the image component in text and image mode', () => {
        renderDosDontsAssets();

        const imageComponent = screen.getByTestId('image-component');

        expect(imageComponent).not.toBeNull();
        expect(imageComponent.getAttribute('data-alt')).toBe('Existing alt text');
        expect(imageComponent.getAttribute('data-image')).toBe('yes');
        expect(imageComponent.getAttribute('data-editing')).toBe('true');
    });

    it('does not render the image component if the mode is not text and image', () => {
        renderDosDontsAssets({
            mode: 'text-only' as BlockMode,
        });

        expect(screen.queryByTestId('image-component')).toBeNull();
    });

    it('opens the file dialog through the imperative ref', () => {
        const ref = createRef<DosDontsAssetsRef>();

        renderDosDontsAssets({}, ref);

        act(() => {
            ref.current?.openUpload();
        });

        expect(mocks.openFileDialog).toHaveBeenCalledTimes(1);
    });

    it('opens the asset chooser through the imperative ref', () => {
        const ref = createRef<DosDontsAssetsRef>();

        renderDosDontsAssets({}, ref);

        act(() => {
            ref.current?.openAssetChooser();
        });

        expect(mocks.openAssetChooser).toHaveBeenCalledTimes(1);
        expect(mocks.openAssetChooser).toHaveBeenCalledWith(expect.any(Function), {
            multiSelection: false,
            objectTypes: ['IMAGE_VIDEO'],
            extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
        });
    });

    it('opens the alt text flyout through the imperative ref', () => {
        const ref = createRef<DosDontsAssetsRef>();

        renderDosDontsAssets({}, ref);

        expect(screen.getByTestId('alt-text-flyout').getAttribute('data-open')).toBe('false');

        act(() => {
            ref.current?.openAltTextMenu();
        });

        expect(screen.getByTestId('alt-text-flyout').getAttribute('data-open')).toBe('true');
    });

    it('updates the asset id and alt text when choosing an asset', async () => {
        const onChangeItem = vi.fn();
        const updateAssetIdsFromKey = vi.fn().mockResolvedValue(undefined);
        const ref = createRef<DosDontsAssetsRef>();

        renderDosDontsAssets(
            {
                alt: undefined,
                onChangeItem,
                updateAssetIdsFromKey,
            },
            ref
        );

        act(() => {
            ref.current?.openAssetChooser();
        });

        const chooserCallback = mocks.openAssetChooser.mock.calls[0]?.[0] as (
            result: Array<{ id: number; alternativeText?: string }>
        ) => Promise<void>;

        await act(async () => {
            await chooserCallback([
                {
                    id: 123,
                    alternativeText: 'Chosen asset alt text',
                },
            ]);
        });

        expect(updateAssetIdsFromKey).toHaveBeenCalledWith('item-1', [123]);
        expect(onChangeItem).toHaveBeenCalledWith('item-1', {
            alt: 'Chosen asset alt text',
        });
        expect(mocks.closeAssetChooser).toHaveBeenCalledTimes(1);
    });

    it('keeps the existing alt text when choosing an asset if alt already exists', async () => {
        const onChangeItem = vi.fn();
        const updateAssetIdsFromKey = vi.fn().mockResolvedValue(undefined);
        const ref = createRef<DosDontsAssetsRef>();

        renderDosDontsAssets(
            {
                alt: 'Current alt text',
                onChangeItem,
                updateAssetIdsFromKey,
            },
            ref
        );

        act(() => {
            ref.current?.openAssetChooser();
        });

        const chooserCallback = mocks.openAssetChooser.mock.calls[0]?.[0] as (
            result: Array<{ id: number; alternativeText?: string }>
        ) => Promise<void>;

        await act(async () => {
            await chooserCallback([
                {
                    id: 123,
                    alternativeText: 'Asset alt text',
                },
            ]);
        });

        expect(updateAssetIdsFromKey).toHaveBeenCalledWith('item-1', [123]);
        expect(onChangeItem).toHaveBeenCalledWith('item-1', {
            alt: 'Current alt text',
        });
    });

    it('uploads selected files', () => {
        const file = new File(['image'], 'image.png', {
            type: 'image/png',
        });

        uploadState.selectedFiles = [file] as unknown as FileList;

        renderDosDontsAssets();

        expect(mocks.uploadFile).toHaveBeenCalledWith(uploadState.selectedFiles);
    });

    it('updates the asset id and alt text when upload is done', async () => {
        const onChangeItem = vi.fn();
        const updateAssetIdsFromKey = vi.fn().mockResolvedValue(undefined);

        uploadState.uploadResults = [
            {
                id: 456,
                alternativeText: 'Uploaded asset alt text',
            },
        ];
        uploadState.doneAll = true;

        renderDosDontsAssets({
            alt: undefined,
            onChangeItem,
            updateAssetIdsFromKey,
        });

        await waitFor(() => {
            expect(updateAssetIdsFromKey).toHaveBeenCalledWith('item-1', [456]);
        });

        expect(onChangeItem).toHaveBeenCalledWith('item-1', {
            alt: 'Uploaded asset alt text',
        });
    });

    it('passes strikethrough only for dont items with strikethrough enabled', () => {
        renderDosDontsAssets({
            type: DoDontType.Dont,
            hasStrikethrough: true,
        });

        expect(screen.getByTestId('image-component').getAttribute('data-strikethrough')).toBe('true');
    });

    it('does not pass strikethrough for do items', () => {
        renderDosDontsAssets({
            type: DoDontType.Do,
            hasStrikethrough: true,
        });

        expect(screen.getByTestId('image-component').getAttribute('data-strikethrough')).toBe('false');
    });

    it('passes the border string when border is enabled', () => {
        renderDosDontsAssets({
            hasBorder: true,
            borderWidth: '2px',
        });

        expect(screen.getByTestId('image-component').getAttribute('data-border')).toBe('2px solid rgba(255, 0, 0, 1)');
    });

    it('passes an empty border string when border is disabled', () => {
        renderDosDontsAssets({
            hasBorder: false,
        });

        expect(screen.getByTestId('image-component').getAttribute('data-border')).toBe('');
    });
});
