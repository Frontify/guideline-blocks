/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { ColorPaletteDummy } from '@frontify/app-bridge';

import { Palette } from './Palette';

const ColorKitPaletteSelector = '[data-test-id="palette"]';
const ColorKitColorSelector = '[data-test-id="color"]';
const EmptyViewSelector = '[data-test-id="empty-view"]';
const EmptyViewColorSelector = '[data-test-id="empty-view-color"]';

const dummyPalette = ColorPaletteDummy.with(666, 'Palette Dummy');

const EMPTY_BLOCK_COLORS = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];

describe('Palette', () => {
    context('with colors', () => {
        beforeEach(() => {
            mount(<Palette palette={dummyPalette} isEditing={false} />);

            cy.get(ColorKitPaletteSelector).should('exist').as('palette');
            cy.get(ColorKitPaletteSelector).find(ColorKitColorSelector).should('exist').as('colors');
        });

        it('should render', () => {
            cy.get('@colors').should('have.length', 3);
        });

        it('should render elements with specific color hex background', () => {
            cy.get('@colors').first().should('have.css', 'background-color', 'rgb(255, 0, 0)');
            cy.get('@colors').eq(1).should('have.css', 'background-color', 'rgb(255, 255, 0)');
            cy.get('@colors').eq(2).should('have.css', 'background-color', 'rgb(0, 255, 0)');
        });
    });

    it('should render palette without colors', () => {
        mount(<Palette palette={{ ...dummyPalette, colors: [] }} isEditing={false} />);

        cy.get(EmptyViewSelector).should('exist');
        cy.get(EmptyViewColorSelector).should('have.length', EMPTY_BLOCK_COLORS.length);
    });

    it('should not render color without color hex', () => {
        mount(
            <Palette
                palette={{ ...dummyPalette, colors: [{ ...dummyPalette.colors[0], hex: null }] }}
                isEditing={false}
            />
        );

        cy.get(ColorKitPaletteSelector).should('not.have.descendants', ColorKitColorSelector);
    });
});
