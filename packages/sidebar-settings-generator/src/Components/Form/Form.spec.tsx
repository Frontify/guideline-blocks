/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { Button, ButtonType } from '@frontify/fondue';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { object, string } from 'yup';
import { Form } from './Form';
import { FormTextarea } from './Textarea';
import { FormTextInput } from './TextInput';
import { FormProps } from './types';

const TEXT_INPUT_ID = '[data-test-id="text-input"]';
const TEXTAREA_ID = 'textarea';
const BUTTON_ID = '[data-test-id="button"]';

const INVALID_INPUT = 'x';
const TEST_TEXT_VALUE = 'test';
const TEST_TEXTAREA_VALUE = 'textarea';

const VALIDATION_SCHEMA = object({ name: string().min(2).required(), description: string().min(2).required() });

const BasicForm = <T extends FieldValues>({ ...formProps }: Partial<FormProps<T>>) => (
    <Form {...formProps}>
        <FormTextInput name="name" />
        <FormTextarea name="description" />
        <Button type={ButtonType.Submit}></Button>
    </Form>
);

const FormWithManualSubmit = <T extends FieldValues>({ ...formProps }: Partial<FormProps<T>>) => (
    <Form {...formProps}>
        {({ submitForm }) => (
            <>
                <FormTextInput name="name" />
                <FormTextarea name="description" />
                <Button onClick={submitForm}></Button>
            </>
        )}
    </Form>
);

const FormWithInitialValues = ({ resetOnInitialValueChange }: { resetOnInitialValueChange?: boolean }) => {
    const [initialValues, setInitialValues] = useState({ name: INVALID_INPUT, description: INVALID_INPUT });

    return (
        <>
            <BasicForm initialValues={initialValues} resetOnInitialValueChange={resetOnInitialValueChange} />
            <Button
                onClick={() => setInitialValues({ name: TEST_TEXT_VALUE, description: TEST_TEXTAREA_VALUE })}
            ></Button>
        </>
    );
};

const FormWithNodeChildren = <T extends FieldValues>({ ...formProps }: Partial<FormProps<T>>) => (
    <Form {...formProps}>
        <FormTextInput name="name" />
        <FormTextarea name="description" />
    </Form>
);

const FormWithUnmountedInput = <T extends FieldValues>({ ...formProps }: Partial<FormProps<T>>) => {
    const [showInput, setShowInput] = useState(true);

    return (
        <>
            <Form {...formProps}>
                {showInput && <FormTextInput name="name" />}
                <Button type={ButtonType.Submit}>Submit</Button>
            </Form>
            <Button onClick={() => setShowInput(false)}></Button>
        </>
    );
};

