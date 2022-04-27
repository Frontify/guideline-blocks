/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import { ExampleAssetOperationBlock } from './ExampleAssetOperationBlock';

const ExampleAssetOperationBlockSelector = '[data-test-id="example-asset-operation-block"]';

describe('Example Asset Operation Block', () => {
    it('renders an example block', () => {
        const [ExampleAssetOperationBlockWithStubs] = withAppBridgeStubs(ExampleAssetOperationBlock, {});

        mount(<ExampleAssetOperationBlockWithStubs />);
        cy.get(ExampleAssetOperationBlockSelector).should('exist');
    });
});
