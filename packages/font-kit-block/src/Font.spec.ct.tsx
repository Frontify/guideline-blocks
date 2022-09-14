/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { Font } from './Font';

const FontKitBlockFontSelector = '[data-test-id="font"]';

describe('Font', () => {
    it('renders', () => {
        const [FontKitBlockWithStubs] = withAppBridgeBlockStubs(Font);

        mount(<FontKitBlockWithStubs />);
        cy.get(FontKitBlockFontSelector).should('exist');
    });
});
