/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, getAppBridgeBlockStub, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { BorderStyle } from '@frontify/guideline-blocks-settings';
import { type Color } from '@frontify/guideline-blocks-shared';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AssetKitBlock } from './AssetKitBlock';
import { ASSET_SETTINGS_ID } from './settings';

const BLOCK_TEST_ID = 'asset-kit-block';
const BLOCK_TITLE_TEST_ID = 'block-title';
const BLOCK_TITLE_HTML_TEST_ID = 'block-title-rte';
const BLOCK_DESCRIPTION_TEST_ID = 'block-description';
const BLOCK_DESCRIPTION_HTML_TEST_ID = 'block-description-rte';
const BLOCK_ITEM_WRAPPER_TEST_ID = 'block-item-wrapper';
const BLOCK_THUMBNAIL_TEST_ID = 'block-thumbnail';
const BLOCK_THUMBNAIL_IMAGE_TEST_ID = 'block-thumbnail-image';
const BLOCK_ITEM_WRAPPER_TOOLBAR_BTN_TEST_ID = 'block-item-wrapper-toolbar-btn';
const DOWNLOAD_BTN_TEST_ID = 'asset-kit-block-download-button';
const DOWNLOAD_MESSAGE_TEST_ID = 'asset-kit-download-message';
const DOWNLOAD_MESSAGE_PENDING_TEST_ID = 'asset-kit-pending-message';
const DOWNLOAD_MESSAGE_ERROR_TEST_ID = 'asset-kit-error-message';
const LOADING_CIRCLE_TEST_ID = 'fondue-loading-circle-content';
const DOWNLOAD_ANNOUNCEMENT_TEST_ID = 'asset-kit-block-screen-reader';
const ASSET_COUNT_TEST_ID = 'asset-kit-count';

const BLACK: Color = { red: 0, green: 0, blue: 0, alpha: 1 };
const PINK: Color = { red: 255, green: 0, blue: 255, alpha: 1 };
const WHITE: Color = { red: 255, green: 255, blue: 255, alpha: 1 };

const TITLE_DUMMY = '[{"type":"heading3","children":[{"text":"test","textStyle":"heading3"}]}]';

const TWO_ASSETS = { [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)] };

const DOTTED_WHITE_BLOCK_BORDER = {
    hasBorder_blocks: true,
    borderStyle_blocks: BorderStyle.Dotted,
    borderWidth_blocks: '1px',
    borderColor_blocks: WHITE,
    hasRadius_blocks: true,
    radiusValue_blocks: '10px',
};

const renderAssetKitBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [AssetKitBlockWithStubs, appBridge] = withAppBridgeBlockStubs(AssetKitBlock, appBridgeProps);
    const utils = render(<AssetKitBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('AssetKit Block', () => {
    it('should render an AssetKit block', () => {
        renderAssetKitBlock({ blockSettings: { title: TITLE_DUMMY } });

        expect(screen.getByTestId(BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should hide the information section if no information is provided', () => {
        renderAssetKitBlock({ blockSettings: { title: '', description: '' } });

        expect(screen.queryByTestId(BLOCK_TITLE_HTML_TEST_ID)).not.toBeInTheDocument();
        expect(screen.queryByTestId(BLOCK_DESCRIPTION_HTML_TEST_ID)).not.toBeInTheDocument();
    });

    it('should show the information section in edit mode even if no information is provided', () => {
        renderAssetKitBlock({ editorState: true, blockSettings: { title: '', description: '' } });

        expect(screen.getByTestId(BLOCK_TITLE_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(BLOCK_DESCRIPTION_TEST_ID)).toBeInTheDocument();
    });

    it('should display assets', () => {
        renderAssetKitBlock({ blockAssets: TWO_ASSETS });

        expect(screen.getAllByTestId(BLOCK_THUMBNAIL_TEST_ID)).toHaveLength(2);
    });

    it('should display assets with small width', () => {
        renderAssetKitBlock({
            blockAssets: {
                [ASSET_SETTINGS_ID]: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/width={width}' }],
            },
        });

        expect(screen.getByTestId(BLOCK_THUMBNAIL_IMAGE_TEST_ID)).toHaveAttribute(
            'src',
            'https://picsum.photos/width=218'
        );
    });

    it('should not display thumbnails in view mode if showThumbnails is set to false', () => {
        renderAssetKitBlock({ blockSettings: { showThumbnails: false }, blockAssets: TWO_ASSETS });

        expect(screen.queryByTestId(BLOCK_ITEM_WRAPPER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should display thumbnails in edit mode if showThumbnails is set to false', () => {
        renderAssetKitBlock({ editorState: true, blockSettings: { showThumbnails: false }, blockAssets: TWO_ASSETS });

        expect(screen.getAllByTestId(BLOCK_ITEM_WRAPPER_TEST_ID)).toHaveLength(2);
    });

    it('should display the asset count if enabled', () => {
        renderAssetKitBlock({ blockSettings: { showCount: true }, blockAssets: TWO_ASSETS });

        expect(screen.getByTestId(ASSET_COUNT_TEST_ID)).toHaveTextContent('2 assets');
    });

    it('should not display the asset count if disabled', () => {
        renderAssetKitBlock({ blockSettings: { showCount: false }, blockAssets: TWO_ASSETS });

        expect(screen.queryByTestId(ASSET_COUNT_TEST_ID)).not.toBeInTheDocument();
    });

    it('should display the asset count in a custom color if enabled', () => {
        renderAssetKitBlock({
            blockSettings: { showCount: true, assetCountColor: 'override', countCustomColor: PINK },
            blockAssets: TWO_ASSETS,
        });

        expect(screen.getByTestId(ASSET_COUNT_TEST_ID)).toHaveStyle({ color: 'rgb(255, 0, 255)' });
    });

    it('should not add padding to the block if no border and no background is set', () => {
        renderAssetKitBlock({
            blockSettings: { hasBorder_blocks: false, hasBackgroundBlocks: false },
            blockAssets: TWO_ASSETS,
        });

        expect(screen.getByTestId(BLOCK_TEST_ID)).not.toHaveClass('tw-p-5', 'sm:tw-p-8');
    });

    it('should add padding to the block if a border is set', () => {
        renderAssetKitBlock({ blockSettings: { hasBorder_blocks: true }, blockAssets: TWO_ASSETS });

        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveClass('tw-p-5', 'sm:tw-p-8');
    });

    it('should add padding to the block if a background is set', () => {
        renderAssetKitBlock({ blockSettings: { hasBackgroundBlocks: true }, blockAssets: TWO_ASSETS });

        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveClass('tw-p-5', 'sm:tw-p-8');
    });

    it('should display the block with a black background color', () => {
        renderAssetKitBlock({
            blockSettings: { hasBackgroundBlocks: true, backgroundColorBlocks: BLACK },
            blockAssets: TWO_ASSETS,
        });

        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
    });

    it('should display the block with a 1px dotted white border and 10px radius', () => {
        renderAssetKitBlock({ blockSettings: DOTTED_WHITE_BLOCK_BORDER, blockAssets: TWO_ASSETS });

        const block = screen.getByTestId(BLOCK_TEST_ID);
        expect(block).toHaveStyle({ borderStyle: 'dotted', borderWidth: '1px', borderColor: 'rgb(255, 255, 255)' });
        expect(block).toHaveStyle({ borderRadius: '10px' });
    });

    it('should display the block with a border radius and no border', () => {
        renderAssetKitBlock({
            blockSettings: { hasBorder_blocks: false, hasRadius_blocks: true, radiusValue_blocks: '10px' },
            blockAssets: TWO_ASSETS,
        });

        const block = screen.getByTestId(BLOCK_TEST_ID);
        expect(block).toHaveStyle({ borderRadius: '10px' });
        expect(block.style.borderStyle).toBe('');
    });

    it('should display assets with a black background color', () => {
        renderAssetKitBlock({
            blockSettings: { hasBackgroundThumbnails: true, backgroundColorThumbnails: BLACK },
            blockAssets: TWO_ASSETS,
        });

        expect(screen.getAllByTestId(BLOCK_THUMBNAIL_IMAGE_TEST_ID)[0]).toHaveStyle({
            backgroundColor: 'rgb(0, 0, 0)',
        });
    });

    it('should display assets with a 1px dotted white border and 10px radius', () => {
        renderAssetKitBlock({
            blockSettings: {
                hasBorder_thumbnails: true,
                borderStyle_thumbnails: BorderStyle.Dotted,
                borderWidth_thumbnails: '1px',
                borderColor_thumbnails: WHITE,
                hasRadius_thumbnails: true,
                radiusValue_thumbnails: '10px',
            },
            blockAssets: TWO_ASSETS,
        });

        const thumbnail = screen.getAllByTestId(BLOCK_THUMBNAIL_IMAGE_TEST_ID)[0];
        expect(thumbnail).toHaveStyle({ borderStyle: 'dotted', borderWidth: '1px', borderColor: 'rgb(255, 255, 255)' });
        expect(thumbnail).toHaveStyle({ borderRadius: '10px' });
    });

    it('should display assets with a border radius and no border', () => {
        renderAssetKitBlock({
            blockSettings: { hasBorder_thumbnails: false, hasRadius_thumbnails: true, radiusValue_thumbnails: '10px' },
            blockAssets: TWO_ASSETS,
        });

        const thumbnail = screen.getAllByTestId(BLOCK_THUMBNAIL_IMAGE_TEST_ID)[0];
        expect(thumbnail).toHaveStyle({ borderRadius: '10px' });
        expect(thumbnail.style.borderStyle).toBe('');
    });

    it('should remove assets in edit mode', async () => {
        renderAssetKitBlock({ editorState: true, blockAssets: TWO_ASSETS });

        await userEvent.click(screen.getAllByTestId(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN_TEST_ID)[0]);

        await waitFor(() => {
            expect(screen.getAllByTestId(BLOCK_ITEM_WRAPPER_TEST_ID)).toHaveLength(1);
        });
    });

    // TODO(vitest-migration): 'should display an outline if the asset is hovered' dropped — the outline comes from
    // BlockItemWrapper's `hover:tw-outline` Tailwind class, which happy-dom can't resolve as a :hover style.

    it('should disable the download button if no assets are set', () => {
        renderAssetKitBlock({ blockAssets: { [ASSET_SETTINGS_ID]: [] }, blockSettings: { title: TITLE_DUMMY } });

        expect(screen.getByTestId(DOWNLOAD_BTN_TEST_ID)).toBeDisabled();
    });

    it('should show the pending download message and the loading circle with the block border style', async () => {
        const appBridge = getAppBridgeBlockStub({
            blockSettings: DOTTED_WHITE_BLOCK_BORDER,
            blockAssets: TWO_ASSETS,
        });
        appBridge.getBulkDownloadByToken.onCall(0).resolves({ downloadUrl: '', signature: '' });
        render(<AssetKitBlock appBridge={appBridge} />);

        await userEvent.click(screen.getByTestId(DOWNLOAD_BTN_TEST_ID));

        const message = await screen.findByTestId(DOWNLOAD_MESSAGE_TEST_ID);
        expect(screen.getByTestId(DOWNLOAD_MESSAGE_PENDING_TEST_ID)).toBeInTheDocument();
        expect(message).toHaveStyle({ borderStyle: 'dotted', borderWidth: '1px', borderColor: 'rgb(255, 255, 255)' });
        expect(message).toHaveStyle({ borderRadius: '10px' });
        expect(within(message).getByTestId(LOADING_CIRCLE_TEST_ID)).toBeInTheDocument();
    });

    it('should show the download error message with the block border style', async () => {
        const appBridge = getAppBridgeBlockStub({
            blockSettings: DOTTED_WHITE_BLOCK_BORDER,
            blockAssets: TWO_ASSETS,
        });
        appBridge.getBulkDownloadByToken.rejects(new Error('Something went wrong'));
        render(<AssetKitBlock appBridge={appBridge} />);

        await userEvent.click(screen.getByTestId(DOWNLOAD_BTN_TEST_ID));

        expect(await screen.findByTestId(DOWNLOAD_MESSAGE_ERROR_TEST_ID)).toBeInTheDocument();
        const message = screen.getByTestId(DOWNLOAD_MESSAGE_TEST_ID);
        expect(message).toHaveStyle({ borderStyle: 'dotted', borderWidth: '1px', borderColor: 'rgb(255, 255, 255)' });
        expect(message).toHaveStyle({ borderRadius: '10px' });
    });

    it('should announce the download to screen readers once the download happened', async () => {
        renderAssetKitBlock({ blockAssets: { [ASSET_SETTINGS_ID]: [AssetDummy.with(1)] } });

        await userEvent.click(screen.getByTestId(DOWNLOAD_BTN_TEST_ID));

        await waitFor(() => {
            expect(screen.getByTestId(DOWNLOAD_ANNOUNCEMENT_TEST_ID)).toHaveTextContent('downloaded');
        });
    });
});
