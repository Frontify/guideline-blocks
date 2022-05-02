/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { mount } from '@cypress/react';
// import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
// import FigmaBlock from '.';
// import { BlockPreview, BlockProps } from './types';

// const BLOCK_ID = 9345;

// const MAIN_BLOCK_SELECTOR = '[data-test-id="figma-block"]';
// const EMPTY_BLOCK_SELECTOR = '[data-test-id="figma-empty-block"]';
// const IMAGE_PREVIEW_SELECTOR = '[data-test-id="figma-image-preview"]';
// const LIVE_PREVIEW_SELECTOR = '[data-test-id="figma-live-preview"]';
// const FULL_SCREEN_SELECTOR = '[data-test-id="figma-full-screen"]';

// const blockSettings = {
//     figmaPreviewId: 'image',
//     project: 1,
//     asset: 7,
// };

describe.skip('Figma Block', () => {
    // it('renders a Figma block', () => {
    //     // cy.intercept('GET', '/api/document-block/9345/asset',headers: {'my-test': 'TEST'}, {
    //     //     success: true,
    //     //     data: {
    //     //         all_assets_count: 1,
    //     //         protected_assets_count: 1,
    //     //         requested_assets_count: 0,
    //     //     },
    //     // });
    //     cy.intercept(
    //         {
    //             method: 'GET',
    //             url: `/api/document-block/${BLOCK_ID}/asset`,
    //             // headers: {
    //             //     'x-csrf-token': 'content',
    //             //     'Content-Type': 'application/json',
    //             // },
    //         },
    //         {
    //             success: true,
    //             data: {
    //                 id: 1,
    //             },
    //         }
    //     ).as('fetchAllBlockAssetsByBlockId');
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {});
    //     mount(<FigmaBlockWithStubs />);
    //     cy.wait('@fetchAllBlockAssetsByBlockId');
    //     // cy.get(MAIN_BLOCK_SELECTOR).should('exist');
    // });
    // it('renders a Figma empty block on edit', () => {
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, { editorState: true });
    //     mount(<FigmaBlockWithStubs />);
    //     cy.get(EMPTY_BLOCK_SELECTOR).should('exist');
    // });
    // it('triggers openAssetChooser mock', () => {
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs<BlockProps>(FigmaBlock, {
    //         editorState: true,
    //     });
    //     const stubbedOnClickOpenAssetChooser = cy.stub().as('onClickOpenAssetChooser');
    //     mount(<FigmaBlockWithStubs onClickOpenAssetChooser={stubbedOnClickOpenAssetChooser} />);
    //     cy.get(EMPTY_BLOCK_SELECTOR).click();
    //     cy.get('@onClickOpenAssetChooser').should('have.been.calledOnce');
    // });
    // it('renders a Figma image preview', () => {
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
    //         blockSettings,
    //         editorState: true,
    //     });
    //     mount(<FigmaBlockWithStubs />);
    //     cy.get(IMAGE_PREVIEW_SELECTOR).should('exist');
    // });
    // it('renders a Figma Live iframe preview', () => {
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
    //         blockSettings: { ...blockSettings, figmaPreviewId: BlockPreview.Live },
    //         editorState: true,
    //     });
    //     mount(<FigmaBlockWithStubs />);
    //     cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    // });
    // it('toggles Figma Live preview Full screen', () => {
    //     const [FigmaBlockWithStubs] = withAppBridgeStubs(FigmaBlock, {
    //         blockSettings: { ...blockSettings, figmaPreviewId: BlockPreview.Live },
    //         editorState: true,
    //     });
    //     mount(<FigmaBlockWithStubs />);
    //     cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    //     cy.get(LIVE_PREVIEW_SELECTOR).find('button').click();
    //     cy.get(FULL_SCREEN_SELECTOR).should('exist');
    //     cy.get(FULL_SCREEN_SELECTOR).find('button').click({ force: true });
    //     cy.get(FULL_SCREEN_SELECTOR).should('not.exist');
    //     cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
    // });
});
