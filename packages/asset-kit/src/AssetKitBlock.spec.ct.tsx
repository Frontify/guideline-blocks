/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetKitBlock } from './AssetKitBlock';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';

const MAIN_BLOCK_SELECTOR = '[data-test-id="asset-kit-block"]';
const ASSET_KIT_BLOCK_TITLE = '[data-test-id="asset-kit-block-title"]';
const ASSET_KIT_BLOCK_DESCRIPTION = '[data-test-id="asset-kit-block-description"]';
const ASSET_KIT_DOWNLOAD_MESSAGE = '[data-test-id="asset-kit-download-message"]';
const ASSET_KIT_BLOCK_DOWNLOAD_BUTTON = '[data-test-id="asset-kit-block-download-button"]';
const ASSET_KIT_BLOCK_THUMBNAIL = '[data-test-id="asset-kit-block-thumbnail"]';
const ASSET_KIT_BLOCK_REMOVE_THUMBNAIL = '[data-test-id="asset-kit-block-remove-thumbnail"]';

describe('AssetKit Block', () => {
    it('renders a AssetKit block', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock);
        mount(<AssetKitBlockWithStubs />);
        cy.get(MAIN_BLOCK_SELECTOR).should('exist');
    });

    it('should hide the information section if no information is provided', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockSettings: {
                title: '',
                description: '',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ASSET_KIT_BLOCK_TITLE).should('not.exist');
        cy.get(ASSET_KIT_BLOCK_DESCRIPTION).should('not.exist');
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
        cy.get(ASSET_KIT_BLOCK_TITLE).should('exist');
        cy.get(ASSET_KIT_BLOCK_DESCRIPTION).should('exist');
    });

    it('should display the information message component when downloading and download the file', () => {
        cy.intercept('POST', '/api/project/*/bulk-download-token', {
            body: {
                data: { token: 'TEST_TOKEN' },
            },
        });
        cy.intercept('POST', '/api/bulk-download', {
            body: {
                data: { signature: 'TEST_SIGNATURE', download_url: 'http://TEST_URL' },
            },
        });
        cy.intercept('GET', '/api/bulk-download/*', {
            body: {
                data: { download_url: 'http://TEST_URL' },
            },
        });
        cy.window().then((win) => {
            cy.stub(win, 'open').as('Open');
        });

        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ASSET_KIT_BLOCK_DOWNLOAD_BUTTON).click();
        cy.get(ASSET_KIT_DOWNLOAD_MESSAGE).should('exist');
        cy.get('@Open').should('have.been.calledOnceWith', 'http://TEST_URL');
    });

    it('should display assets', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ASSET_KIT_BLOCK_THUMBNAIL).should('have.length', 2);
    });

    it('should remove assets correctly in edit mode', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
            editorState: true,
            blockAssets: {
                [ASSET_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2)],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ASSET_KIT_BLOCK_REMOVE_THUMBNAIL).first().find('[data-test-id="button"]').click({ force: true });
        cy.get(ASSET_KIT_BLOCK_THUMBNAIL).should('have.length', 1);
    });
});
