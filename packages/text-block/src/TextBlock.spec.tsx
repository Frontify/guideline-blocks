/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import TextBlock from '.';

const TextBlockSelector = '[data-test-id="text-block"]';

it('renders a text block', () => {
    const [TextBlockWithStubs] = withAppBridgeStubs(TextBlock, {});

    mount(<TextBlockWithStubs />);
    cy.get(TextBlockSelector).should('exist');
});
