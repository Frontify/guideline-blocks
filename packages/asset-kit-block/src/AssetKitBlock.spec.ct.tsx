/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, getAppBridgeBlockStub, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle } from '@frontify/guideline-blocks-settings';
import { mount } from 'cypress/react';
import { AssetKitBlock } from './AssetKitBlock';
import { ASSET_SETTINGS_ID } from './settings';

const BLOCK_SELECTOR = '[data-test-id="asset-kit-block"]';
const BLOCK_TITLE = '[data-test-id="block-title"]';
const BLOCK_TITLE_HTML = '[data-test-id="block-title-rte"]';
const BLOCK_DESCRIPTION = '[data-test-id="block-description"]';
const BLOCK_DESCRIPTION_HTML = '[data-test-id="block-description-rte"]';
const BLOCK_ITEM_WRAPPER = '[data-test-id="block-item-wrapper"]';
const BLOCK_THUMBNAIL = '[data-test-id="block-thumbnail"]';
const BLOCK_THUMBNAIL_IMAGE = '[data-test-id="block-thumbnail-image"]';
const BLOCK_ITEM_WRAPPER_TOOLBAR_BTN = '[data-test-id="block-item-wrapper-toolbar-btn"]';
const BLOCK_DOWNLOAD_BTN = '[data-test-id="asset-kit-block-download-button"]';
const BLOCK_DOWNLOAD_MESSAGE = '[data-test-id="asset-kit-download-message"]';
const BLOCK_DOWNLOAD_MESSAGE_PENDING = '[data-test-id="asset-kit-pending-message"]';
const BLOCK_DOWNLOAD_MESSAGE_ERROR = '[data-test-id="asset-kit-error-message"]';
const BLOCK_DOWNLOAD_MESSAGE_LOADING_CIRCLE =
    '[data-test-id="asset-kit-download-message"] [data-test-id="loading-circle"]';
const BLOCK_DOWNLOAD_ANNOUNCEMENT = '[data-test-id="asset-kit-block-screen-reader"]';
const BLOCK_ASSET_COUNT = '[data-test-id="asset-kit-count"]';

const BLACK: Color = { red: 0, green: 0, blue: 0, alpha: 1 };
const PINK: Color = { red: 255, green: 0, blue: 255, alpha: 1 };
const WHITE: Color = { red: 255, green: 255, blue: 255, alpha: 1 };

