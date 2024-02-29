/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { ImageBlock } from './ImageBlock';
import { ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import {
    Alignment,
    CaptionPosition,
    Ratio,
    mapAlignmentClasses,
    mapCaptionPositionClasses,
    ratioValues,
} from './types';
import { Security } from '@frontify/guideline-blocks-settings';

const ImageBlockSelector = '[data-test-id="image-block"]';
const ImageBlockImageWrapperSelector = '[data-test-id="image-block-img-wrapper"]';
const ImageBlockAssetViewerButtonSelector = '[data-test-id="image-block-asset-viewer-button"]';
const ImageBlockImageSelector = '[data-test-id="image-block-img"]';
const ImageBlockCaption = '[data-test-id="image-caption"]';
const PlaceholderSelector = '[data-test-id="block-inject-button"]';
const DownloadSelector = '[data-test-id="download-button"]';
const AttachmentsSelector = '[data-test-id="attachments-flyout-button"]';
const ButtonsWrapper = '[data-test-id="buttons-wrapper"]';
const ToolbarButtonSelector = '[data-test-id="block-item-wrapper-toolbar-btn"]';
const TextInputSelector = '[data-test-id="text-input"]';
const ToolbarFlyoutSelector = '[data-test-id="block-item-wrapper-toolbar-flyout"]';

describe('Image Block', () => {
    it('renders an image block', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {});
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('exist');
    });

    it('should render a placeholder if in edit mode and there is no image uploaded yet', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, { editorState: true });
        mount(<ImageBlockWithStubs />);
        cy.get(PlaceholderSelector).should('exist');
    });

    it('should not render a placeholder if in view mode and there is no image uploaded yet', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {});
        mount(<ImageBlockWithStubs />);
        cy.get(PlaceholderSelector).should('not.exist');
    });

    it('should render the image if it is uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
    });

    it('should render the download button if the image is uploaded and security settings allows it', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                security: Security.Custom,
                downloadable: true,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(DownloadSelector).should('exist');
    });

    it('should not render the download button if the security settings disallow it', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                security: Security.Custom,
                downloadable: false,
            },
            blockAssets: {},
        });
        mount(<ImageBlockWithStubs />);
        cy.get(DownloadSelector).should('not.exist');
    });

    it('should render as a button if the custom security settings allow it even if the global is disabled', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            editorState: false,
            blockSettings: {
                security: Security.Custom,
                assetViewerEnabled: true,
            },
            privacySettings: {
                assetViewerEnabled: false,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
        cy.get(ImageBlockAssetViewerButtonSelector).should('exist');
    });

    it('should not render as a button if the custom security settings disallow it even if the global is enabled', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            editorState: false,
            blockSettings: {
                security: Security.Custom,
                assetViewerEnabled: false,
            },
            privacySettings: {
                assetViewerEnabled: true,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
        cy.get(ImageBlockAssetViewerButtonSelector).should('not.exist');
    });

    it('should not render as a button if the global security settings disallow asset viewer', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            editorState: false,
            blockSettings: {
                security: Security.Global,
            },
            privacySettings: {
                assetViewerEnabled: false,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
        cy.get(ImageBlockAssetViewerButtonSelector).should('not.exist');
    });

    it('should render as a button if the global security settings allow asset viewer', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            editorState: false,
            blockSettings: {
                security: Security.Global,
            },
            privacySettings: {
                assetViewerEnabled: true,
                assetDownloadEnabled: true,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
        cy.get(ImageBlockAssetViewerButtonSelector).should('exist');
    });

    it('should render the attachments dropdown there are attachments uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
                [ATTACHMENTS_ASSET_ID]: [AssetDummy.with(2)],
            },
            blockSettings: {
                [ATTACHMENTS_ASSET_ID]: [{ id: 2 }],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(AttachmentsSelector).should('exist');
    });

    it('should render the title if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                name: JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Test Name' }] }]),
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockCaption).should('contain.text', 'Test Name');
    });

    it('should render the description if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                description: JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Test Description' }] }]),
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockCaption).should('contain.text', 'Test Description');
    });

    it('should be a link if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasLink: true,
                linkObject: {
                    link: { link: 'https://frontify.com' },
                },
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).get('a').should('have.attr', 'href', 'https://frontify.com');
    });

    it('should add border if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBorder: true,
                borderWidth: '1px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'border', '1px solid rgb(0, 0, 255)');
    });

    it('should change layout according to provided positioning', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                positioning: CaptionPosition.Right,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('have.class', mapCaptionPositionClasses[CaptionPosition.Right]);
    });

    it('should change width according to provided ratio', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                ratio: Ratio.Ratio1To2,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(`${ImageBlockSelector}>div`).should('have.class', ratioValues[Ratio.Ratio1To2]);
    });

    it('should add background color if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBackground: true,
                backgroundColor: { r: 0, g: 0, b: 255 },
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'backgroundColor', 'rgb(0, 0, 255)');
    });

    it('should add padding provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasCustomPadding: true,
                paddingCustom: '16px',
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'padding', '16px');
    });

    it('should add alignment of the image if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                alignment: Alignment.Right,
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.class', mapAlignmentClasses[Alignment.Right]);
    });

    it('should add padding to buttons when padding is added to image', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasCustomPadding: true,
                paddingCustom: '16px',
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ButtonsWrapper).should('have.css', 'padding-top', '16px').and('have.css', 'padding-right', '16px');
    });

    it('should add padding to buttons when border is added to image', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBorder: true,
                borderWidth: '12px',
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ButtonsWrapper).should('have.css', 'padding-top', '12px').and('have.css', 'padding-right', '12px');
    });

    it('should add padding to buttons when padding and border is added to image', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBorder: true,
                borderWidth: '12px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
                hasCustomPadding: true,
                paddingCustom: '16px',
            },
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ButtonsWrapper).should('have.css', 'padding-top', '28px').and('have.css', 'padding-right', '28px');
    });

    it('should render the alt text button in the block toolbar', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
            editorState: true,
        });
        mount(
            <div className="tw-p-20">
                <ImageBlockWithStubs />
            </div>
        );
        cy.get(ToolbarFlyoutSelector).first().focus();
        cy.get(ToolbarFlyoutSelector).first().should('be.visible').click();
        cy.get(TextInputSelector).should('be.visible');
    });

    it('should render the delete button in the block toolbar', () => {
        const [ImageBlockWithStubs, appBridge] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_ID]: [AssetDummy.with(1)],
            },
            editorState: true,
        });
        mount(
            <div className="tw-p-10">
                <ImageBlockWithStubs />
            </div>
        );
        cy.get(ToolbarButtonSelector).focus();
        cy.get(ToolbarButtonSelector).should('be.visible').click();
        cy.wrap(appBridge.deleteAssetIdsFromBlockAssetKey).should('have.been.called');
    });
});
