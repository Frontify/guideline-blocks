/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { Color, FormControlStyle, Palette } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormColorPicker as FormColorPickerComponent } from './ColorPicker';
import { FormColorPickerProps } from './types';

const TRIGGER_ID = '[data-test-id=trigger]';
const TEST_COLOR = { r: 0, g: 133, b: 255 };
const TEST_COLOR_RGB = 'rgb(0, 133, 255)';
const TEST_COLOR_RGBA = 'rgba(0, 133, 255, 1)';
const BUTTON_ID = '[data-test-id=button]';
const BRAND_COLOR_ID = '[data-test-id=brand-color]';
const COLOR_PREVIEW_ID = '[data-test-id=color-preview]';
const CLEAR_BUTTON_ID = '[data-test-id=dropdown-clear-button]';
const LABEL_ID = "[data-test-id='input-label']";
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const MENU_ITEM_DECORATOR_ID = '[data-test-id=menu-item-decorator]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_ID = 'ID';
const DEFAULT_NAME = 'color';
const TRANSFORMER_VALUE = 'rgba(3, 34, 234, 0.5)';

const EXAMPLE_PALETTES: Palette[] = [
    {
        id: 'red',
        title: 'Red',
        colors: [TEST_COLOR, { r: 255, g: 133, b: 3 }],
    },
    {
        id: 'green',
        title: 'Green',
        colors: [
            { r: 230, g: 133, b: 255 },
            { r: 2, g: 133, b: 255 },
        ],
    },
];

const FormColorPicker = ({
    onFormUpdated = cy.stub(),
    value,
    name = DEFAULT_NAME,
    ...props
}: Partial<FormColorPickerProps> & { value?: Color | string; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormColorPickerComponent name={name} {...props} />
        </Form>
    );
};

describe('FormColorPicker', () => {
    it('renders without crashing', () => {
        mount(<FormColorPicker />);

        cy.get(TRIGGER_ID).should('exist');
    });

    it('updates form when color is submitted', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormColorPicker onFormUpdated={onFormUpdatedStub} palettes={EXAMPLE_PALETTES} />);

        cy.get(TRIGGER_ID).click();
        cy.get(BRAND_COLOR_ID).should('be.visible');
        cy.get(BRAND_COLOR_ID).first().find('button').click();
        cy.get(BUTTON_ID).last().click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value.r).to.eq(TEST_COLOR.r);
            expect(value.g).to.eq(TEST_COLOR.g);
            expect(value.b).to.eq(TEST_COLOR.b);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('displays current form state', () => {
        mount(<FormColorPicker value={TEST_COLOR} />);

        cy.get(TRIGGER_ID).click();
        cy.get(COLOR_PREVIEW_ID).should('have.css', 'background-color', TEST_COLOR_RGB);
        cy.get(MENU_ITEM_DECORATOR_ID).children('span').invoke('attr', 'style').should('include', TEST_COLOR_RGB);
    });

    it('updates form when input cleared and calls onClear', () => {
        const onFormUpdatedStub = cy.stub();
        mount(<FormColorPicker onFormUpdated={onFormUpdatedStub} clearable={true} value={TEST_COLOR} />);

        cy.get(CLEAR_BUTTON_ID).should('be.visible').click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(null);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('calls onSelect whenever a palette is clicked', () => {
        const onSelectStub = cy.stub();
        mount(<FormColorPicker onSelect={onSelectStub} palettes={EXAMPLE_PALETTES} />);

        cy.get(TRIGGER_ID).click();
        cy.get(BRAND_COLOR_ID).should('be.visible');
        cy.get(BRAND_COLOR_ID).first().find('button').click();
        cy.wrap(onSelectStub)
            .should('have.been.calledOnce')
            .and((stub) => {
                const [{ r, g, b }] = stub.args[0];
                expect(r).to.eq(TEST_COLOR.r);
                expect(g).to.eq(TEST_COLOR.g);
                expect(b).to.eq(TEST_COLOR.b);
            });
    });

    it('calls onClear whenever flyout is closed', () => {
        const onCloseStub = cy.stub();
        mount(<FormColorPicker onClose={onCloseStub} palettes={EXAMPLE_PALETTES} />);

        cy.get(TRIGGER_ID).click();
        cy.get(BRAND_COLOR_ID).should('be.visible');
        cy.get(BUTTON_ID).first().click();
        cy.wrap(onCloseStub).should('have.been.calledOnce');
    });

    it('disables the input', () => {
        mount(<FormColorPicker disabled={true} />);

        cy.get(TRIGGER_ID).should('have.class', 'tw-pointer-events-none');
    });

    it('applies the same id to input and label', () => {
        mount(<FormColorPicker id={TEST_ID} label={{ children: 'label' }} />);

        cy.get(LABEL_ID).should('have.attr', 'for', TEST_ID);
        cy.get(TRIGGER_ID).find('button').should('have.id', TEST_ID);
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormColorPicker
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
            <FormColorPicker
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                palettes={EXAMPLE_PALETTES}
                transformers={{
                    in: (value) => {
                        const [r, g, b, a] = value.replace(/(rgba\()(.*)(\))/, '$2').split(', ');
                        return { r, g, b, a };
                    },
                    out: (color) => {
                        if (!color) {
                            return 'rgba(0, 0, 0, 0)';
                        }
                        const { r = 0, g = 0, b = 0, a = 1 } = color;
                        return `rgba(${r}, ${g}, ${b}, ${a})`;
                    },
                }}
            />
        );
        cy.get(TRIGGER_ID).click();
        cy.get(COLOR_PREVIEW_ID).should('have.css', 'background-color', TRANSFORMER_VALUE);
        cy.get(BRAND_COLOR_ID).should('be.visible');
        cy.get(BRAND_COLOR_ID).first().find('button').click();
        cy.get(BUTTON_ID).last().click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const value = stub.args[0][1];
            expect(value).to.eq(TEST_COLOR_RGBA);
        });
    });
});
