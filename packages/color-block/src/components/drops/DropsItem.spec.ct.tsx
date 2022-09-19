/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FrontifyColorDummy } from '@frontify/app-bridge';

import { DropsItem } from './DropsItem';
import { ColorSpaceInputValues } from '../../types';

const DropsItemSelector = '[data-test-id="drops-item"]';
const ColorTooltipTriggerSelector = '[data-test-id="color-tooltip-trigger"]';
const ColorPickerFlyoutSelector = '[data-test-id="color-picker-flyout"]';
const ColorPickerFlyoutTriggerSelector = '[data-test-id="color-color-picker-flyout-trigger"]';
const ColorSpaceValueTriggerSelector = '[data-test-id="color-space-value-trigger"]';
const ColorSpaceSelector = '[data-test-id="color-space"]';
const TooltipSelector = '[data-test-id="tooltip"]';
const ColorNameSelector = '[data-test-id="color-name"]';
const DeleteButtonSelector = '[data-test-id="delete-button"]';

const COLORSPACES = ['hex', 'rgb', 'variable'];

describe('DropsItem component in view mode', () => {
    beforeEach(() => {
        const onBlurStub = cy.stub().as('onBlur');
        const onUpdateStub = cy.stub().as('onUpdate');
        const onDeleteStub = cy.stub().as('onDelete');

        mount(
            <DropsItem
                color={FrontifyColorDummy.red()}
                colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]}
                isEditing={false}
                onBlur={onBlurStub}
                onUpdate={onUpdateStub}
                onDelete={onDeleteStub}
            />
        );
    });

    it('renders a DropsItem component', () => {
        cy.get(DropsItemSelector).should('exist');
    });

    it('renders a color tooltip', () => {
        cy.get(TooltipSelector).should('not.exist');
        cy.get(ColorTooltipTriggerSelector).trigger('mouseover');
        cy.get(TooltipSelector).should('exist');
    });

    it('renders a color space tooltip', () => {
        cy.get(TooltipSelector).should('not.exist');
        cy.get(ColorSpaceValueTriggerSelector).first().trigger('mouseover');
        cy.get(TooltipSelector).should('exist');
    });
});

describe('DropsItem component in edit mode', () => {
    beforeEach(() => {
        const onBlurStub = cy.stub().as('onBlur');
        const onUpdateStub = cy.stub().as('onUpdate');
        const onDeleteStub = cy.stub().as('onDelete');

        mount(
            <DropsItem
                color={FrontifyColorDummy.red()}
                colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]}
                isEditing={true}
                onBlur={onBlurStub}
                onUpdate={onUpdateStub}
                onDelete={onDeleteStub}
            />
        );
    });

    it('renders a DropsItem component', () => {
        cy.get(DropsItemSelector).should('exist');
    });

    it('renders a color picker flyout', () => {
        cy.get(ColorPickerFlyoutTriggerSelector).click();
        cy.get(ColorPickerFlyoutSelector).should('exist');
    });

    it('renders a color name input', () => {
        cy.get(ColorNameSelector).find('input').should('exist');
        cy.get(ColorNameSelector).find('input').focus().blur();
        cy.get('@onBlur').should('have.been.called');
    });

    it('renders a color space input', () => {
        cy.get(ColorSpaceSelector).find('input').should('exist');
        cy.get(ColorSpaceSelector).find('input').should('have.value', FrontifyColorDummy.red().nameCss);
        cy.get(ColorSpaceSelector).find('input').focus().blur();
        cy.get('@onUpdate').should('have.been.called');
    });

    it('renders a delete button', () => {
        cy.get(DeleteButtonSelector).should('not.be.visible');
        cy.get(DropsItemSelector).realHover();
        cy.get(DeleteButtonSelector).should('be.visible');
        cy.get(DeleteButtonSelector).click();
        cy.get('@onDelete').should('have.been.called');
    });
});
