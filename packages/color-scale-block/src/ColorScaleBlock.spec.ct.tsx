/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { ColorScaleBlock } from './ColorScaleBlock';

const ColorScaleBlockSelector = '[data-test-id="example-block"]';

describe('Color Scale Block', () => {
    it('renders an example block', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeStubs(ColorScaleBlock, {});

        mount(<ColorScaleBlockWithStubs />);
        cy.get(ColorScaleBlockSelector).should('exist');
    });
});
