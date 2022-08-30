/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { ColorKitBlock } from './ColorKitBlock';

const ColorKitBlockSelector = '[data-test-id="color-kit-block"]';

describe('Color Kit block', () => {
    it('renders an Color Kit block', () => {
        const [ExampleBlockWithStubs] = withAppBridgeBlockStubs(ColorKitBlock);

        mount(<ExampleBlockWithStubs />);
        cy.get(ColorKitBlockSelector).should('exist');
    });
});
