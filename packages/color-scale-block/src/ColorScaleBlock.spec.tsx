/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import ColorScaleBlock from '.';

const ExampleBlockSelector = '[data-test-id="example-block"]';

it('renders an example block', () => {
    const [ExampleBlockWithStubs] = withAppBridgeStubs(ColorScaleBlock, {});

    mount(<ExampleBlockWithStubs />);
    cy.get(ExampleBlockSelector).should('exist');
});
