/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { CheckboxState, FormControlStyle } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormCheckbox as FormCheckboxComponent } from './Checkbox';
import { FormCheckboxProps } from './types';

const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const LABEL_ID = "[data-test-id='input-label']";
const TOOLTIP_ICON_TRIGGER_ID = '[data-test-id=tooltip-icon-trigger]';
const TOOLTIP_ID = '[data-test-id=tooltip]';
const INPUT_LABEL_REQUIRED_ID = '[data-test-id=input-label-required]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_VALUE = 'VALUE';
const TEST_TOOLTIP = 'TOOLTIP';
const TEST_NOTE = 'NOTE';
const DEFAULT_NAME = 'checkbox';

const TRANSFORMER_VALUE = true;

const FormCheckbox = ({
    onFormUpdated = cy.stub(),
    value = CheckboxState.Unchecked,
    name = DEFAULT_NAME,
    ...props
}: Partial<Omit<FormCheckboxProps, 'value'>> & { value?: string | boolean; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormCheckboxComponent name={name} value={TEST_VALUE} {...props} />
        </Form>
    );
};

describe('FormCheckbox', () => {
    it('renders without crashing', () => {
        mount(<FormCheckbox />);

        cy.get(CHECKBOX_ID).should('exist');
    });

    it('updates form when checkbox state is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormCheckbox onFormUpdated={onFormUpdatedStub} />);

        cy.get(CHECKBOX_INPUT_ID).check({ force: true });
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(key).to.eq(DEFAULT_NAME);
            expect(value).to.equal(CheckboxState.Checked);
        });
    });

    it('displays current form state', () => {
        mount(<FormCheckbox value={CheckboxState.Mixed} />);

        cy.get(CHECKBOX_INPUT_ID).should('have.attr', 'aria-checked', 'mixed');
    });

    it('disables the checkbox', () => {
        mount(<FormCheckbox disabled={true} />);

        cy.get(CHECKBOX_INPUT_ID).should('be.disabled');
    });

    it('forwards necessary props to checkbox', () => {
        mount(
            <FormCheckbox
                ariaLabel={TEST_LABEL}
                label={TEST_LABEL}
                tooltip={{ content: TEST_TOOLTIP }}
                required={true}
                note={TEST_NOTE}
            />
        );

        cy.get(CHECKBOX_INPUT_ID).should('have.attr', 'aria-label', TEST_LABEL);
        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get('body').realClick();
        cy.get(TOOLTIP_ICON_TRIGGER_ID).realHover({ position: 'top' });
        cy.get(TOOLTIP_ID).should('have.text', TEST_TOOLTIP);
        cy.get(INPUT_LABEL_REQUIRED_ID).should('be.visible').and('contain', '*');
        cy.get(CHECKBOX_ID).children().should('have.length', 2).last().should('have.text', TEST_NOTE);
    });

    it('forwards correct properties to form controller', () => {
        mount(<FormCheckbox style={FormControlStyle.Danger} helper={{ text: TEST_HELPER }} extra={TEST_EXTRA} />);

        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormCheckbox
                onFormUpdated={onFormUpdatedStub}
                value={TRANSFORMER_VALUE}
                label={TEST_LABEL}
                transformers={{
                    in: (input) => (input ? CheckboxState.Checked : CheckboxState.Unchecked),
                    out: (output) => output === CheckboxState.Checked,
                }}
            />
        );

        cy.get(CHECKBOX_INPUT_ID).should('be.checked');
        cy.get(LABEL_ID).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const value = stub.args[0][1];
            expect(value).to.be.false;
        });
    });
});
