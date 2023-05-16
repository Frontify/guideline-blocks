/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { GlyphsBlock } from './GlyphsBlock';

const BlockSelector = '[data-test-id="glyphs-block"]';
const ItemSelector = '[data-test-id="glyphs-item"]';

describe('Glyphs Block', () => {
    it('renders a glyphs block with defaults', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {});

        mount(<GlyphsBlockWithStubs />);
        cy.get(BlockSelector).contains('Aa');
    });

    it('renders a glyphs block with custom border', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {
            blockSettings: {
                hasBorder: true,
                borderStyle: 'solid',
                borderWidth: 2,
                borderColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        mount(<GlyphsBlockWithStubs />);
        cy.get(ItemSelector).should('have.css', 'outline', 'rgb(240, 0, 0) solid 2px');
    });

    it('renders a glyphs block with custom radius', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {
            blockSettings: {
                radiusChoice: 'custom',
                hasRadius: true,
                radiusValue: 10,
            },
        });

        mount(<GlyphsBlockWithStubs />);
        cy.get(ItemSelector).first().should('have.css', 'border-top-left-radius', '10px');
        cy.get(ItemSelector).eq(5).should('have.css', 'border-top-right-radius', '10px');
        cy.get(ItemSelector).eq(30).should('have.css', 'border-bottom-left-radius', '10px');
        cy.get(ItemSelector).last().should('have.css', 'border-bottom-right-radius', '10px');
    });

    it('renders a glyphs block with custom background', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {
            blockSettings: {
                hasBackground: true,
                backgroundColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        mount(<GlyphsBlockWithStubs />);
        cy.get(ItemSelector).should('have.css', 'background-color', 'rgb(240, 0, 0)');
    });

    it('renders a glyphs block with custom font', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {
            blockSettings: {
                fontFamily: 'Merriweather',
                fontWeight: 600,
                fontSize: 24,
                fontColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        mount(<GlyphsBlockWithStubs />);
        cy.get(BlockSelector).should('have.css', 'font-family', 'Merriweather');
        cy.get(BlockSelector).should('have.css', 'font-weight', '600');
        cy.get(BlockSelector).should('have.css', 'font-size', '24px');
        cy.get(BlockSelector).should('have.css', 'color', 'rgb(240, 0, 0)');
    });

    it('renders a glyphs block with uppercase and lowercase letters', () => {
        const [GlyphsBlockWithStubs] = withAppBridgeBlockStubs(GlyphsBlock, {
            blockSettings: {
                chars: 'A,&,2',
            },
        });

        mount(<GlyphsBlockWithStubs />);
        cy.get(ItemSelector).first().contains(/^Aa$/);
        cy.get(ItemSelector).eq(1).contains(/^&$/);
        cy.get(ItemSelector).eq(2).contains(/^2$/);
    });
});
