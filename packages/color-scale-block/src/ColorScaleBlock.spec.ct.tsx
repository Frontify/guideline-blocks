/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ColorScaleBlock } from './ColorScaleBlock';

const ExampleBlockSelector = '[data-test-id="example-block"]';

describe('Color Scale Block Block', () => {
    it('renders an example block', () => {
        const [ExampleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock);

        mount(<ExampleBlockWithStubs />);
        cy.get(ExampleBlockSelector).should('exist');
    });
});
