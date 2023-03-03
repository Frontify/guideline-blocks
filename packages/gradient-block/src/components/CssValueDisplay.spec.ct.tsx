/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { CssValueDisplay } from './CssValueDisplay';

const CssValueSelector = '[data-test-id="gradient-css-snippet"]';
const CopyButtonSelector = '[data-test-id="gradient-css-copy-button"]';

describe('CssValueDisplay', () => {
    it('renders a css value display', () => {
        mount(<CssValueDisplay cssValue="linear-gradient(90deg, #000000 0%, #ffffff 100%)" />);
        cy.get(CssValueSelector).should('exist');
    });

    it('renders css value', () => {
        mount(<CssValueDisplay cssValue="linear-gradient(90deg, #000000 0%, #ffffff 100%)" />);
        cy.get(CssValueSelector).should('contain', 'linear-gradient(90deg, #000000 0%, #ffffff 100%)');
    });

    it('click on copy button text is copied', () => {
        mount(<CssValueDisplay cssValue="linear-gradient(90deg, #000000 0%, #ffffff 100%)" />);
        cy.get(CopyButtonSelector).click();
        cy.get(CopyButtonSelector).should('contain', 'Copied');
    });
});
