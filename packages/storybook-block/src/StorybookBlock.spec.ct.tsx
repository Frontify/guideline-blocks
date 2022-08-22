/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ERROR_MSG } from './settings';
import { StorybookBlock } from './StorybookBlock';
import { StorybookBorderStyle, StorybookHeight, StorybookPosition, StorybookStyle, heights } from './types';

const StorybookBlockSelector = '[data-test-id="storybook-block"]';
const EmptyStateSelector = '[data-test-id="storybook-empty-wrapper"]';
const IframeSelector = '[data-test-id="storybook-iframe"]';

const EXAMPLE_URL = 'https://fondue-components.netlify.app/?path=/story/components-tooltip--tooltip';
const EXAMPLE_COLOR = { red: 22, green: 181, blue: 181, alpha: 1, name: 'Java' };

describe('Storybook Block', () => {
    it('renders a storybook block', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {});

        mount(<StorybookBlockWithStubs />);
        cy.get(StorybookBlockSelector).should('exist');
    });

    it('saves a storybook url and shows iframe', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, { editorState: true });

        mount(<StorybookBlockWithStubs />);
        cy.get(EmptyStateSelector).find('input').type(EXAMPLE_URL).blur();
        cy.get(EmptyStateSelector).find('button').click();
        cy.get(IframeSelector).should('have.attr', 'src').and('include', 'fondue-components.netlify.app');
    });

    it('renders storybook iframe without addons', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            blockSettings: { url: EXAMPLE_URL, style: StorybookStyle.Default },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(IframeSelector).should('have.attr', 'src').and('include', 'panel=false');
    });

    it('renders storybook iframe with addons panel at the bottom', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            blockSettings: {
                url: EXAMPLE_URL,
                style: StorybookStyle.WithAddons,
                positioning: StorybookPosition.Vertical,
            },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(IframeSelector).should('have.attr', 'src').and('include', 'panel=bottom');
    });

    it('renders storybook iframe with correct styling', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            blockSettings: {
                url: EXAMPLE_URL,
                hasRadius: true,
                radiusValue: '5px',
                borderColor: EXAMPLE_COLOR,
                borderStyle: StorybookBorderStyle.Dotted,
                borderWidth: '2px',
                heightChoice: StorybookHeight.Small,
            },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(IframeSelector).should('have.attr', 'height', heights[StorybookHeight.Small]);
        cy.get(IframeSelector).should('have.css', 'border-style', 'dotted');
        cy.get(IframeSelector).should('have.css', 'border-width', '2px');
        cy.get(IframeSelector).should('have.css', 'border-color', 'rgb(22, 181, 181)');
        cy.get(IframeSelector).should('have.css', 'border-radius', '5px');
    });

    it('renders error handling when invalid url is typed', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, { editorState: true });

        mount(<StorybookBlockWithStubs />);
        cy.get(EmptyStateSelector).find('input').type('asdf');
        cy.get(EmptyStateSelector).contains(ERROR_MSG);
        cy.get(EmptyStateSelector).find('button').should('be.disabled');
    });

    it('should not render iframe with invalid url', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            editorState: true,
            blockSettings: { url: 'asdf' },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(EmptyStateSelector);
        cy.get(EmptyStateSelector).find('button').should('be.disabled');
        cy.get(EmptyStateSelector).contains(ERROR_MSG);
    });
});
