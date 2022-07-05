/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { useMemo } from 'react';
import { FormSliderProps } from './types';
import { FormSlider as FormSliderComponent } from './Slider';
import { FormControlStyle } from '@frontify/fondue';
import { Form } from '../Form';

const SLIDER_ID = '[data-test-id="slider"]';
const SLIDER_ITEM_ID = '[data-test-id="slider-item-text"]';
const SLIDER_ITEM_NUMBER_ID = '[data-test-id="slider-item-number"]';
const SLIDER_INPUT_ID = '[data-test-id="slider-input"]';
const LABEL_ID = "[data-test-id='input-label']";
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';

const SLIDER_ITEMS = [
    { id: 'item_1', value: '1' },
    { id: 'item_2', value: '2' },
];
const SLIDER_NUMBER_ITEMS = [
    { id: 'item_1', value: 3 },
    { id: 'item_2', value: 4 },
];
const TEST_LABEL = 'LABEL';
const TEST_EXTRA = 'EXTRA';
const TEST_HELPER = 'EXTRA';
const DEFAULT_NAME = 'choice';
const TRANSFORMER_VALUE = 'first';

const FormSlider = ({
    onFormUpdated = cy.stub(),
    value = '',
    name = DEFAULT_NAME,
    items = SLIDER_ITEMS,
    ...props
}: Partial<FormSliderProps> & { value?: string; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormSliderComponent name={name} items={items} {...props} />
        </Form>
    );
};

describe('FormSlider', () => {
    it('renders without crashing', () => {
        mount(<FormSlider />);

        cy.get(SLIDER_ID).should('exist');
    });

    it('updates form when input is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormSlider onFormUpdated={onFormUpdatedStub} />);

        cy.get(SLIDER_ITEM_ID).eq(1).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(SLIDER_ITEMS[1].id);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('disables the input', () => {
        mount(<FormSlider disabled={true} />);

        cy.get(SLIDER_INPUT_ID).each(($item) => {
            cy.wrap($item).should('be.disabled');
        });
    });

    it('forwards necessary props to slider', () => {
        mount(<FormSlider items={SLIDER_NUMBER_ITEMS} />);

        cy.get(SLIDER_ITEM_NUMBER_ID)
            .should('have.length', 2)
            .each(($item, index) => {
                const text = $item.text();
                expect(text).to.equal(SLIDER_NUMBER_ITEMS[index].value.toString());
            });
    });

    it('forwards necessary props to form control', () => {
        mount(
            <FormSlider
                label={{ children: TEST_LABEL }}
                extra={TEST_EXTRA}
                helper={{ text: TEST_HELPER }}
                style={FormControlStyle.Danger}
            />
        );
        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
    });

    it('selects the value set in the form', () => {
        mount(<FormSlider value={SLIDER_ITEMS[1].id} items={SLIDER_ITEMS} />);

        cy.get(SLIDER_INPUT_ID).eq(0).should('not.be.checked');
        cy.get(SLIDER_INPUT_ID).eq(1).should('be.checked');
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormSlider
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                transformers={{
                    in: (value) => (value === 'first' ? 'item_1' : 'item_2'),
                    out: (value) => (value === 'item_1' ? 'first' : 'second'),
                }}
            />
        );
        cy.get(SLIDER_INPUT_ID).eq(0).should('be.checked');
        cy.get(SLIDER_ITEM_ID).eq(1).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).should(($stub) => {
            const value = $stub.args[0][1];
            expect(value).to.equal('second');
        });
    });
});
