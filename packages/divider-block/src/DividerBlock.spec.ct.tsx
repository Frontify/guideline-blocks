/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/app-bridge';
import { DividerBlock } from './DividerBlock';
import { DividerAlignment, DividerHeight, DividerStyle } from './types';

const DividerBlockSelector = '[data-test-id="divider-block"]';
const DividerWrapper = '[data-test-id="divider-wrapper"]';
const DividerLine = '[data-test-id="divider-line"]';

const EXAMPLE_COLOR = { r: 22, g: 181, b: 181, a: 1, name: 'Java' };

describe('DividerBlock', () => {
    it('renders a divider block', () => {
        const [DividerBlockWithStubs] = withAppBridgeStubs(DividerBlock, {});

        mount(<DividerBlockWithStubs />);
        cy.get(DividerBlockSelector).should('exist');
    });

    it('renders a divider block without line', () => {
        const [DividerBlockWithStubs] = withAppBridgeStubs(DividerBlock, {
            blockSettings: {
                isLine: DividerStyle.NoLine,
            },
        });

        mount(<DividerBlockWithStubs />);
        cy.get(DividerLine).should('have.class', 'tw-border-none');
    });

    it('renders a divider block with the correct layout', () => {
        const [DividerBlockWithStubs] = withAppBridgeStubs(DividerBlock, {
            blockSettings: {
                alignment: DividerAlignment.Center,
                heightSimple: DividerHeight.Medium,
            },
        });

        mount(<DividerBlockWithStubs />);
        cy.get(DividerBlockSelector).should('have.class', 'tw-justify-center');
        cy.get(DividerWrapper).should('have.css', 'height').and('eq', '60px');
    });

    it('renders a divider block with the correct styling', () => {
        const [DividerBlockWithStubs] = withAppBridgeStubs(DividerBlock, {
            blockSettings: {
                color: EXAMPLE_COLOR,
                style: DividerStyle.Dashed,
                thicknessSimple: DividerHeight.Large,
            },
        });

        mount(<DividerBlockWithStubs />);
        cy.get(DividerLine).should('have.class', 'tw-border-dashed');
        cy.get(DividerLine).should('have.css', 'border-top-width', '4px');
        cy.get(DividerLine).should('have.css', 'border-top-color', 'rgb(22, 181, 181)');
    });
});
