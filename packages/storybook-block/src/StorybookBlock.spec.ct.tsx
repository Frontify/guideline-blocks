/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';

import { StorybookBlock } from './StorybookBlock';
import { ERROR_MSG } from './settings';
import { StorybookBorderStyle, StorybookHeight, StorybookPosition, StorybookStyle, heights } from './types';

const StorybookBlockSelector = '[data-test-id="storybook-block"]';
const EmptyStateSelector = '[data-test-id="storybook-empty-wrapper"]';
const IframeSelector = '[data-test-id="storybook-iframe"]';
const ResizeBar = '[data-test-id="resize-bar"]';
const ResizableChildrenContainer = '[data-test-id="resizable-children-container"]';

const EXAMPLE_URL = 'https://beta-fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
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
        cy.get(IframeSelector).should('have.attr', 'src').and('include', 'beta-fondue-components.frontify.com');
        cy.get(IframeSelector).should('have.attr', 'loading').and('include', 'lazy');
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

    it('renders error handling when invalid url is typed after pressing enter', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, { editorState: true });

        mount(<StorybookBlockWithStubs />);
        cy.get(EmptyStateSelector).find('input').type('asdf').type('{Enter}');
        cy.get(EmptyStateSelector).contains(ERROR_MSG);
    });

    it('should not render iframe with invalid url', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            editorState: true,
            blockSettings: { url: 'asdf' },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(EmptyStateSelector);
        cy.get(EmptyStateSelector).find('button').click();
        cy.get(EmptyStateSelector).contains(ERROR_MSG);
    });

    it('should resize empty container', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            editorState: true,
            blockSettings: { url: '', heightChoice: StorybookHeight.Small },
        });

        mount(<StorybookBlockWithStubs />);

        cy.get(ResizableChildrenContainer).should('have.css', 'height', '200px');

        cy.get(ResizeBar)
            .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
            .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
            .trigger('mouseup', { force: true });

        cy.get(ResizableChildrenContainer).should('have.css', 'height', '700px');

        cy.get(ResizeBar)
            .trigger('mousedown', { which: 1, pageX: 600, pageY: 600 })
            .trigger('mousemove', { which: 1, pageX: 600, pageY: 100 })
            .trigger('mouseup', { force: true });

        cy.get(ResizableChildrenContainer).should('have.css', 'height', '200px');
    });

    it('renders without resize bar in view mode', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            blockSettings: { url: '', heightChoice: StorybookHeight.Small },
        });

        mount(<StorybookBlockWithStubs />);
        cy.get(ResizeBar).should('not.exist');
    });

    it('should resize iframe and renders correct styling', () => {
        const [StorybookBlockWithStubs] = withAppBridgeBlockStubs(StorybookBlock, {
            editorState: true,
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

        cy.get(ResizableChildrenContainer).should('have.css', 'height', '200px');
        cy.get(ResizeBar)
            .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
            .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
            .wait(1)
            .trigger('mouseup', { force: true });

        cy.get(ResizableChildrenContainer).should('have.css', 'height', '700px');

        cy.get(IframeSelector).should('have.attr', 'height', '700px');
    });
});
