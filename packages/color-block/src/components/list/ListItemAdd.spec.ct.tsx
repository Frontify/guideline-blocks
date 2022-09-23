/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { ListItemAdd } from './ListItemAdd';
import { ColorSpaceValues } from '../../types';

const ListItemAddSelector = '[data-test-id="list-item-add"]';
const ColorPickerFlyoutTriggerSelector = '[data-test-id="color-color-picker-flyout-trigger"]';
const CustomColorPickerSelector = '[data-test-id="custom-color-picker"]';
const ButtonSelector = '[data-test-id="button"]';

const COLOR_SPACES = ['hex', 'rgb', 'variable'];

describe('ListItemAdd component in view mode', () => {
    beforeEach(() => {
        const onConfirmStub = cy.stub().as('onConfirm');

        mount(<ListItemAdd colorSpaces={COLOR_SPACES as (keyof ColorSpaceValues)[]} onConfirm={onConfirmStub} />);
    });

    it('renders a ListItemAdd component', () => {
        cy.get(ListItemAddSelector).should('exist');
    });

    it('renders a ColorPickerFlyout component', () => {
        cy.get(CustomColorPickerSelector).should('not.exist');
        cy.get(ColorPickerFlyoutTriggerSelector).click();
        cy.get(CustomColorPickerSelector).should('exist');
        cy.get(ButtonSelector).last().click();
        cy.get('@onConfirm').should('have.been.called');
    });
});
