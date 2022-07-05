/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlDirection, FormControlStyle, TextInput, Validation, validationClassMap } from '@frontify/fondue';
import { useMemo } from 'react';
import { object, string } from 'yup';
import { Form } from '../Form';
import { FormControllerWrap as FormControllerWrapComponent } from './ControllerWrap';
import { FormControllerWrapProps } from './types';

const TEXT_INPUT_ID = "[data-test-id='text-input']";
const LABEL_ID = "[data-test-id='input-label']";
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';

const TEST_INPUT = 'TEST';
const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_INPUT_ID = 'id';
const DEFAULT_NAME = 'controller';
const INVALID_VALUE = 'x';
const MIN_LENGTH_MESSAGE = 'Min length not reached';
const DEFAULT_SCHEMA = object({ [DEFAULT_NAME]: string().min(2, MIN_LENGTH_MESSAGE) });

const FormController = ({
    onFormUpdated = cy.stub(),
    name = DEFAULT_NAME,
    value = '',
    ...formControlProps
}: Partial<FormControllerWrapProps> & { onFormUpdated?: () => void; value?: string }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form initialValues={initialValues} onValidFieldChange={onFormUpdated} schema={DEFAULT_SCHEMA}>
            <FormControllerWrapComponent name={name} {...formControlProps}>
                {({ field }) => <TextInput value={field.value} onChange={field.onChange} id={TEST_INPUT_ID} />}
            </FormControllerWrapComponent>
        </Form>
    );
};

describe('FormControllerWrap', () => {
    it('renders without crashing', () => {
        mount(<FormController />);

        cy.get(TEXT_INPUT_ID).should('exist');
    });

    it('updates the form with correct value', () => {
        const onFormUpdatedStub = cy.stub();
        mount(<FormController onFormUpdated={onFormUpdatedStub} />);

        cy.get(TEXT_INPUT_ID).clear().type(TEST_INPUT);
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(TEST_INPUT);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('renders FormControl with correct attributes', () => {
        mount(
            <FormController
                style={FormControlStyle.Danger}
                label={{ children: TEST_LABEL, htmlFor: TEST_INPUT_ID }}
                helper={{ text: TEST_HELPER }}
                direction={FormControlDirection.Vertical}
                extra={TEST_EXTRA}
            />
        );

        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER);
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
        cy.get(TEXT_INPUT_ID).parent().should('have.class', validationClassMap[Validation.Error]);
    });

    it('overwrites helper with error message', () => {
        mount(<FormController style={FormControlStyle.Positive} helper={{ text: TEST_HELPER }} />);

        cy.get(TEXT_INPUT_ID).type(INVALID_VALUE);
        cy.get(HELPER_TEXT_ID).should('have.text', MIN_LENGTH_MESSAGE);
        cy.get(TEXT_INPUT_ID).parent().should('have.class', validationClassMap[Validation.Error]);
    });

    it('does not override helper with error message', () => {
        mount(<FormController style={FormControlStyle.Positive} helper={{ text: TEST_HELPER }} autoError={false} />);

        cy.get(TEXT_INPUT_ID).type(INVALID_VALUE);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER);
        cy.get(TEXT_INPUT_ID).parent().should('have.class', 'tw-border-green-50');
    });
});
