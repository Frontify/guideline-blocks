/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';

import { TooltipContent } from './TooltipContent';

const ColorKitTooltipContentSelector = '[data-test-id="color-hash"]';
const ColorKitCopyButtonSelector = '[data-test-id="copy"]';

const dummyColorValue = '27f006';

describe('TooltipContent', () => {
    beforeEach(() => {
        mount(<TooltipContent color={dummyColorValue} />);
    });

    it('renders color hex', () => {
        cy.get(ColorKitTooltipContentSelector).should('exist');
        cy.get(ColorKitTooltipContentSelector).should('have.text', `#${dummyColorValue}`);
    });

    it('triggers copy button', () => {
        cy.get(ColorKitCopyButtonSelector)
            .invoke('text')
            .then((text) => {
                cy.get(ColorKitCopyButtonSelector).click();
                cy.get(ColorKitCopyButtonSelector).should('not.have.text', text);
            });
    });
});
