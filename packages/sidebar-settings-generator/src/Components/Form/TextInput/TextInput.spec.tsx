/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlStyle, IconIcon, TextInputType, Validation, validationClassMap } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormTextInput as FormTextInputComponent } from './TextInput';
import { FormTextInputProps } from './types';

const TEXT_INPUT_ID = "[data-test-id='text-input']";
const CLEAR_ICON_ID = '[data-test-id=clear-icon]';
const LABEL_ID = "[data-test-id='input-label']";
const COPY_ICON_ID = '[data-test-id=copy-icon]';
const DECORATOR_ID = '[data-test-id=decorator]';
const VISIBILITY_ICON_ID = '[data-test-id=visibility-icon]';
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_INPUT = 'TEST';
const TEST_ID = 'ID';
const DEFAULT_NAME = 'input';
const TRANSFORMER_VALUE = ['1', '2', '3'];

const FormTextInput = ({
    onFormUpdated = cy.stub(),
    value = '',
    name = DEFAULT_NAME,
    ...props
}: Partial<FormTextInputProps> & { value?: string | string[]; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormTextInputComponent name={name} {...props} />
        </Form>
    );
};

describe('FormTextInput', () => {
    it('renders without crashing', () => {
        mount(<FormTextInput />);

        cy.get(TEXT_INPUT_ID).should('exist');
    });

    it('updates form when input is changed and calls onChange', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormTextInput onFormUpdated={onFormUpdatedStub} />);

        cy.get(TEXT_INPUT_ID).focus().type(TEST_INPUT);
        cy.wrap(onFormUpdatedStub).should('have.been.called');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(TEST_INPUT);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('updates form when input cleared and calls onClear', () => {
        const onFormUpdatedStub = cy.stub();
        mount(<FormTextInput onFormUpdated={onFormUpdatedStub} clearable={true} />);

        cy.get(TEXT_INPUT_ID).focus().type(`${TEST_INPUT}`);
        cy.get(CLEAR_ICON_ID).click();
        cy.wrap(onFormUpdatedStub).should('have.been.called');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq('');
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('blurs the input and calls onBlur', () => {
        const onBlurStub = cy.stub();
        mount(<FormTextInput onBlur={onBlurStub} clearable={true} />);

        cy.get(TEXT_INPUT_ID).focus().type(`${TEST_INPUT}`).blur();
        cy.wrap(onBlurStub).should('have.been.calledOnce');
    });

    it('applies validation style to input', () => {
        mount(<FormTextInput style={FormControlStyle.Danger} />);

        cy.get(TEXT_INPUT_ID).parent().should('have.class', validationClassMap[Validation.Error]);
    });

    it('disables the input', () => {
        mount(<FormTextInput disabled={true} />);

        cy.get(TEXT_INPUT_ID).should('be.disabled');
    });

    it('applies the same id to input and label', () => {
        mount(<FormTextInput id={TEST_ID} label={{ children: 'label' }} />);

        cy.get(LABEL_ID).should('have.attr', 'for', TEST_ID);
        cy.get(TEXT_INPUT_ID).should('have.id', TEST_ID);
    });

    it('forwards necessary props to input', () => {
        mount(
            <FormTextInput
                clearable={true}
                copyable={true}
                autocomplete={false}
                decorator={<IconIcon />}
                spellcheck={false}
                type={TextInputType.Password}
                obfuscated={false}
                dotted={true}
                value={TEST_ID}
                placeholder={TEST_ID}
                readonly={true}
                required={true}
                size={12}
            />
        );

        cy.get(TEXT_INPUT_ID).should('have.attr', 'size', '12');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'readonly', 'readonly');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'required', 'required');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'spellcheck', 'false');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'placeholder', TEST_ID);
        cy.get(TEXT_INPUT_ID).parent().should('have.class', 'tw-border-dashed');
        cy.get(CLEAR_ICON_ID).should('be.visible');
        cy.get(COPY_ICON_ID).should('be.visible');
        cy.get(DECORATOR_ID).should('be.visible');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'text');
        cy.get(VISIBILITY_ICON_ID).click();
        cy.get(TEXT_INPUT_ID).should('have.attr', 'type', 'password');
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormTextInput
                style={FormControlStyle.Danger}
                label={{ children: TEST_LABEL }}
                helper={{ text: TEST_HELPER }}
                extra={TEST_EXTRA}
            />
        );

        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();
        mount(
            <FormTextInput
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                transformers={{ in: (value) => value.join(','), out: (value) => value?.split(',') }}
            />
        );

        cy.get(TEXT_INPUT_ID).should('have.value', TRANSFORMER_VALUE.join(','));
        cy.get(TEXT_INPUT_ID).type(',4');
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).should(($stub) => {
            const value = $stub.args[0][1];
            expect(value).to.have.length(4);
            expect(value[3]).to.equal('4');
        });
    });
});
