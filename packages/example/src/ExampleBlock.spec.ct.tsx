/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import ExampleBlock from '.';

const ExampleBlockSelector = '[data-test-id="example-block"]';

describe('Example Block', () => {
    it('renders an example block', () => {
        const [ExampleBlockWithStubs] = withAppBridgeStubs(ExampleBlock, {});

        mount(<ExampleBlockWithStubs />);
        cy.get(ExampleBlockSelector).should('exist');
    });
});
