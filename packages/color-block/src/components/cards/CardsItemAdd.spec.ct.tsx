/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { CardsItemAdd } from './CardsItemAdd';
import { ColorSpaceInputValues } from '../../types';

const CardsItemAddSelector = '[data-test-id="cards-item-add"]';
const ColorPickerFlyoutTriggerSelector = '[data-test-id="color-color-picker-flyout-trigger"]';
const CustomColorPickerSelector = '[data-test-id="custom-color-picker"]';
const ButtonSelector = '[data-test-id="button"]';

const COLORSPACES = ['hex', 'rgb', 'variable'];

describe('CardsItemAdd component in view mode', () => {
    beforeEach(() => {
        const onConfirmStub = cy.stub().as('onConfirm');

        mount(<CardsItemAdd colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]} onConfirm={onConfirmStub} />);
    });

    it('renders a CardsItemAdd component', () => {
        cy.get(CardsItemAddSelector).should('exist');
    });

    it('renders a ColorPickerFlyout component', () => {
        cy.get(CustomColorPickerSelector).should('not.exist');
        cy.get(ColorPickerFlyoutTriggerSelector).should('exist');
        cy.get(ColorPickerFlyoutTriggerSelector).click();
        cy.get(CustomColorPickerSelector).should('exist');
        cy.get(ButtonSelector).last().click();
        cy.get('@onConfirm').should('have.been.called');
    });
});
