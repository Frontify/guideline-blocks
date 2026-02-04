/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';

import { CssValueDisplay } from './CssValueDisplay';

const CSS_VALUE_SELECTOR = '[data-test-id="css-value-display"]';
const COPY_BUTTON_SELECTOR = '[data-test-id="css-value-display-copy-button"]';

describe('CSS Value Display', () => {
    it('should render the css value', () => {
        mount(<CssValueDisplay cssValue="width:100%;" />);
        cy.get(CSS_VALUE_SELECTOR).should('exist');
    });

    it('should render the default placeholder of the css value', () => {
        mount(<CssValueDisplay cssValue="" />);
        cy.get(CSS_VALUE_SELECTOR).should('exist');
        cy.get(CSS_VALUE_SELECTOR).should('contain.text', 'No CSS value');
    });

    it('should render the custom placeholder of the css value', () => {
        const placeholder = 'Test placeholder';
        mount(<CssValueDisplay cssValue="" placeholder={placeholder} />);
        cy.get(CSS_VALUE_SELECTOR).should('exist');
        cy.get(CSS_VALUE_SELECTOR).should('contain.text', placeholder);
    });

    it('should change the value of the copy button after clicking on it', () => {
        mount(<CssValueDisplay cssValue="" />);
        cy.get(COPY_BUTTON_SELECTOR).click({ force: true });
        cy.get(COPY_BUTTON_SELECTOR).should('contain', 'Copied');
    });
});
