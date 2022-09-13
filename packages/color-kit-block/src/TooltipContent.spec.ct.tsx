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

    it('renders color hash', () => {
        cy.get(ColorKitTooltipContentSelector).should('exist');
        cy.get(ColorKitTooltipContentSelector).should('have.text', `#${dummyColorValue}`);
    });

    it('triggers copy button', () => {
        const copyButton = cy.get(ColorKitCopyButtonSelector);

        const spy = cy.spy(copyButton, 'click');

        expect(spy).to.be.called;
    });
});
