/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { GlyphsBlock } from './GlyphsBlock';

const GlyphsBlockSelector = '[data-test-id="glyphs-block"]';

describe('Glyphs Block', () => {
    it('renders a glyphs block', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {});

        mount(<GlyphsBlockWithStubs />);
        cy.get(GlyphsBlockSelector).should('exist');
    });
});
