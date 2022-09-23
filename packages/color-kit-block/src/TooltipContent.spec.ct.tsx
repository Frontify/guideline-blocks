/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { TooltipContent } from './TooltipContent';

const ColorKitTooltipContentSelector = '[data-test-id="color-hash"]';

const dummyColorValue = '27f006';

describe('TooltipContent', () => {
    beforeEach(() => {
        mount(<TooltipContent colorValue={dummyColorValue} status="idle" />);
    });

    it('renders color hex', () => {
        cy.get(ColorKitTooltipContentSelector).should('exist');
        cy.get(ColorKitTooltipContentSelector).should('have.text', `#${dummyColorValue}`);
    });
});
