/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';

import { ColorPickerFlyout } from './ColorPickerFlyout';

const ColorPickerFlyoutSelector = '[data-test-id="color-picker-flyout"]';
const FlyoutTriggerSelector = '[data-test-id="flyout-trigger"]';
const CustomColorPickerSelector = '[data-test-id="custom-color-picker"]';
const ButtonSelector = '[data-test-id="button"]';

describe('ColorPickerFlyout component', () => {
    beforeEach(() => {
        const onConfirmStub = cy.stub().as('onConfirm');

        mount(
            <ColorPickerFlyout currentColor={null} onConfirm={onConfirmStub}>
                <div data-test-id="color-picker-flyout-trigger">Hello</div>
            </ColorPickerFlyout>
        );
    });

    it('renders a ColorPickerFlyout component', () => {
        cy.get(ColorPickerFlyoutSelector).should('exist');
    });

    it('renders CustomColorPicker component on trigger click', () => {
        cy.get(CustomColorPickerSelector).should('not.exist');
        cy.get(FlyoutTriggerSelector).click();
        cy.get(CustomColorPickerSelector).should('be.visible');
    });

    it('close Flyout on cancel button click', () => {
        cy.get(FlyoutTriggerSelector).click();
        cy.get(ButtonSelector).first().click();
        cy.get(CustomColorPickerSelector).should('not.exist');
    });

    it('call onConfirm on confirm button click', () => {
        cy.get(FlyoutTriggerSelector).click();
        cy.get(ButtonSelector).last().click();
        cy.get('@onConfirm').should('have.been.called');
    });
});
