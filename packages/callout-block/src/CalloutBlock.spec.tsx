/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import CalloutBlock from '.';

const CalloutBlockSelector = '[data-test-id="callout-block"]';

it.skip('renders a callout block', () => {
    const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {});

    mount(<CalloutBlockWithStubs />);
    cy.get(CalloutBlockSelector).should('exist');
});
