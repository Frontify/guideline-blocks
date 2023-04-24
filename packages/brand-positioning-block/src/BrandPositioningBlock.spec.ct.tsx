/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { BrandPositioningBlock } from './BrandPositioningBlock';

const BrandPositioningBlockSelector = '[data-test-id="brand-positioning-block"]';

describe('Brand Positioning Block', () => {
    it('renders brand positioning block', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock);

        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningBlockSelector).should('exist');
    });
});
