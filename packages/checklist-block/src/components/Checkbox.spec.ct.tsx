/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { CheckboxProps } from '../types';
import { Checkbox } from './Checkbox';

const CHECKBOX_DISPLAY = '[data-test-id="checkbox"]';
const CHECKBOX_LABEL = '[data-test-id="checkbox-label"]';

const DefaultCheckbox = (props: Partial<CheckboxProps>) => {
    const defaults = {
        id: 'id',
        showLabel: true,
        label: 'label',
        checked: false,
        onChange: cy.stub(),
        designTokens: {},
    };
    const checkboxProps = { ...defaults, ...props };

    return <Checkbox {...checkboxProps} />;
};

describe('Checkbox', () => {
    it('renders a checkbox', () => {
        mount(<DefaultCheckbox />);
        cy.get(CHECKBOX_DISPLAY).should('exist');
    });

    it('Should trigger onChange when clicked ', () => {
        const stubbedOnChange = cy.stub().as('onChange');
        mount(<DefaultCheckbox onChange={stubbedOnChange} />);
        cy.get(CHECKBOX_DISPLAY).click({ force: true });
        cy.get('@onChange').should('have.been.calledOnce');
        cy.get(CHECKBOX_LABEL).click();
        cy.get('@onChange').should('have.been.calledTwice');
    });

    it('Should hide label if showLabel is false', () => {
        mount(<DefaultCheckbox showLabel={false} />);
        cy.get(CHECKBOX_LABEL).should('have.length', 0);
    });

    it('Should display checked icon if checked', () => {
        mount(<DefaultCheckbox checked={true} />);
        cy.get(CHECKBOX_DISPLAY).children().should('have.length', 1);
    });
});
