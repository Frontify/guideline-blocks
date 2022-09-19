/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';

import { ColorName } from './ColorName';
import { ColorBlockType } from '../types';

const ColorNameSelector = '[data-test-id="color-name"]';

const INITIAL_COLOR_NAME = 'Color Name';

describe('ColorPickerFlyout component', () => {
    it('renders a ColorName component in list view', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.List}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing={false}
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in drops view', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.Drops}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing={false}
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in cards view', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.Cards}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing={false}
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in list view and edit mode', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.List}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus();
        cy.get(ColorNameSelector).find('input').blur();
        cy.get('@onBlur').should('have.been.called');
    });

    it('renders a ColorName component in drops view and edit mode', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.Drops}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus().blur();
        cy.get('@onBlur').should('have.been.called');
    });

    it('renders a ColorName component in cards view and edit mode', () => {
        const onBlurStub = cy.stub().as('onBlur');

        mount(
            <ColorName
                viewType={ColorBlockType.Cards}
                initialColorName={INITIAL_COLOR_NAME}
                isEditing
                onBlur={onBlurStub}
            />
        );

        cy.get(ColorNameSelector).should('exist');
        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus();
        cy.get(ColorNameSelector).find('input').blur();
        cy.get('@onBlur').should('have.been.called');
    });
});