describe('Form', () => {
    it('renders without crashing', () => {
        mount(<BasicForm />);

        cy.get(TEXT_INPUT_ID).should('exist');
    });

    it('calls onSubmit via HTML type submit', () => {
        const onSubmitStub = cy.stub();
        mount(<BasicForm onSubmit={onSubmitStub} />);

        cy.get(TEXT_INPUT_ID).type(TEST_TEXT_VALUE);
        cy.get(TEXTAREA_ID).type(TEST_TEXTAREA_VALUE);
        cy.get(BUTTON_ID).click();
        cy.wrap(onSubmitStub)
            .should('have.been.calledOnce')
            .and(($stub) => {
                const [formValues] = $stub.args[0];
                const keys = Object.keys(formValues);

                expect(keys).to.have.length(2);
                expect(formValues['name']).to.equal(TEST_TEXT_VALUE);
                expect(formValues['description']).to.equal(TEST_TEXTAREA_VALUE);
            });
    });

    it('calls onSubmit programmatically', () => {
        const onSubmitStub = cy.stub();
        mount(<FormWithManualSubmit onSubmit={onSubmitStub} />);

        cy.get(TEXT_INPUT_ID).type(TEST_TEXT_VALUE);
        cy.get(TEXTAREA_ID).type(TEST_TEXTAREA_VALUE);
        cy.get(BUTTON_ID).click();
        cy.wrap(onSubmitStub)
            .should('have.been.calledOnce')
            .and(($stub) => {
                const [formValues] = $stub.args[0];
                const keys = Object.keys(formValues);

                expect(keys).to.have.length(2);
                expect(formValues['name']).to.equal(TEST_TEXT_VALUE);
                expect(formValues['description']).to.equal(TEST_TEXTAREA_VALUE);
            });
    });

    it('calls onValidFieldChange when input is valid', () => {
        const onValidFieldChangeStub = cy.stub();
        const onSubmitStub = cy.stub();
        mount(
            <BasicForm onValidFieldChange={onValidFieldChangeStub} onSubmit={onSubmitStub} schema={VALIDATION_SCHEMA} />
        );

        cy.get(TEXT_INPUT_ID).type(INVALID_INPUT);
        cy.get(TEXTAREA_ID).type(INVALID_INPUT);
        cy.wrap(onValidFieldChangeStub).should('not.have.been.called');
        cy.get(TEXT_INPUT_ID).clear().type(TEST_TEXT_VALUE);
        cy.get(TEXTAREA_ID).clear().type(TEST_TEXTAREA_VALUE);
        cy.wrap(onValidFieldChangeStub)
            .should('have.been.calledTwice')
            .and(($stub) => {
                const firstStubArgs = $stub.args[0];
                const secondStubArgs = $stub.args[1];

                expect(firstStubArgs[0]).to.equal('name');
                expect(firstStubArgs[1]).to.equal(TEST_TEXT_VALUE);
                expect(secondStubArgs[0]).to.equal('description');
                expect(secondStubArgs[1]).to.equal(TEST_TEXTAREA_VALUE);
            });
        cy.wrap(onSubmitStub).should('not.have.been.called');
    });

    it('resets Form when initialValues change', () => {
        mount(<FormWithInitialValues />);

        cy.get(TEXT_INPUT_ID).should('have.value', INVALID_INPUT);
        cy.get(TEXTAREA_ID).should('have.value', INVALID_INPUT);
        cy.get(BUTTON_ID).last().click();
        cy.get(TEXT_INPUT_ID).should('have.value', TEST_TEXT_VALUE);
        cy.get(TEXTAREA_ID).should('have.value', TEST_TEXTAREA_VALUE);
    });

    it('does not update Form when initialValues change', () => {
        mount(<FormWithInitialValues resetOnInitialValueChange={false} />);

        cy.get(TEXT_INPUT_ID).should('have.value', INVALID_INPUT);
        cy.get(TEXTAREA_ID).should('have.value', INVALID_INPUT);
        cy.get(BUTTON_ID).last().click();
        cy.get(TEXT_INPUT_ID).should('have.value', INVALID_INPUT);
        cy.get(TEXTAREA_ID).should('have.value', INVALID_INPUT);
    });

    it('allows simple rendering if no context is needed in immediate component', () => {
        mount(<FormWithNodeChildren />);

        cy.get(TEXT_INPUT_ID).should('exist');
        cy.get(TEXTAREA_ID).should('exist');
    });

    it('keeps values after they have been unmounted', () => {
        const onValidFieldChangeStub = cy.stub();
        const onSubmitStub = cy.stub();
        mount(
            <FormWithUnmountedInput
                onValidFieldChange={onValidFieldChangeStub}
                onSubmit={onSubmitStub}
                keepHiddenValues
            />
        );

        cy.get(TEXT_INPUT_ID).type(TEST_TEXT_VALUE);
        cy.get(BUTTON_ID).filter('[type=submit]').as('SubmitButton');
        cy.get('@SubmitButton').click();
        cy.wrap(onSubmitStub)
            .should('have.been.calledOnce')
            .and(($stub) => {
                const [form] = $stub.args[0];
                expect(form.name).to.equal(TEST_TEXT_VALUE);
            });
        cy.get(BUTTON_ID).filter('[type=button]').click();
        cy.get(TEXT_INPUT_ID).should('not.exist');
        cy.get('@SubmitButton').click();
        cy.wrap(onSubmitStub)
            .should('have.been.calledTwice')
            .and(($stub) => {
                const [form] = $stub.args[1];
                expect(form.name).to.equal(TEST_TEXT_VALUE);
            });
    });
});
