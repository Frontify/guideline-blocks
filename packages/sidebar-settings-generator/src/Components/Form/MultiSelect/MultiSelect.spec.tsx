/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlStyle } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormMultiSelect as FormMultiSelectComponent } from './MultiSelect';
import { FormMultiSelectProps } from './types';

const LABEL_ID = "[data-test-id='input-label']";
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const TRIGGER_ID = '[data-test-id=trigger]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TAG_ID = '[data-test-id=tag]';
const CHECKLIST_ID = '[data-test-id=checklist]';
const CHECKBOX_ID = '[data-test-id=checkbox]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_PLACEHOLDER = 'PLACEHOLDER';
const DEFAULT_NAME = 'multi-select';

const ITEMS = [
    {
        value: 'Checkbox label 1',
    },
    {
        value: 'Short tag',
    },
    {
        value: 'Checkbox label 2',
    },
    {
        value: 'Checkbox label 3',
    },
    {
        value: 'Tag 74',
    },
    {
        value: 'This is a long tag',
    },
];
const ACTIVE_ITEM_KEYS = ['Checkbox label 1', 'Short tag'];

const TRANSFORMER_VALUE = ITEMS.slice(0, 2);

const FormMultiSelect = ({
    onFormUpdated = cy.stub(),
    value = [],
    name = DEFAULT_NAME,
    items = ITEMS,
    ...props
}: Partial<FormMultiSelectProps> & { value?: string[] | { value: string }[]; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormMultiSelectComponent name={name} items={items} {...props} />
        </Form>
    );
};

describe('FormMultiSelect', () => {
    it('renders without crashing', () => {
        mount(<FormMultiSelect />);

        cy.get(TRIGGER_ID).should('exist');
    });

    it('updates form when input is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormMultiSelect onFormUpdated={onFormUpdatedStub} />);

        cy.get(TRIGGER_ID).click();
        cy.get(CHECKLIST_ID).should('be.visible');
        cy.get(CHECKBOX_ID).first().children('label').as('FirstCheckboxLabel');
        cy.get('@FirstCheckboxLabel').click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.have.length(1);
            expect(value[0]).to.eq(ITEMS[0].value);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('displays current form data', () => {
        const onFormUpdatedStub = cy.stub();
        mount(<FormMultiSelect onFormUpdated={onFormUpdatedStub} value={ACTIVE_ITEM_KEYS} />);

        cy.get(TAG_ID)
            .should('have.length', 2)
            .each(($tag, index) => {
                expect($tag).to.have.text(ITEMS[index].value);
            });
        cy.get(TRIGGER_ID).click();
        cy.get(CHECKLIST_ID).should('be.visible');
        cy.get(CHECKBOX_INPUT_ID).each(($input, index) => {
            if (index < 2) {
                expect($input).to.be.checked;
            } else {
                expect($input).not.to.be.checked;
            }
        });
    });

    it('disables the input', () => {
        mount(<FormMultiSelect disabled={true} />);

        cy.get(TRIGGER_ID).should('have.class', 'tw-pointer-events-none');
    });

    it('forwards necessary props to input', () => {
        mount(<FormMultiSelect ariaLabel={TEST_LABEL} placeholder={TEST_PLACEHOLDER} />);

        cy.get(TRIGGER_ID).should('have.text', TEST_PLACEHOLDER);
        cy.get(TRIGGER_ID).click();
        cy.get(CHECKLIST_ID).should('have.attr', 'aria-label', TEST_LABEL);
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormMultiSelect
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
            <FormMultiSelect
                onFormUpdated={onFormUpdatedStub}
                value={TRANSFORMER_VALUE}
                transformers={{
                    in: (input) => input.map(({ value }: { value: string }) => value),
                    out: (output) => output.map((value) => ({ value })),
                }}
            />
        );

        cy.get(TAG_ID)
            .should('have.length', 2)
            .each(($tag, index) => {
                expect($tag).to.have.text(ITEMS[index].value);
            });
        cy.get(TRIGGER_ID).click();
        cy.get(CHECKLIST_ID).should('be.visible');
        cy.get(CHECKBOX_INPUT_ID).first().should('be.checked');
        cy.get(CHECKBOX_INPUT_ID).eq(1).should('be.checked');
        cy.get(CHECKBOX_INPUT_ID).eq(2).should('not.be.checked');
        cy.get(CHECKBOX_ID).eq(2).children('label').as('ThirdCheckboxLabel');
        cy.get('@ThirdCheckboxLabel').click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const value = stub.args[0][1];
            expect(value).to.have.length(3);
            expect(value[2].value).to.equal(ITEMS[2].value);
        });
    });
});
