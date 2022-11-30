/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { CheckboxLabelProps } from '../types';
import { CheckboxLabel } from './CheckboxLabel';

const CHECKBOX_LABEL = '[data-test-id="checkbox-label"]';
const CHECKBOX_DATE = '[data-test-id="checkbox-date"]';

const DefaultCheckboxLabel = (props: Partial<CheckboxLabelProps>) => {
    const defaults = { htmlFor: 'test', disabled: false, dateInMs: 0, children: 'Label', designTokens: {} };
    const checkboxLabelProps = { ...defaults, ...props };

    return <CheckboxLabel {...checkboxLabelProps} />;
};

describe('Checkbox Label', () => {
    it('renders a checkbox label', () => {
        mount(<DefaultCheckboxLabel />);
        cy.get(CHECKBOX_LABEL).should('exist');
    });

    it('renders the date in a readable style', () => {
        mount(<DefaultCheckboxLabel dateInMs={Date.now()} />);
        cy.get(CHECKBOX_DATE).should('have.text', 'a few seconds ago');
    });
});
