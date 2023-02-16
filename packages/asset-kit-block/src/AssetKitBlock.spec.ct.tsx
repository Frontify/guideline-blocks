/* (c) Copyright Frontify Ltd., all rights reserved. */

// /* (c) Copyright Frontify Ltd., all rights reserved. */
//
import { mount } from 'cypress/react';
// import { BlockProps } from '@frontify/guideline-blocks-settings';
// import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { AssetKitBlock } from './AssetKitBlock';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
// import { ASSET_ID } from './settings';
// import { BlockPreview } from './types';
//
const MAIN_BLOCK_SELECTOR = '[data-test-id="asset-kit-block"]';
// const EMPTY_BLOCK_SELECTOR = '[data-test-id="asset-kit-empty-block"]';
// const IMAGE_PREVIEW_SELECTOR = '[data-test-id="asset-kit-image-preview"]';
// const LIVE_PREVIEW_SELECTOR = '[data-test-id="asset-kit-live-preview"]';
// const FULL_SCREEN_SELECTOR = '[data-test-id="asset-kit-full-screen"]';
//
describe('AssetKit Block', () => {
    it('renders a AssetKit block', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock);
        mount(<AssetKitBlockWithStubs />);
        cy.get(MAIN_BLOCK_SELECTOR).should('exist');
    });
});
//
//     it('renders a AssetKit empty block on edit', () => {
//         const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, { editorState: true });
//         mount(<AssetKitBlockWithStubs />);
//         cy.get(EMPTY_BLOCK_SELECTOR).should('exist');
//     });
//
//     it('triggers openAssetChooser mock', () => {
//         const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs<BlockProps>(AssetKitBlock, {
//             editorState: true,
//             openAssetChooser: cy.stub().as('onClickOpenAssetChooser'),
//         });
//         mount(<AssetKitBlockWithStubs />);
//         cy.get(EMPTY_BLOCK_SELECTOR).click();
//         cy.get('@onClickOpenAssetChooser').should('have.been.calledOnce');
//     });
//
//     it('renders a AssetKit image preview', () => {
//         const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
//             blockAssets: {
//                 [ASSET_ID]: [AssetDummy.with(345)],
//             },
//             editorState: true,
//         });
//         mount(<AssetKitBlockWithStubs />);
//         cy.get(IMAGE_PREVIEW_SELECTOR).should('exist');
//     });
//
//     it('renders a AssetKit Live iframe preview', () => {
//         const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
//             blockAssets: {
//                 [ASSET_ID]: [AssetDummy.with(345)],
//             },
//             blockSettings: { assetKitPreviewId: BlockPreview.Live },
//             editorState: true,
//         });
//         mount(<AssetKitBlockWithStubs />);
//         cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
//     });
//
//     it('toggles AssetKit Live preview Full screen', () => {
//         const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AssetKitBlock, {
//             blockAssets: {
//                 [ASSET_ID]: [AssetDummy.with(345)],
//             },
//             blockSettings: { assetKitPreviewId: BlockPreview.Live, allowFullScreen: true },
//             editorState: true,
//         });
//         mount(<AssetKitBlockWithStubs />);
//         cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
//         cy.get(LIVE_PREVIEW_SELECTOR).find('button').click();
//         cy.get(FULL_SCREEN_SELECTOR).should('exist');
//         cy.get(FULL_SCREEN_SELECTOR).find('button').click({ force: true });
//         cy.get(FULL_SCREEN_SELECTOR).should('not.exist');
//         cy.get(LIVE_PREVIEW_SELECTOR).should('exist');
//     });
// });
