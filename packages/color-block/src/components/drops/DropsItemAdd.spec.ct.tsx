/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';

import { DropsItemAdd } from './DropsItemAdd';
import { ColorSpaceInputValues } from '../../types';

const DropsItemAddSelector = '[data-test-id="drops-item-add"]';
const ColorPickerFlyoutTriggerSelector = '[data-test-id="color-color-picker-flyout-trigger"]';
const CustomColorPickerSelector = '[data-test-id="custom-color-picker"]';
const ButtonSelector = '[data-test-id="button"]';

const COLORSPACES = ['hex', 'rgb', 'variable'];

describe('DropsItemAdd component in view mode', () => {
    beforeEach(() => {
        const onConfirmStub = cy.stub().as('onConfirm');

        mount(<DropsItemAdd colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]} onConfirm={onConfirmStub} />);
    });

    it('renders a DropsItemAdd component', () => {
        cy.get(DropsItemAddSelector).should('exist');
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
