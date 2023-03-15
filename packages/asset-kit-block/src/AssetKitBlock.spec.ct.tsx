/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetKitBlock } from './AssetKitBlock';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { ASSET_SETTINGS_ID } from './settings';
import { BorderStyle } from '@frontify/guideline-blocks-shared';

const BLOCK_SELECTOR = '[data-test-id="asset-kit-block"]';
const BLOCK_TITLE = '[data-test-id="block-title"]';
const BLOCK_TITLE_HTML = '[data-test-id="block-title-rte"]';
const BLOCK_DESCRIPTION = '[data-test-id="block-description"]';
const BLOCK_DESCRIPTION_HTML = '[data-test-id="block-description-rte"]';
const BLOCK_THUMBNAIL = '[data-test-id="block-thumbnail"]';
const BLOCK_THUMBNAIL_IMAGE = '[data-test-id="block-thumbnail-image"]';
const BLOCK_REMOVE_THUMBNAIL = '[data-test-id="remove-thumbnail"]';

const BLACK: Color = { red: 0, green: 0, blue: 0, alpha: 1 };
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

    it('should display no padding on block if no border and no background is setted', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBorder_blocks: false,
                hasBackground_blocks: false,
            },
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'padding', '0px');
    });

    it('should display with padding on block if border is setted', () => {
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

    it('should display with padding on block if background is setted', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBackground_blocks: true,
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
                hasBackground_blocks: true,
                backgroundColor_blocks: BLACK,
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

    it('should display asset with black background color', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                hasBackground_thumbnails: true,
                backgroundColor_thumbnails: BLACK,
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

    it('should remove assets correctly in edit mode', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().realHover();
        cy.get(BLOCK_REMOVE_THUMBNAIL).first().click({ force: true });
        cy.get(BLOCK_THUMBNAIL).should('have.length', 1);
    });

    it('should display a outline if asset is hover', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().realHover();
        cy.get(BLOCK_THUMBNAIL).first().should('have.css', 'outline-style', 'solid');
    });

    it('should display a outline if asset is focused', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().focus();
        cy.get(BLOCK_THUMBNAIL).first().should('have.css', 'outline-style', 'solid');
    });

    it('should remove focused asset if backspace is pressed', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().focus();
        cy.get('body').realPress('Backspace');
        cy.get(BLOCK_THUMBNAIL).should('have.length', 1);
    });

    it('should remove focused asset if backspace is pressed', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2), AssetDummy.with(3)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().focus();
        cy.get('body').realPress('Delete');
        cy.get(BLOCK_THUMBNAIL).should('have.length', 2);
    });
});
