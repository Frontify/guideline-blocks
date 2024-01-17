/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { FigmaBlock } from './FigmaBlock';
import { ASSET_ID } from './settings';
import { BlockPreview } from './types';

const MAIN_BLOCK_SELECTOR = '[data-test-id="figma-block"]';
const EMPTY_BLOCK_SELECTOR = '[data-test-id="figma-empty-block"]';
const IMAGE_PREVIEW_SELECTOR = '[data-test-id="figma-image-preview"]';
const LIVE_PREVIEW_SELECTOR = '[data-test-id="figma-live-preview"]';
const FULL_SCREEN_SELECTOR = '[data-test-id="figma-full-screen"]';

describe('Figma Block', () => {
    it('renders a Figma block', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock);
        mount(<FigmaBlockWithStubs />);
        cy.get(MAIN_BLOCK_SELECTOR).should('exist');
    });

    it('renders a Figma empty block on edit', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, { editorState: true });
        mount(<FigmaBlockWithStubs />);
        cy.get(EMPTY_BLOCK_SELECTOR).should('exist');
    });

    it('triggers openAssetChooser mock', () => {
        const [FigmaBlockWithStubs, appBridge] = withAppBridgeBlockStubs(FigmaBlock, { editorState: true });

        mount(<FigmaBlockWithStubs />);
        cy.get(EMPTY_BLOCK_SELECTOR).click();
        cy.wrap(appBridge.dispatch).should('have.been.calledWith', {
            name: 'openAssetChooser',
            payload: {
                selectedValueId: undefined,
                projectTypes: ['Workspace'],
                objectTypes: ['URL'],
                urlContains: 'https://www.figma',
            },
        });
    });

    it('renders a Figma image preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [AssetDummy.with(345)],
            },
            editorState: true,
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(IMAGE_PREVIEW_SELECTOR).should('exist');
    });

    it('renders a Figma Live iframe preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [AssetDummy.with(345)],
            },
            blockSettings: { figmaPreviewId: BlockPreview.Live },
            editorState: true,
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    });

    it('toggles Figma Live preview Full screen', () => {
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(FigmaBlock, {
            blockAssets: {
                [ASSET_ID]: [AssetDummy.with(345)],
            },
            blockSettings: { figmaPreviewId: BlockPreview.Live, allowFullScreen: true },
            editorState: true,
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
        cy.get(LIVE_PREVIEW_SELECTOR).find('button').click();
        cy.get(FULL_SCREEN_SELECTOR).should('exist');
        cy.get(FULL_SCREEN_SELECTOR).find('button').click({ force: true });
        cy.get(FULL_SCREEN_SELECTOR).should('not.exist');
        cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    });
});
