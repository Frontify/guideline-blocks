/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ExampleBlock } from './ExampleBlock';

const ExampleBlockSelector = '[data-test-id="example-block"]';

describe('Example Block', () => {
    it('renders an example block', () => {
        const [ExampleBlockWithStubs] = withAppBridgeStubs(ExampleBlock, {});

        mount(<ExampleBlockWithStubs />);
        cy.get(ExampleBlockSelector).should('exist');
    });
});
