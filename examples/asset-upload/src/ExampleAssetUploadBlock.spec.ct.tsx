/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ExampleAssetUploadBlock } from './ExampleAssetUploadBlock';

const ExampleAssetOperationBlockSelector = '[data-test-id="example-asset-operation-block"]';

describe('Example Asset Upload Block', () => {
    it('renders an example block', () => {
        const [ExampleAssetUploadBlockWithStubs] = withAppBridgeStubs(ExampleAssetUploadBlock, {});

        mount(<ExampleAssetUploadBlockWithStubs />);
        cy.get(ExampleAssetOperationBlockSelector).should('exist');
    });
});
