/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import DividerBlock from '.';

const DividerBlockSelector = '[data-test-id="divider-block"]';

it('renders a divider block', () => {
    const [DividerBlockWithStubs] = withAppBridgeStubs(DividerBlock, {});

    mount(<DividerBlockWithStubs />);
    cy.get(DividerBlockSelector).should('exist');
});
