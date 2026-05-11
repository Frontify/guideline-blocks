/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { Security } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ImageBlock } from './ImageBlock';
import { ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { CaptionPosition, CornerRadius, Ratio, imageRatioValues, mapCaptionPositionClasses } from './types';

import type * as GuidelineBlocksShared from '@frontify/guideline-blocks-shared';

const IMAGE_BLOCK_TEST_ID = 'image-block';
const IMAGE_COMPONENT_TEST_ID = 'image-block-image-component';
const ASSET_VIEWER_WRAPPER_TEST_ID = 'image-block-asset-viewer-wrapper';
const DEFAULT_WRAPPER_TEST_ID = 'image-block-default-wrapper';
const CAPTION_TEST_ID = 'image-caption';
const PLACEHOLDER_TEST_ID = 'block-inject-button';
const DOWNLOAD_BUTTON_TEST_ID = 'download-button';
const ATTACHMENTS_FLYOUT_BUTTON_TEST_ID = 'attachments-flyout-button';
const BUTTONS_WRAPPER_TEST_ID = 'buttons-wrapper';
const TOOLBAR_BUTTON_TEST_ID = 'block-item-wrapper-toolbar-btn';
const TOOLBAR_FLYOUT_TEST_ID = 'block-item-wrapper-toolbar-flyout';
const ALT_TEXT_INPUT_TEST_ID = 'alt-text-input';

let mockContainerWidth: number | undefined;

vi.mock('@frontify/guideline-blocks-shared', async () => {
    const actual = await vi.importActual<typeof GuidelineBlocksShared>('@frontify/guideline-blocks-shared');
    return {
        ...actual,
        useImageContainer: () => ({
            containerWidth: mockContainerWidth,
            setContainerRef: () => {},
        }),
    };
});

const renderImageBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [ImageBlockWithStubs, appBridge] = withAppBridgeBlockStubs(ImageBlock, appBridgeProps);
    const utils = render(<ImageBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Image Block', () => {
    it("should convert a chosen asset's backgroundColor string into a color object", async () => {
        const { appBridge } = renderImageBlock({ editorState: true });

        await userEvent.click(screen.getByTestId(PLACEHOLDER_TEST_ID));
        await userEvent.click(await screen.findByText('Browse asset'));

        await waitFor(() => {
            expect(appBridge.updateBlockSettings.calledWithMatch({ hasBackground: true })).toBe(true);
        });
        expect(appBridge.updateBlockSettings.getCall(0).args[0]).toMatchObject({
            backgroundColor: { red: 115, green: 210, blue: 210, alpha: 1 },
            hasBackground: true,
        });
    });

    it('should render an image block', () => {
        renderImageBlock();
        expect(screen.getByTestId(IMAGE_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should render a placeholder if in edit mode and there is no image uploaded yet', () => {
        renderImageBlock({ editorState: true });
        expect(screen.getByTestId(PLACEHOLDER_TEST_ID)).toBeInTheDocument();
    });

    it('should not render a placeholder if in view mode and there is no image uploaded yet', () => {
        renderImageBlock();
        expect(screen.queryByTestId(PLACEHOLDER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the image if it is uploaded', () => {
        renderImageBlock({
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toBeInTheDocument();
    });

    it('should request an image sized to the rounded-up container width', () => {
        mockContainerWidth = 300;
        renderImageBlock({
            blockAssets: {
                [IMAGE_ID]: [{ ...AssetDummy.with(1), genericUrl: 'https://generic.url?width={width}' }],
            },
            blockSettings: { positioning: CaptionPosition.Above },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toHaveAttribute(
            'src',
            'https://generic.url?width=300&format=webp&quality=100'
        );
    });

    it('should request a larger image when the wrapper has a border', () => {
        mockContainerWidth = 400;
        renderImageBlock({
            blockAssets: {
                [IMAGE_ID]: [{ ...AssetDummy.with(1), genericUrl: 'https://generic.url?width={width}' }],
            },
            blockSettings: {
                positioning: CaptionPosition.Above,
                hasBorder: true,
                borderWidth: '1px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
            },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toHaveAttribute(
            'src',
            'https://generic.url?width=400&format=webp&quality=100'
        );
    });

    it('should render the download button if the image is uploaded and security settings allows it', () => {
        renderImageBlock({
            blockSettings: { security: Security.Custom, downloadable: true },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DOWNLOAD_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should not render the download button if the image is not uploaded but there are attachments', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Custom, downloadable: true },
            blockAssets: {
                [IMAGE_ID]: [],
                [ATTACHMENTS_ASSET_ID]: [AssetDummy.with(1)],
            },
        });
        expect(screen.queryByTestId(DOWNLOAD_BUTTON_TEST_ID)).not.toBeInTheDocument();
        expect(screen.getByTestId(ATTACHMENTS_FLYOUT_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should not render the download button if the security settings disallow it', () => {
        renderImageBlock({
            blockSettings: { security: Security.Custom, downloadable: false },
            blockAssets: {},
        });
        expect(screen.queryByTestId(DOWNLOAD_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the asset viewer when the assetViewerEnabled setting is not present', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Custom },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_BLOCK_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(ASSET_VIEWER_WRAPPER_TEST_ID)).toBeInTheDocument();
    });

    it('should render as a button if the custom security settings allow it even if the global is disabled', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Custom, assetViewerEnabled: true },
            privacySettings: { assetViewerEnabled: false, assetDownloadEnabled: true },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(ASSET_VIEWER_WRAPPER_TEST_ID)).toBeInTheDocument();
    });

    it('should not render as a button if the custom security settings disallow it even if the global is enabled', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Custom, assetViewerEnabled: false },
            privacySettings: { assetViewerEnabled: true, assetDownloadEnabled: true },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(ASSET_VIEWER_WRAPPER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should not render as a button if the global security settings disallow asset viewer', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Global },
            privacySettings: { assetViewerEnabled: false, assetDownloadEnabled: true },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(ASSET_VIEWER_WRAPPER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render as a button if the global security settings allow asset viewer', () => {
        renderImageBlock({
            editorState: false,
            blockSettings: { security: Security.Global },
            privacySettings: { assetViewerEnabled: true, assetDownloadEnabled: true },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(ASSET_VIEWER_WRAPPER_TEST_ID)).toBeInTheDocument();
    });

    it('should render the attachments dropdown there are attachments uploaded', () => {
        renderImageBlock({
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
                [ATTACHMENTS_ASSET_ID]: [AssetDummy.with(2)],
            },
            blockSettings: {
                [ATTACHMENTS_ASSET_ID]: [{ id: 2 }],
            },
        });
        expect(screen.getByTestId(ATTACHMENTS_FLYOUT_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should render the title if it is provided', async () => {
        renderImageBlock({
            blockSettings: {
                name: JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Test Name' }] }]),
            },
        });
        await waitFor(() => {
            expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveTextContent('Test Name');
        });
    });

    it('should render the description if it is provided', async () => {
        renderImageBlock({
            blockSettings: {
                description: JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Test Description' }] }]),
            },
        });
        await waitFor(() => {
            expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveTextContent('Test Description');
        });
    });

    it('should be a link if it is provided', () => {
        renderImageBlock({
            blockSettings: {
                hasLink: true,
                linkObject: { link: { link: 'https://frontify.com' } },
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        const link = screen.getByTestId(IMAGE_BLOCK_TEST_ID).querySelector('a');
        expect(link).not.toBeNull();
        expect(link!).toHaveAttribute('href', 'https://frontify.com');
    });

    it('should add border if provided', () => {
        renderImageBlock({
            blockSettings: {
                hasBorder: true,
                borderWidth: '1px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).toHaveStyle({
            border: '1px solid rgb(0, 0, 255)',
        });
    });

    it('should change layout according to provided positioning', () => {
        renderImageBlock({
            blockSettings: { positioning: CaptionPosition.Right },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        const classes = mapCaptionPositionClasses[CaptionPosition.Right].split(' ');
        expect(screen.getByTestId(IMAGE_BLOCK_TEST_ID)).toHaveClass(...classes);
    });

    it('should change width according to provided ratio', () => {
        renderImageBlock({
            blockSettings: {
                ratio: Ratio.Ratio1To2,
                positioning: CaptionPosition.Right,
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        const imageBlock = screen.getByTestId(IMAGE_BLOCK_TEST_ID);
        const firstChild = imageBlock.querySelector(':scope > div');
        expect(firstChild).not.toBeNull();
        const classes = imageRatioValues[Ratio.Ratio1To2].split(' ');
        expect(firstChild!).toHaveClass(...classes);
    });

    it('should apply image aspect ratio', () => {
        renderImageBlock({
            blockSettings: { hasCustomRatio: false, ratioChoice: '1:1' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toHaveStyle({ aspectRatio: '1 / 1' });
    });

    it('should apply object fit css style on image', () => {
        renderImageBlock({
            blockSettings: { autosizing: 'fill' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toHaveStyle({ objectFit: 'cover' });
    });

    it('should apply object position css style on image', () => {
        renderImageBlock({
            blockSettings: { alignment: 'center', horizontalAlignment: 'center' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(IMAGE_COMPONENT_TEST_ID)).toHaveStyle({ objectPosition: 'center center' });
    });

    it('should add background color if provided', () => {
        renderImageBlock({
            blockSettings: { hasBackground: true, backgroundColor: { r: 0, g: 0, b: 255 } },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).toHaveStyle({
            backgroundColor: 'rgb(0, 0, 255)',
        });
    });

    it('should add padding provided', () => {
        renderImageBlock({
            blockSettings: { hasCustomPadding: true, paddingCustom: '16px' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).toHaveStyle({ padding: '16px' });
    });

    it('should add padding to buttons when padding is added to image', () => {
        renderImageBlock({
            blockSettings: { hasCustomPadding: true, paddingCustom: '16px' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(BUTTONS_WRAPPER_TEST_ID)).toHaveStyle({
            paddingTop: '16px',
            paddingRight: '16px',
        });
    });

    it('should add padding to buttons when border is added to image', () => {
        renderImageBlock({
            blockSettings: { hasBorder: true, borderWidth: '12px' },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(BUTTONS_WRAPPER_TEST_ID)).toHaveStyle({
            paddingTop: '12px',
            paddingRight: '12px',
        });
    });

    it('should add padding to buttons when padding and border is added to image', () => {
        renderImageBlock({
            blockSettings: {
                hasBorder: true,
                borderWidth: '12px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
                hasCustomPadding: true,
                paddingCustom: '16px',
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(BUTTONS_WRAPPER_TEST_ID)).toHaveStyle({
            paddingTop: '28px',
            paddingRight: '28px',
        });
    });

    it('should add border radius to image container when there is background color set', () => {
        renderImageBlock({
            blockSettings: {
                backgroundColor: { red: 255, green: 0, blue: 0 },
                hasBackground: true,
                radiusChoice_cornerRadius: CornerRadius.Large,
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).toHaveStyle({ borderRadius: '12px' });
    });

    it('should add border radius to image container when ratio is none', () => {
        renderImageBlock({
            blockSettings: {
                hasBackground: false,
                ratioChoice: 'none',
                radiusChoice_cornerRadius: CornerRadius.Large,
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).toHaveStyle({ borderRadius: '12px' });
    });

    it('should not add border radius to image container when autosizing is fit and ratio is not none', () => {
        renderImageBlock({
            blockSettings: {
                hasBackground: false,
                radiusChoice_cornerRadius: CornerRadius.Large,
                autosizing: 'fit',
                ratioChoice: '1:2',
            },
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
        });
        expect(screen.getByTestId(DEFAULT_WRAPPER_TEST_ID)).not.toHaveStyle({ borderRadius: '12px' });
    });

    it('should render the alt text button in the block toolbar', async () => {
        renderImageBlock({
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
            editorState: true,
        });
        const flyoutButton = screen.getAllByTestId(TOOLBAR_FLYOUT_TEST_ID)[0];
        await userEvent.click(flyoutButton);
        expect(await screen.findByTestId(ALT_TEXT_INPUT_TEST_ID)).toBeInTheDocument();
    });

    it('should render the delete button in the block toolbar', async () => {
        const { appBridge } = renderImageBlock({
            blockAssets: { [IMAGE_ID]: [AssetDummy.with(1)] },
            editorState: true,
        });
        const deleteButton = screen.getByTestId(TOOLBAR_BUTTON_TEST_ID);
        await userEvent.click(deleteButton);
        await waitFor(() => {
            expect(appBridge.deleteAssetIdsFromBlockAssetKey.called).toBe(true);
        });
    });
});
