/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FrontifyColorPaletteDummy } from '@frontify/app-bridge';
import { Palette } from './Palette';

const ColorKitPaletteSelector = '[data-test-id="palette"]';
const ColorKitColorSelector = '[data-test-id="color"]';

const dummyPalette = FrontifyColorPaletteDummy.with(666, 'Palette Dummy');

describe('Palette', () => {
    context('with colors', () => {
        beforeEach(() => {
            mount(<Palette palette={dummyPalette} />);

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
        mount(<Palette palette={{ ...dummyPalette, colors: [] }} />);

        cy.get(ColorKitPaletteSelector).should('not.have.descendants', ColorKitColorSelector);
    });

    it('should not render color without color hex', () => {
        mount(<Palette palette={{ ...dummyPalette, colors: [{ ...dummyPalette.colors[0], hex: null }] }} />);

        cy.get(ColorKitPaletteSelector).should('not.have.descendants', ColorKitColorSelector);
    });
});
