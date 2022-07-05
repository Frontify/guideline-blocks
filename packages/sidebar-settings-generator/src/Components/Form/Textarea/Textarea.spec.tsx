/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlStyle, IconIcon, Validation, validationClassMap } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormTextarea as FormTextareaComponent } from './Textarea';
import { FormTextareaProps } from './types';

const TEXTAREA_ID = 'textarea';
const LABEL_ID = "[data-test-id='input-label']";
const DECORATOR_ID = '[data-test-id=decorator]';
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_INPUT = 'TEST';
const TEST_ID = 'ID';
const DEFAULT_NAME = 'textarea';
const TRANSFORMER_VALUE = ['1', '2', '3'];

const FormTextarea = ({
    onFormUpdated = cy.stub(),
    value = '',
    name = DEFAULT_NAME,
    ...props
}: Partial<FormTextareaProps> & { value?: string | string[]; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormTextareaComponent name={name} {...props} />
        </Form>
    );
};

describe('FormTextarea', () => {
    it('renders without crashing', () => {
        mount(<FormTextarea />);

        cy.get(TEXTAREA_ID).should('exist');
    });

    it('updates form when input is changed and calls onInput', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormTextarea onFormUpdated={onFormUpdatedStub} />);

        cy.get(TEXTAREA_ID).focus().type(TEST_INPUT);
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(TEST_INPUT);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('blurs the input and calls onBlur', () => {
        const onBlurStub = cy.stub();
        mount(<FormTextarea onBlur={onBlurStub} />);

        cy.get(TEXTAREA_ID).focus().type(`${TEST_INPUT}`).blur();
        cy.wrap(onBlurStub).should('have.been.calledOnce');
    });

    it('applies validation style to input', () => {
        mount(<FormTextarea style={FormControlStyle.Danger} />);

        cy.get(TEXTAREA_ID).should('have.class', validationClassMap[Validation.Error]);
    });

    it('disables the input', () => {
        mount(<FormTextarea disabled={true} />);

        cy.get(TEXTAREA_ID).should('be.disabled');
    });

    it('applies the same id to input and label', () => {
        mount(<FormTextarea id={TEST_ID} label={{ children: 'label' }} />);

        cy.get(LABEL_ID).should('have.attr', 'for', TEST_ID);
        cy.get(TEXTAREA_ID).should('have.id', TEST_ID);
    });

    it('forwards necessary props to input', () => {
        mount(<FormTextarea placeholder={TEST_INPUT} decorator={<IconIcon />} required={true} />);

        cy.get(TEXTAREA_ID).should('have.attr', 'required', 'required');
        cy.get(TEXTAREA_ID).should('have.attr', 'placeholder', TEST_INPUT);
        cy.get(DECORATOR_ID).should('be.visible');
    });

    it('forwards necessary properties to form controller', () => {
        mount(
            <FormTextarea
                label={{ children: TEST_LABEL }}
                helper={{ text: TEST_HELPER }}
                extra={TEST_EXTRA}
                style={FormControlStyle.Danger}
            />
        );

        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormTextarea
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                transformers={{ in: (value) => value.join(','), out: (value) => value?.split(',') }}
            />
        );
        cy.get(TEXTAREA_ID).should('have.value', TRANSFORMER_VALUE.join(','));
        cy.get(TEXTAREA_ID).type(',4');
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).should(($stub) => {
            const value = $stub.args[0][1];
            expect(value).to.have.length(4);
            expect(value[3]).to.equal('4');
        });
    });
});
