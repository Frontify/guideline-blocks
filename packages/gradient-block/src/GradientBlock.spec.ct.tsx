/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { GradientBlock } from './GradientBlock';

const GradientBlockSelector = '[data-test-id="gradient-block"]';
const SquareBadgesSelector = '[data-test-id="square-badge"]';

const GradientColor = [
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 50,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 100,
    },
];

describe('Gradient Block', () => {
    it('renders a gradient block', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock);

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockSelector).should('exist');
    });

    it('renders three SquareBadges', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                colors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(SquareBadgesSelector).should('have.length', 2);
    });
});
