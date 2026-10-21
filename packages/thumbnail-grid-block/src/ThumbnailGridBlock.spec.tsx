/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { BorderStyle, GutterSpacing, Radius, Security } from '@frontify/guideline-blocks-settings';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThumbnailGridBlock } from './ThumbnailGridBlock';
import { CaptionPosition, HorizontalAlignment, type Thumbnail, VerticalAlignment } from './types';

import type * as GuidelineBlocksShared from '@frontify/guideline-blocks-shared';

const THUMBNAIL_GRID_BLOCK_TEST_ID = 'thumbnail-grid-block';
const THUMBNAIL_CAPTION_TEST_ID = 'thumbnail-rte';
const THUMBNAIL_IMAGE_WRAPPER_TEST_ID = 'thumbnail-image-wrapper';
const THUMBNAIL_IMAGE_TEST_ID = 'thumbnail-image';
const THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID = 'thumbnail-image-placeholder';
const THUMBNAIL_ITEM_TEST_ID = 'thumbnail-item';
const BLOCK_ITEM_WRAPPER_TEST_ID = 'block-item-wrapper';
const BLOCK_ITEM_WRAPPER_BUTTON_TEST_ID = 'block-item-wrapper-toolbar-btn';
const ASSET_VIEWER_BUTTON_TEST_ID = 'thumbnail-grid-block-asset-viewer-button';

const IMAGE_SOURCE = 'https://preview.url&format=webp&quality=80';

vi.mock('@frontify/guideline-blocks-shared', async () => {
    const actual = await vi.importActual<typeof GuidelineBlocksShared>('@frontify/guideline-blocks-shared');
    return {
        ...actual,
        useImageContainer: () => ({ containerWidth: 800, setContainerRef: () => {} }),
    };
});

const defaultSettings = {
    columnCount: '3',
    hasCustomSpacing: false,
    spacingCustom: '10px',
    spacingChoice: GutterSpacing.M,
    items: [],
    imagePosition: CaptionPosition.Right,
    hasCustomImageWidth: false,
    imageWidthPreset: '25%',
    verticalImageAlignment: VerticalAlignment.Start,
    hasBackground: false,
    backgroundColor: { red: 45, green: 50, blue: 50, alpha: 1, name: 'Background color' },
};

const createThumbnail = (id = '1'): Thumbnail => ({
    id,
    title: `Title ${id}`,
    description: `Test Description ${id}`,
    altText: `A custom alt text ${id}`,
});

// RichTextEditor only mounts the editable editor once its container is reported in the viewport;
// happy-dom's IntersectionObserver never fires, so report every observed element as intersecting.
class IntersectingObserver {
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback(
            [{ isIntersecting: true, target } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
        );
    }

    unobserve() {}

    disconnect() {}
}

const getCaptionEditors = async () => {
    const caption = screen.getByTestId(THUMBNAIL_CAPTION_TEST_ID);
    await waitFor(() => {
        expect(caption.querySelectorAll('[contenteditable=true]')).toHaveLength(2);
    });
    return caption.querySelectorAll<HTMLElement>('[contenteditable=true]');
};

// happy-dom exposes TextEvent, so React derives onBeforeInput from `textInput` events, which user-event never
// dispatches. Firing one directly lets Slate run its real insertText path.
const typeIntoEditor = async (editor: HTMLElement, text: string) => {
    await userEvent.click(editor);
    const textInputEvent = new Event('textInput', { bubbles: true, cancelable: true });
    Object.defineProperty(textInputEvent, 'data', { value: text });
    editor.dispatchEvent(textInputEvent);
};

// happy-dom has no layout engine, so dnd-kit's keyboard sensor sees every item at 0x0. Lay the grid items out as
// fixed-size cells in a three column grid so keyboard moves resolve to the neighbouring cell.
const GRID_COLUMNS = 3;
const GRID_CELL_SIZE = 100;
const GRID_GAP = 30;

