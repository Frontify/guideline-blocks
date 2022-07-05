/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlStyle, SwitchSize } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormSwitch as FormSwitchComponent } from './Switch';
import { FormSwitchProps } from './types';

const SWITCH_ID = "[data-test-id='switch']";
const LABEL_ID = "[data-test-id='input-label']";
const TOOLTIP_ID = '[data-test-id="tooltip-icon"]';
const SWITCH_CONTAINER_ID = '[data-test-id=switch-container]';
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_ID = 'ID';
const TEST_TOOLTIP = 'TOOLTIP';
const DEFAULT_NAME = 'switch';
const TRANSFORMER_VALUE = 'checked';

const FormSwitch = ({
    onFormUpdated = cy.stub(),
    value = false,
    name = DEFAULT_NAME,
    ...props
}: Partial<FormSwitchProps> & { value?: boolean | string; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormSwitchComponent name={name} {...props} />
        </Form>
    );
};

describe('FormSwitch', () => {
    it('renders without crashing', () => {
        mount(<FormSwitch />);

        cy.get(SWITCH_ID).should('exist');
    });

    it('updates form when switch is changed and calls onChange', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormSwitch onFormUpdated={onFormUpdatedStub} />);

        cy.get(SWITCH_ID).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(true);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('disables the switch', () => {
        mount(<FormSwitch disabled={true} />);

        cy.get(SWITCH_ID).should('be.disabled');
    });

    it('forwards necessary props to switch', () => {
        mount(
            <FormSwitch
                size={SwitchSize.Large}
                label={TEST_LABEL}
                id={TEST_ID}
                tooltip={{ content: TEST_TOOLTIP }}
                hug={true}
            />
        );
        cy.get(SWITCH_ID).should('have.class', 'tw-w-11 tw-h-6');
        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(SWITCH_CONTAINER_ID).should('have.class', 'tw-inline-flex');
        cy.get(TOOLTIP_ID).should('exist');
        cy.get(SWITCH_ID).should('have.attr', 'name', 'switch');
    });

    it('forwards correct properties to form controller', () => {
        mount(<FormSwitch style={FormControlStyle.Danger} helper={{ text: TEST_HELPER }} extra={TEST_EXTRA} />);

        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
    });

    it('applies form value', () => {
        mount(<FormSwitch value={true} />);

        cy.get(SWITCH_ID).invoke('val').should('equal', 'true');
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormSwitch
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                transformers={{ in: (value) => value === 'checked', out: (value) => (value ? 'checked' : 'unchecked') }}
            />
        );
        cy.get(SWITCH_ID).invoke('val').should('equal', 'true');
        cy.get(SWITCH_ID).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).should(($stub) => {
            const value = $stub.args[0][1];
            expect(value).to.equal('unchecked');
        });
    });
});
