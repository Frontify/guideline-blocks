/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ColorBlock } from './ColorBlock';

const ColorBlockSelector = '[data-test-id="example-block"]';

describe('Color Block', () => {
    it('renders the color block', () => {
        const [ColorBlockWithStubs] = withAppBridgeStubs(ColorBlock, {});

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });
});
