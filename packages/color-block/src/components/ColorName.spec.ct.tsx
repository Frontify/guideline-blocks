/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { ColorName } from './ColorName';
import { ColorBlockType, ColorNameProps } from '../types';

const ColorNameSelector = '[data-test-id="color-name"]';

const INITIAL_COLOR_NAME = 'Color Name';

const DefaultColorName = (props: Partial<ColorNameProps>) => {
    const defaults = {
        viewType: ColorBlockType.List,
        initialColorName: INITIAL_COLOR_NAME,
        isEditing: false,
        onBlur: cy.stub().as('onBlur'),
    };
    const colorNameProps = { ...defaults, ...props };

    return <ColorName {...colorNameProps} />;
};

describe('ColorName component', () => {
    it('renders a ColorName component in list view', () => {
        mount(<DefaultColorName viewType={ColorBlockType.List} isEditing={false} />);

        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in drops view', () => {
        mount(<DefaultColorName viewType={ColorBlockType.Drops} isEditing={false} />);

        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in cards view', () => {
        mount(<DefaultColorName viewType={ColorBlockType.Cards} isEditing={false} />);

        cy.get(ColorNameSelector).contains(INITIAL_COLOR_NAME);
        cy.get('input').should('not.exist');
    });

    it('renders a ColorName component in list view and edit mode', () => {
        mount(<DefaultColorName viewType={ColorBlockType.List} isEditing />);

        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus();
        cy.get(ColorNameSelector).find('input').blur();
        cy.get('@onBlur').should('have.been.called');
    });

    it('renders a ColorName component in drops view and edit mode', () => {
        mount(<DefaultColorName viewType={ColorBlockType.Drops} isEditing />);

        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus().blur();
        cy.get('@onBlur').should('have.been.called');
    });

    it('renders a ColorName component in cards view and edit mode', () => {
        mount(<DefaultColorName viewType={ColorBlockType.Cards} isEditing />);

        cy.get(ColorNameSelector).find('input').should('have.value', INITIAL_COLOR_NAME);
        cy.get(ColorNameSelector).find('input').focus();
        cy.get(ColorNameSelector).find('input').blur();
        cy.get('@onBlur').should('have.been.called');
    });
});
