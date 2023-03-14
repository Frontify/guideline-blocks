/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetKitBlock } from './AssetKitBlock';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';

const BLOCK_SELECTOR = '[data-test-id="asset-kit-block"]';
const BLOCK_TITLE = '[data-test-id="block-title"]';
const BLOCK_DESCRIPTION = '[data-test-id="block-description"]';
const BLOCK_THUMBNAIL = '[data-test-id="block-thumbnail"]';
const BLOCK_REMOVE_THUMBNAIL = '[data-test-id="remove-thumbnail"]';
const THUMBNAIL_TOOLBAR = '[data-test-id="item-toolbar"]';

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
        cy.get(BLOCK_TITLE).should('not.exist');
        cy.get(BLOCK_DESCRIPTION).should('not.exist');
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

    it('should display a toolbar if asset is hovered', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().realHover();
        cy.get(THUMBNAIL_TOOLBAR).first().should('be.visible');
    });

    it('should display a toolbar if asset is focused', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_THUMBNAIL).first().focus();
        cy.get(THUMBNAIL_TOOLBAR).first().should('be.visible');
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
