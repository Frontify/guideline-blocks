/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ColorBlock } from './ColorBlock';
import { ColorBlockType } from './types';

const ColorBlockSelector = '[data-test-id="color-block"]';
const ColorSpaceSelector = '[data-test-id="color-space"]';

const ALL_COLORSPACES = [
    'hex',
    'rgb',
    'cmyk',
    'cmykCoated',
    'cmykUncoated',
    'cmykNewspaper',
    'pantone',
    'pantoneCoated',
    'pantoneUncoated',
    'pantoneCp',
    'pantoneTextile',
    'pantonePlastics',
    'ral',
    'variable',
    'lab',
    'ncs',
    'hks',
    'threeM',
    'oracal',
];

describe('ColorBlock component', () => {
    it('renders a color block list view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.List,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders a color block drops view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.Drops,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders a color block cards view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.Cards,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders color block with all colorspaces in list view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.List,
                colorspaces: ALL_COLORSPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('exist');
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLORSPACES.length * 3);
    });

    it('renders color block with all colorspaces in drops view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.Drops,
                colorspaces: ALL_COLORSPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('exist');
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLORSPACES.length * 3);
    });

    it('renders color block with all colorspaces in cards view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorBlock, {
            blockSettings: {
                view: ColorBlockType.Cards,
                colorspaces: ALL_COLORSPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('exist');
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLORSPACES.length * 3);
    });
});
