/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import StorybookBlock from '.';
import { StorybookBorderStyle, StorybookHeight, StorybookPosition, StorybookStyle } from './types';

const StorybookBlockSelector = '[data-test-id="storybook-block"]';
const EmptyStateSelector = '[data-test-id="storybook-empty-wrapper"]';
const IframeSelector = '[data-test-id="storybook-iframe"]';

const EXAMPLE_URL = 'https://arcade-components.netlify.app/?path=/story/components-tooltip--tooltip';
const EXAMPLE_COLOR = {
    rgba: { r: 22, g: 181, b: 181, a: 1 },
    name: 'Java',
    hex: '#16b5b5',
};

it('renders a storybook block', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, {});

    mount(<StorybookBlockWithStubs />);
    cy.get(StorybookBlockSelector).should('exist');
});

it('saves a storybook url and shows iframe', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, { editorState: true });

    mount(<StorybookBlockWithStubs />);
    cy.get(EmptyStateSelector).find('input').type(EXAMPLE_URL);
    cy.get(EmptyStateSelector).find('button').click();
    cy.get(IframeSelector).should('have.attr', 'src').and('include', EXAMPLE_URL);
});

it('renders storybook iframe without addons', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, {
        blockSettings: { url: EXAMPLE_URL, style: StorybookStyle.WithoutAddons },
    });

    mount(<StorybookBlockWithStubs />);
    cy.get(IframeSelector).should('have.attr', 'src').and('include', 'panel=false');
});

it('renders storybook iframe with addons panel at the bottom', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, {
        blockSettings: { url: EXAMPLE_URL, style: StorybookStyle.Default, positioning: StorybookPosition.Vertical },
    });

    mount(<StorybookBlockWithStubs />);
    cy.get(IframeSelector).should('have.attr', 'src').and('include', 'panel=bottom');
});

it('renders storybook iframe with correct styling', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, {
        blockSettings: {
            url: EXAMPLE_URL,
            hasCustomBorderRadius: true,
            borderRadiusValue: '5px',
            borderSelection: [StorybookBorderStyle.Dotted, '2px', EXAMPLE_COLOR],
            heightChoice: StorybookHeight.Small,
        },
    });

    mount(<StorybookBlockWithStubs />);
    cy.get(IframeSelector).should('have.attr', 'height', '400px');
    cy.get(IframeSelector).should('have.css', 'border-style', 'dotted');
    cy.get(IframeSelector).should('have.css', 'border-width', '2px');
    cy.get(IframeSelector).should('have.css', 'border-color', 'rgb(22, 181, 181)');
    cy.get(IframeSelector).should('have.css', 'border-radius', '5px');
});
