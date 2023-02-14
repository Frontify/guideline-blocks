/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { GradientBlock } from './GradientBlock';

const GradientBlockSelector = '[data-test-id="gradient-block"]';

describe('Gradient Block', () => {
    it('renders a gradient block', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock);

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockSelector).should('exist');
    });
});
