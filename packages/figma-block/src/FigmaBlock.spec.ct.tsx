/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import FigmaBlock from '.';
import { BlockPreview, BlockProps } from './types';

const MAIN_BLOCK_SELECTOR = '[data-test-id="figma-block"]';
const EMPTY_BLOCK_SELECTOR = '[data-test-id="figma-empty-block"]';
const IMAGE_PREVIEW_SELECTOR = '[data-test-id="figma-image-preview"]';
const LIVE_PREVIEW_SELECTOR = '[data-test-id="figma-live-preview"]';
const FULL_SCREEN_SELECTOR = '[data-test-id="figma-full-screen"]';

const blockSettings = {
    figmaPreviewId: 'image',
    project: 1,
    asset: 7,
};

describe('Figma Block', () => {
    it('renders a Figma block', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {});
        mount(<FigmaBlockWithStubs />);
        cy.get(MAIN_BLOCK_SELECTOR).should('exist');
    });

    it('renders a Figma empty block on edit', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, { editorState: true });
        mount(<FigmaBlockWithStubs />);
        cy.get(EMPTY_BLOCK_SELECTOR).should('exist');
    });

    it('triggers openAssetChooser mock', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs<BlockProps>(FigmaBlock, {
            editorState: true,
            openAssetChooser: cy.stub().as('onClickOpenAssetChooser'),
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(EMPTY_BLOCK_SELECTOR).click();
        cy.get('@onClickOpenAssetChooser').should('have.been.calledOnce');
    });

    it.skip('renders a Figma image preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
            blockSettings,
            editorState: true,
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(IMAGE_PREVIEW_SELECTOR).should('exist');
    });

    it.skip('renders a Figma Live iframe preview', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
            blockSettings: { figmaPreviewId: BlockPreview.Live },
            editorState: true,
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    });

    it.skip('toggles Figma Live preview Full screen', () => {
        const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
            blockSettings: { figmaPreviewId: BlockPreview.Live },
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
