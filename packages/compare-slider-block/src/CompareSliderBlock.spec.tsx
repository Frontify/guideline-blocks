/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { convertToRteValue } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CompareSliderBlock } from './CompareSliderBlock';
import { Height } from './types';

const COMPARE_SLIDER_BLOCK_TEST_ID = 'compare-slider-block';
const COMPARE_SLIDER_TEST_ID = 'compare-slider-block-slider';
const BLOCK_INJECT_BUTTON_TEST_ID = 'block-inject-button';
const LABEL_WRAPPER_TEST_ID = 'compare-slider-block-label-wrapper';
const STRIKETHROUGH_WRAPPER_TEST_ID = 'compare-slider-block-strikethrough-wrapper';
const FIRST_ASSET_TEST_ID = 'slider-item-first';
const SECOND_ASSET_TEST_ID = 'slider-item-second';
const RTE_CONTENT_HTML_TEST_ID = 'rte-content-html';

const DUMMY_PREVIEW_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

const TWO_ASSETS = {
    firstAsset: [{ ...AssetDummy.with(1), previewUrl: DUMMY_PREVIEW_URL }],
    secondAsset: [{ ...AssetDummy.with(2), previewUrl: DUMMY_PREVIEW_URL }],
};

const renderCompareSliderBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [CompareSliderBlockWithStubs, appBridge] = withAppBridgeBlockStubs(CompareSliderBlock, appBridgeProps);
    const utils = render(<CompareSliderBlockWithStubs />);
    return { ...utils, appBridge };
};

// happy-dom never loads images, so the block would wait forever for both previews to fire `onload`.
class LoadingImage {
    onload: (() => void) | null = null;

    set src(_value: string) {
        setTimeout(() => this.onload?.());
    }
}

describe('Compare Slider Block', () => {
    beforeEach(() => {
        vi.stubGlobal('Image', LoadingImage);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should render compare slider block', () => {
        renderCompareSliderBlock();

        expect(screen.getByTestId(COMPARE_SLIDER_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should render upload buttons if there are no assets uploaded yet', () => {
        renderCompareSliderBlock({ editorState: true });

        expect(screen.getAllByTestId(BLOCK_INJECT_BUTTON_TEST_ID)).toHaveLength(2);
    });

    it('should render an upload button if there is only one asset uploaded', () => {
        renderCompareSliderBlock({
            blockAssets: { firstAsset: TWO_ASSETS.firstAsset },
            editorState: true,
        });

        expect(screen.getAllByTestId(BLOCK_INJECT_BUTTON_TEST_ID)).toHaveLength(1);
    });

    it('should render the compare slider if there are two assets uploaded', async () => {
        renderCompareSliderBlock({ blockAssets: TWO_ASSETS, editorState: true });

        expect(await screen.findByTestId(COMPARE_SLIDER_TEST_ID)).toBeInTheDocument();
    });

    it('should render a label in view mode if content exists', async () => {
        renderCompareSliderBlock({
            blockAssets: TWO_ASSETS,
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'first Asset Label'),
            },
            editorState: false,
        });

        await waitFor(() => {
            expect(screen.getByTestId(RTE_CONTENT_HTML_TEST_ID)).toHaveTextContent('first Asset Label');
        });
    });

    it('should render 2 labels in view mode if content exists', async () => {
        renderCompareSliderBlock({
            blockAssets: TWO_ASSETS,
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'Test'),
                secondAssetLabel: convertToRteValue(undefined, 'Test2'),
            },
            editorState: false,
        });

        await waitFor(() => {
            const labels = screen.getAllByTestId(RTE_CONTENT_HTML_TEST_ID);
            expect(labels).toHaveLength(2);
            expect(labels[0]).toHaveTextContent('Test');
            expect(labels[1]).toHaveTextContent('Test2');
        });
    });

    it('should render 2 labels in edit mode', async () => {
        renderCompareSliderBlock({ blockAssets: TWO_ASSETS, editorState: true });

        await waitFor(() => {
            expect(screen.getAllByTestId(LABEL_WRAPPER_TEST_ID)).toHaveLength(2);
        });
    });

    it('should render a strikethrough line', async () => {
        renderCompareSliderBlock({
            blockAssets: TWO_ASSETS,
            blockSettings: {
                firstAssetHasStrikethrough: true,
            },
        });

        expect(await screen.findByTestId(STRIKETHROUGH_WRAPPER_TEST_ID)).toBeInTheDocument();
    });

    it('should render the alt texts', async () => {
        renderCompareSliderBlock({
            blockAssets: TWO_ASSETS,
            blockSettings: {
                firstAssetAlt: 'First alt text',
                secondAssetAlt: 'Second alt text',
            },
        });

        expect(await screen.findByTestId(FIRST_ASSET_TEST_ID)).toHaveAttribute('alt', 'First alt text');
        expect(screen.getByTestId(SECOND_ASSET_TEST_ID)).toHaveAttribute('alt', 'Second alt text');
    });

    it('should use the correct aspect ratio for the images if height is auto', () => {
        renderCompareSliderBlock({
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), height: 200, width: 100 }],
                secondAsset: [{ ...AssetDummy.with(2), width: 100, height: 200 }],
            },
            blockSettings: {
                height: Height.Auto,
            },
        });

        expect(screen.getByTestId(COMPARE_SLIDER_BLOCK_TEST_ID)).toHaveStyle({ aspectRatio: '0.5' });
    });

    it('should not set an aspect ratio for the images if height is set', () => {
        renderCompareSliderBlock({
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), height: 200, width: 100 }],
                secondAsset: [{ ...AssetDummy.with(2), width: 100, height: 200 }],
            },
            blockSettings: {
                height: '200px',
            },
        });

        expect(screen.getByTestId(COMPARE_SLIDER_BLOCK_TEST_ID).style.aspectRatio).toBe('');
    });
});