describe('AssetKit Block', () => {
    it('renders a AssetKit block', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock);
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('exist');
    });

    it('should hide the information section if no information is provided', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                title: '',
                description: '',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_TITLE_HTML).should('not.exist');
        cy.get(BLOCK_DESCRIPTION_HTML).should('not.exist');
    });

    it('should show the information section if in edit mode', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockSettings: {
                title: '',
                description: '',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_TITLE).should('exist');
        cy.get(BLOCK_DESCRIPTION).should('exist');
    });

    it('should display assets', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).should('have.length', 2);
    });

    it('should display assets with small width', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/width={width}' }],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL_IMAGE).should('have.attr', 'src', 'https://picsum.photos/width=218');
    });

    it('shoud not display thumbnails in view mode if showThumbnails is set to false', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                showThumbnails: false,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ITEM_WRAPPER).should('not.exist');
    });

    it('should display thumbnails in edit mode if showThumbnails is set to false', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockSettings: {
                showThumbnails: false,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ITEM_WRAPPER).should('have.length', 2);
    });

    it('should display asset count if enabled', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                showAssetCount: true,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ASSET_COUNT).should('include.text', '2 assets');
    });

    it('should not display asset count if disabled', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                showAssetCount: true,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ASSET_COUNT).should('not.exist');
    });

    it('should display asset count in custom color if enabled', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                showAssetCount: true,
                assetCountColor: 'override',
                countCustomColor: PINK,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ASSET_COUNT).should('have.css', 'color', 'rgb(255, 0, 255)');
    });

    it('should display no padding on block if no border and no background is set', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_blocks: false,
                hasBackgroundBlocks: false,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'padding', '0px');
    });

    it('should display with padding on block if border is set', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_blocks: true,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'padding', '32px');
    });

    it('should display with padding on block if background is set', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBackgroundBlocks: true,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'padding', '32px');
    });

    it('should display block with black background color', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBackgroundBlocks: true,
                backgroundColorBlocks: BLACK,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'background-color', 'rgb(0, 0, 0)');
    });

    it('should display block with border 1px dotted white with 10px radius', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_blocks: true,
                borderStyle_blocks: BorderStyle.Dotted,
                borderWidth_blocks: '1px',
                borderColor_blocks: WHITE,
                hasRadius_blocks: true,
                radiusValue_blocks: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'border', '1px dotted rgb(255, 255, 255)');
        cy.get(BLOCK_SELECTOR).should('have.css', 'border-radius', '10px');
    });

    it('should display block with borderRadius and 0px border', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_blocks: false,
                hasRadius_blocks: true,
                radiusValue_blocks: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).first().should('have.css', 'border-radius', '10px');
        cy.get(BLOCK_SELECTOR).first().should('have.css', 'border', '0px solid rgb(0, 0, 0)');
    });

    it('should display asset with black background color', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBackgroundThumbnails: true,
                backgroundColorThumbnails: BLACK,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL_IMAGE).first().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    });

    it('should display asset with border 1px dotted black with 10px radius', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_thumbnails: true,
                borderStyle_thumbnails: BorderStyle.Dotted,
                borderWidth_thumbnails: '1px',
                borderColor_thumbnails: WHITE,
                hasRadius_thumbnails: true,
                radiusValue_thumbnails: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL_IMAGE).first().should('have.css', 'border', '1px dotted rgb(255, 255, 255)');
        cy.get(BLOCK_THUMBNAIL_IMAGE).first().should('have.css', 'border-radius', '10px');
    });

    it('should display asset with borderRadius and 0px border', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_thumbnails: false,
                hasRadius_thumbnails: true,
                radiusValue_thumbnails: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL_IMAGE).first().should('have.css', 'border-radius', '10px');
        cy.get(BLOCK_THUMBNAIL_IMAGE).first().should('have.css', 'border', '0px solid rgb(0, 0, 0)');
    });

    it('should remove assets correctly in edit mode', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ITEM_WRAPPER).first().realHover();
        cy.get(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).first().click({ force: true });
        cy.get(BLOCK_ITEM_WRAPPER).should('have.length', 1);
    });

    it('should display a outline if asset is hover', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_ITEM_WRAPPER).first().realHover();
        cy.get(BLOCK_ITEM_WRAPPER).first().should('have.css', 'outline-style', 'solid');
    });

    it('should disable the button if no assets are set', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_DOWNLOAD_BTN).should('be.disabled');
    });

    it('should show the pending download message and the loading circle with block style border', () => {
        const appBridgeStub = getAppBridgeBlockStub({
            blockSettings: {
                hasBorder_blocks: true,
                borderStyle_blocks: BorderStyle.Dotted,
                borderWidth_blocks: '1px',
                borderColor_blocks: WHITE,
                hasRadius_blocks: true,
                radiusValue_blocks: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        appBridgeStub.getBulkDownloadByToken.onCall(0).resolves({ downloadUrl: '', signature: '' });
        mount(<AssetKitBlock appBridge={appBridgeStub} />);
        cy.get(BLOCK_DOWNLOAD_BTN).realClick();
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('be.visible');
        cy.get(BLOCK_DOWNLOAD_MESSAGE_PENDING).should('be.visible');
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('have.css', 'border', '1px dotted rgb(255, 255, 255)');
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('have.css', 'border-radius', '10px');
        cy.get(BLOCK_DOWNLOAD_MESSAGE_LOADING_CIRCLE).should('be.visible');
    });

    it('should show the error download with block style border', () => {
        const appBridgeStub = getAppBridgeBlockStub({
            blockSettings: {
                hasBorder_blocks: true,
                borderStyle_blocks: BorderStyle.Dotted,
                borderWidth_blocks: '1px',
                borderColor_blocks: WHITE,
                hasRadius_blocks: true,
                radiusValue_blocks: '10px',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        appBridgeStub.getBulkDownloadByToken.rejects(new Error('Something went wrong'));
        mount(<AssetKitBlock appBridge={appBridgeStub} />);
        cy.get(BLOCK_DOWNLOAD_BTN).realClick();
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('be.visible');
        cy.get(BLOCK_DOWNLOAD_MESSAGE_ERROR).should('be.visible');
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('have.css', 'border', '1px dotted rgb(255, 255, 255)');
        cy.get(BLOCK_DOWNLOAD_MESSAGE).should('have.css', 'border-radius', '10px');
    });

    it('should announce the download to screen readers if download happened', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                downloadUrlBlock: 'dummy-download-url',
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_DOWNLOAD_BTN).click();
        cy.get(BLOCK_DOWNLOAD_ANNOUNCEMENT).contains('downloaded');
    });
});
