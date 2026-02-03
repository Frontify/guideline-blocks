/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';

import { ExampleAssetUploadBlock } from './ExampleAssetUploadBlock';
import { IMAGE_SETTING_ID } from './settings';

const EXAMPLE_ASSET_UPLOAD_BLOCK_SELECTOR = '[data-test-id="example-asset-upload-block"]';
const EXAMPLE_ASSET_UPLOAD_IMAGE_SELECTOR = '[data-test-id="example-asset-upload-image"]';

const ASSET_ID = 94593;

describe('Example Asset Upload Block', () => {
    it('renders an example block', () => {
        const [ExampleAssetUploadBlockWithStubs] = withAppBridgeBlockStubs(ExampleAssetUploadBlock);

        mount(<ExampleAssetUploadBlockWithStubs />);
        cy.get(EXAMPLE_ASSET_UPLOAD_BLOCK_SELECTOR).should('exist');
    });

    it('renders an image', () => {
        const asset = AssetDummy.with(ASSET_ID);
        const [FigmaBlockWithStubs] = withAppBridgeBlockStubs(ExampleAssetUploadBlock, {
            blockAssets: {
                [IMAGE_SETTING_ID]: [asset],
            },
        });
        mount(<FigmaBlockWithStubs />);
        cy.get(EXAMPLE_ASSET_UPLOAD_IMAGE_SELECTOR).should('exist');
        cy.get(EXAMPLE_ASSET_UPLOAD_IMAGE_SELECTOR).should('have.attr', 'src', asset.previewUrl);
    });
});
