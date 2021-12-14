/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import DividerBlock from '.';
import { DividerAlignment, DividerHeight, DividerStyle } from './types';

const DividerBlockSelector = '[data-test-id="divider-block"]';
const DividerWrapper = '[data-test-id="divider-wrapper"]';
const DividerLine = '[data-test-id="divider-line"]';

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
