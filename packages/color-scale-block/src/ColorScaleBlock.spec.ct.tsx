/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ColorScaleBlock } from './ColorScaleBlock';

const ColorScaleBlockSelector = '[data-test-id="example-block"]';

describe('Example Block', () => {
    it('renders an example block', () => {
        const [ExampleBlockWithStubs] = withAppBridgeStubs(ColorScaleBlock, {});

        mount(<ExampleBlockWithStubs />);
        cy.get(ColorScaleBlockSelector).should('exist');
    });
});
