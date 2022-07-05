/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { CheckboxState, ChecklistDirection, FormControlStyle } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormChecklist as FormChecklistComponent } from './Checklist';
import { FormChecklistProps } from './types';

const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const CHECKLIST_ID = '[data-test-id=checklist]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const LABEL_ID = "[data-test-id='input-label']";

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const DEFAULT_NAME = 'checklist';

const CHECKBOXES = [
    {
        value: 'checkbox-1',
        label: 'Checkbox label',
    },
    {
        value: 'checkbox-2',
        label: 'Checkbox label',
        state: CheckboxState.Mixed,
    },
    {
        value: 'checkbox-3',
        label: 'Checkbox label',
        note: 'Note about this input',
        disabled: true,
    },
];

const TRANSFORMER_VALUE = CHECKBOXES.map(({ value }) => ({ value }));

const FormChecklist = ({
    onFormUpdated = cy.stub(),
    value = [],
    name = DEFAULT_NAME,
    checkboxes = CHECKBOXES,
    direction = ChecklistDirection.Vertical,
    ...props
}: Partial<FormChecklistProps> & { value?: string[] | { value: string }[]; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormChecklistComponent name={name} checkboxes={checkboxes} direction={direction} {...props} />
        </Form>
    );
};

describe('FormChecklist', () => {
    it('renders without crashing', () => {
        mount(<FormChecklist />);

        cy.get(CHECKLIST_ID).should('exist');
    });

    it('updates form when checklist state is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormChecklist onFormUpdated={onFormUpdatedStub} />);

        cy.get(CHECKBOX_INPUT_ID).first().check({ force: true });
        cy.get(CHECKBOX_INPUT_ID).eq(1).check({ force: true });
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.have.length(2);
            expect(value[0]).to.eq(CHECKBOXES[0].value);
            expect(value[1]).to.eq(CHECKBOXES[1].value);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('displays current form state', () => {
        mount(<FormChecklist value={CHECKBOXES.map((checkbox) => checkbox.value)} />);

        cy.get(CHECKBOX_INPUT_ID).each(($input) => {
            expect($input).to.be.checked;
        });
    });

    it('disables the checkboxes', () => {
        mount(<FormChecklist disabled={true} />);

        cy.get(CHECKBOX_INPUT_ID).each(($checkbox) => {
            cy.wrap($checkbox).should('be.disabled');
        });
    });

    it('forwards necessary props to checklist', () => {
        mount(<FormChecklist columns={4} direction={ChecklistDirection.Vertical} ariaLabel={TEST_LABEL} />);

        cy.get(CHECKLIST_ID).should('have.attr', 'aria-label', TEST_LABEL);
        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid-cols-4');
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormChecklist
                style={FormControlStyle.Danger}
                label={{ children: TEST_LABEL }}
                helper={{ text: TEST_HELPER }}
                extra={TEST_EXTRA}
            />
        );

        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
        cy.get(LABEL_ID).first().should('have.text', TEST_LABEL);
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormChecklist
                onFormUpdated={onFormUpdatedStub}
                value={TRANSFORMER_VALUE}
                transformers={{
                    in: (input) => input.map(({ value }: { value: string }) => value),
                    out: (output) => (output ? output.map((value) => ({ value })) : []),
                }}
            />
        );

        cy.get(CHECKBOX_INPUT_ID).each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        });
        cy.get(CHECKBOX_INPUT_ID).last().uncheck({ force: true });
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const value = stub.args[0][1];
            expect(value).to.have.length(2);
            expect(value[0].value).to.eq(CHECKBOXES[0].value);
            expect(value[1].value).to.eq(CHECKBOXES[1].value);
        });
    });
});
