/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ColorsBlock } from './ColorsBlock';

const ColorsBlockSelector = '[data-test-id="example-block"]';

describe('Colors Block', () => {
    it('renders the colors block', () => {
        const [ColorsBlockWithStubs] = withAppBridgeStubs(ColorsBlock, {});

        mount(<ColorsBlockWithStubs />);
        cy.get(ColorsBlockSelector).should('exist');
    });
});
