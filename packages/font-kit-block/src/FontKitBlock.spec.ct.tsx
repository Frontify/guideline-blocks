/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { FontKitBlock } from './FontKitBlock';

const FontKitBlockSelector = '[data-test-id="example-block"]';

describe('Font Kit Block', () => {
    it('renders', () => {
        const [FontKitBlockWithStubs] = withAppBridgeBlockStubs(FontKitBlock);

        mount(<FontKitBlockWithStubs />);
        cy.get(FontKitBlockSelector).should('exist');
    });
});