const createRect = (left: number, top: number, width: number, height: number) =>
    ({
        x: left,
        y: top,
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        toJSON: () => ({}),
    }) as DOMRect;

const getGridRect = (element: HTMLElement) => {
    if (element.dataset.testId === THUMBNAIL_GRID_BLOCK_TEST_ID) {
        const rows = Math.ceil(element.children.length / GRID_COLUMNS);
        return createRect(
            0,
            0,
            GRID_COLUMNS * GRID_CELL_SIZE + (GRID_COLUMNS - 1) * GRID_GAP,
            rows * GRID_CELL_SIZE + (rows - 1) * GRID_GAP
        );
    }
    const parent = element.parentElement;
    if (parent?.dataset.testId === THUMBNAIL_GRID_BLOCK_TEST_ID) {
        const index = Array.from(parent.children).indexOf(element);
        return createRect(
            (index % GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_GAP),
            Math.floor(index / GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_GAP),
            GRID_CELL_SIZE,
            GRID_CELL_SIZE
        );
    }
    return undefined;
};

const mockGridLayout = () => {
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        return getGridRect(this) ?? originalGetBoundingClientRect.call(this);
    });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
        return getGridRect(this)?.width ?? 0;
    });
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
        return getGridRect(this)?.height ?? 0;
    });
};

// The drag handle is replaced by a placeholder once dragging starts, so only the activation key goes to the handle;
// dnd-kit listens for the remaining keys on the document after a tick.
const moveItemByKeyboard = async (itemIndex: number, keys: string[]) => {
    const itemWrapper = screen.getAllByTestId(BLOCK_ITEM_WRAPPER_TEST_ID)[itemIndex];
    const [dragHandle] = within(itemWrapper).getAllByTestId(BLOCK_ITEM_WRAPPER_BUTTON_TEST_ID);
    dragHandle.focus();
    fireEvent.keyDown(dragHandle, { code: 'Enter', key: 'Enter' });
    for (const key of [...keys, 'Enter']) {
        await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
        fireEvent.keyDown(document.body, { code: key, key });
    }
};

const getImageAltTexts = () => screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID).map((image) => image.getAttribute('alt'));

const SIX_ITEMS = ['1', '2', '3', '4', '5', '6'];

const renderThumbnailGridBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [ThumbnailGridBlockWithStubs, appBridge] = withAppBridgeBlockStubs(ThumbnailGridBlock, appBridgeProps);
    const utils = render(<ThumbnailGridBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Thumbnail Grid Block', () => {
    beforeEach(() => {
        vi.stubGlobal('IntersectionObserver', IntersectingObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should render an empty thumbnail grid block with default settings', () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: { ...defaultSettings },
        });

        const grid = screen.getByTestId(THUMBNAIL_GRID_BLOCK_TEST_ID);
        expect(grid).toHaveClass('@sm:tw-grid-cols-2', '@md:tw-grid-cols-3');
        expect(grid).toHaveStyle({ gap: '30px' });
        expect(screen.getByTestId(THUMBNAIL_ITEM_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(THUMBNAIL_IMAGE_TEST_ID)).not.toBeInTheDocument();
        expect(screen.getByTestId(THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(THUMBNAIL_IMAGE_WRAPPER_TEST_ID)).toHaveClass('tw-place-self-start');
    });

    it('should render one item if it is provided and automatically add an empty one', async () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: { items: [createThumbnail('1')] },
        });

        await waitFor(() => {
            expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)[0]).toHaveTextContent('Title 1');
        });
        expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)[0]).toHaveTextContent('Test Description 1');
        expect(screen.getAllByTestId(THUMBNAIL_ITEM_TEST_ID)).toHaveLength(2);
        expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)[1]).not.toHaveTextContent('Title');
        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID)[1]).toBeInTheDocument();
    });

    it('should not render the item in view mode if no image is provided', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: { items: [createThumbnail('1')] },
        });

        expect(screen.queryByTestId(THUMBNAIL_CAPTION_TEST_ID)).not.toBeInTheDocument();
        for (const item of screen.getAllByTestId(THUMBNAIL_ITEM_TEST_ID)) {
            expect(item.closest('.tw-hidden')).not.toBeNull();
        }
    });

    it('should render multiple items in edit mode if they are provided', () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(3);
        expect(screen.getAllByTestId(THUMBNAIL_ITEM_TEST_ID)).toHaveLength(3);
    });

    it('should render multiple items with images in view mode', async () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        const captions = screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID);
        expect(captions).toHaveLength(2);
        await waitFor(() => {
            expect(captions[0]).toHaveTextContent('Title 1');
        });
        expect(captions[0]).toHaveTextContent('Test Description 1');
        expect(captions[1]).toHaveTextContent('Title 2');
        expect(captions[1]).toHaveTextContent('Test Description 2');

        const visibleItems = screen
            .getAllByTestId(THUMBNAIL_ITEM_TEST_ID)
            .filter((item) => item.closest('.tw-hidden') === null);
        expect(visibleItems).toHaveLength(2);

        const images = screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID);
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', IMAGE_SOURCE);
        expect(screen.queryByTestId(THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the image styles if they are provided', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1')],
                height: '50%',
                radiusValue: '12px',
                hasRadius: false,
                radiusChoice: Radius.Medium,
                hasCustomImageWidth: true,
                customImageWidth: '34%',
                imageWidthPreset: '50%',
                hasBackground: true,
                backgroundColor: { red: 0, green: 0, blue: 0, alpha: 1, name: 'black' },
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderWidth: '2px',
                borderColor: { red: 255, green: 255, blue: 255, alpha: 1, name: 'white' },
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_WRAPPER_TEST_ID)[0]).toHaveAttribute('style', 'width: 34%;');
        expect(screen.getByTestId(THUMBNAIL_IMAGE_TEST_ID)).toHaveStyle({
            borderStyle: 'dashed',
            borderWidth: '2px',
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(0, 0, 0)',
            borderRadius: '4px',
        });
    });

    it('should render a custom alt text', () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1')],
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
            },
        });

        const image = screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID)[0];
        expect(image).toHaveAttribute('alt', 'A custom alt text 1');
        expect(image).toHaveAttribute('src', IMAGE_SOURCE);
    });

    it('should render empty alt texts', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [
                    { ...createThumbnail('1'), altText: '' },
                    { ...createThumbnail('2'), altText: '' },
                ],
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        const images = screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID);
        expect(images[0]).toHaveAttribute('alt', '');
        expect(images[1]).toHaveAttribute('alt', '');
    });

    it('should render the image alignment in horizontal caption alignment', () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1')],
                imagePosition: CaptionPosition.Left,
                verticalImageAlignment: VerticalAlignment.Center,
                horizontalImageAlignment: HorizontalAlignment.Left,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_ITEM_TEST_ID)[0]).toHaveClass('tw-flex-row-reverse');
        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_WRAPPER_TEST_ID)[0]).toHaveClass('tw-place-self-center');
    });

    it('should render the image alignment in vertical caption alignment', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1')],
                imagePosition: CaptionPosition.Above,
                verticalImageAlignment: VerticalAlignment.Start,
                horizontalImageAlignment: HorizontalAlignment.Right,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
            },
        });

        const item = screen.getAllByTestId(THUMBNAIL_ITEM_TEST_ID)[0];
        expect(item).toHaveClass('tw-flex-col-reverse', 'tw-justify-end');
        const imageWrapper = screen.getAllByTestId(THUMBNAIL_IMAGE_WRAPPER_TEST_ID)[0];
        expect(imageWrapper).toHaveClass('tw-grid', 'tw-justify-items-end', 'tw-w-full');
        expect(imageWrapper).not.toHaveClass('tw-flex-col');
        expect(screen.queryByTestId(THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should add an item by adding a text in the title', async () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: { ...defaultSettings },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_PLACEHOLDER_TEST_ID)).toHaveLength(1);
        const editors = await getCaptionEditors();
        await typeIntoEditor(editors[0], 'Test Title');

        await waitFor(() => {
            expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(2);
        });
    });

    it('should add an item by adding a text in the description', async () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: { ...defaultSettings },
        });

        expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(1);
        const editors = await getCaptionEditors();
        await typeIntoEditor(editors[1], 'Test Description');

        await waitFor(() => {
            expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(2);
        });
    });

    it('should delete an item by clicking the delete toolbar button', async () => {
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(3);
        await userEvent.click(screen.getAllByTestId(BLOCK_ITEM_WRAPPER_BUTTON_TEST_ID)[1]);

        await waitFor(() => {
            expect(screen.getAllByTestId(THUMBNAIL_CAPTION_TEST_ID)).toHaveLength(2);
        });
    });

    it('should move the first item to the fifth position by keyboard', async () => {
        mockGridLayout();
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: SIX_ITEMS.map(createThumbnail),
            },
            blockAssets: Object.fromEntries(SIX_ITEMS.map((id) => [id, [AssetDummy.with(Number(id))]])),
        });

        await moveItemByKeyboard(0, ['ArrowDown', 'ArrowRight']);

        await waitFor(() => {
            expect(getImageAltTexts()).toEqual([
                'A custom alt text 2',
                'A custom alt text 3',
                'A custom alt text 4',
                'A custom alt text 5',
                'A custom alt text 1',
                'A custom alt text 6',
            ]);
        });
    });

    it('should move the fifth item to the first position by keyboard', async () => {
        mockGridLayout();
        renderThumbnailGridBlock({
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: SIX_ITEMS.map(createThumbnail),
            },
            blockAssets: Object.fromEntries(SIX_ITEMS.map((id) => [id, [AssetDummy.with(Number(id))]])),
        });

        await moveItemByKeyboard(4, ['ArrowUp', 'ArrowLeft']);

        await waitFor(() => {
            expect(getImageAltTexts()).toEqual([
                'A custom alt text 5',
                'A custom alt text 1',
                'A custom alt text 2',
                'A custom alt text 3',
                'A custom alt text 4',
                'A custom alt text 6',
            ]);
        });
    });

    it('should render items as buttons if the custom security settings allow it even if the global is disabled', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                security: Security.Custom,
                assetViewerEnabled: true,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            privacySettings: {
                assetViewerEnabled: false,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID).length).toBeGreaterThan(0);
        expect(screen.getAllByTestId(ASSET_VIEWER_BUTTON_TEST_ID).length).toBeGreaterThan(0);
    });

    it('should not render items as buttons if the custom security settings disallow it even if the global is enabled', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                security: Security.Custom,
                assetViewerEnabled: false,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            privacySettings: {
                assetViewerEnabled: true,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID).length).toBeGreaterThan(0);
        expect(screen.queryByTestId(ASSET_VIEWER_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render items as buttons if the global security settings allow asset viewer', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                security: Security.Global,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            privacySettings: {
                assetViewerEnabled: true,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID).length).toBeGreaterThan(0);
        expect(screen.getAllByTestId(ASSET_VIEWER_BUTTON_TEST_ID).length).toBeGreaterThan(0);
    });

    it('should not render items as buttons if the global security settings disallow asset viewer', () => {
        renderThumbnailGridBlock({
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                security: Security.Global,
                assetViewerEnabled: true,
                items: [createThumbnail('1'), createThumbnail('2')],
            },
            privacySettings: {
                assetViewerEnabled: false,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                '1': [AssetDummy.with(1)],
                '2': [AssetDummy.with(2)],
            },
        });

        expect(screen.getAllByTestId(THUMBNAIL_IMAGE_TEST_ID).length).toBeGreaterThan(0);
        expect(screen.queryByTestId(ASSET_VIEWER_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });
});
