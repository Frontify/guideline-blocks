/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FrontifyColorPaletteDummy } from '@frontify/app-bridge';

import { Palette } from './Palette';

const ColorKitPaletteSelector = '[data-test-id="palette"]';
const ColorKitColorSelector = '[data-test-id="color"]';

const dummyPalette = FrontifyColorPaletteDummy.with(666, 'Palette Dummy');

describe('Palette', () => {
    it('should render palette without color', () => {
        mount(<Palette palette={{ ...dummyPalette, colors: [] }} />);

        cy.get(ColorKitPaletteSelector).should('exist');

        cy.get(ColorKitColorSelector).should('not exist');
    });

    it('should render palette with colors', () => {
        mount(<Palette palette={dummyPalette} />);

        cy.get(ColorKitPaletteSelector).should('exist');
        cy.get(ColorKitColorSelector).should('exist');
        cy.get(ColorKitPaletteSelector).find(ColorKitColorSelector).should('have.length', 3);
    });
});
