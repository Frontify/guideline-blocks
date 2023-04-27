/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';

import { TooltipContent } from './TooltipContent';

const ColorKitTooltipContentSelector = '[data-test-id="tooltip-content"]';

const dummyColorName = 'Color Name';
const dummyColorValue = '27f006';

describe('TooltipContent', () => {
    beforeEach(() => {
        mount(<TooltipContent colorName={dummyColorName} colorValue={dummyColorValue} status="idle" />);
    });

    it('renders color hex', () => {
        cy.get(ColorKitTooltipContentSelector).should('exist');
        cy.get(ColorKitTooltipContentSelector).find('span').contains(dummyColorName);
        cy.get(ColorKitTooltipContentSelector).find('span').contains(`#${dummyColorValue}`);
    });
});
