/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ColorBlock } from './ColorBlock';

const ColorsBlockSelector = '[data-test-id="example-block"]';

describe('Colors Block', () => {
    it('renders the colors block', () => {
        const [ColorsBlockWithStubs] = withAppBridgeStubs(ColorBlock, {});

        mount(<ColorsBlockWithStubs />);
        cy.get(ColorsBlockSelector).should('exist');
    });
});
