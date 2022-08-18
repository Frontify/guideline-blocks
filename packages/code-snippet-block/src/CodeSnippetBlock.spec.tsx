/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { CodeSnippetBlock } from './CodeSnippetBlock';

const codeSnippetBlockSelector = '[data-test-id="code-snippet-block"]';
const codeSnippetHeaderSelector = '[data-test-id="code-snippet-header"]';
const codeSnippetLineNumbersSelector = '.cm-lineNumbers';
const codeSnippetEditorSelector = '.cm-editor';

const EXAMPLE_COLOR = { r: 22, g: 181, b: 181, name: 'Java' };

it('renders basic code snippet', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {});

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetBlockSelector).should('exist');
});

it('renders basic code snippet with cobalt theme', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            theme: 'cobalt',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'background-color', 'rgb(25, 53, 73)');
});

it('renders code snippet without heading panel', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withHeading: false,
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get(codeSnippetHeaderSelector).should('not.exist');
});

it('renders code snippet with heading panel', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withHeading: true,
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get(codeSnippetHeaderSelector).should('exist');
});

it('renders code snippet heading panel with language title', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withHeading: true,
            language: 'ts',
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetHeaderSelector).should('exist').contains('TS');
});

it('renders code snippet with line numbers', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withRowNumbers: true,
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetLineNumbersSelector).should('exist');
});

it('renders code snippet with border', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withBorder: true,
            border: ['solid', '2px', EXAMPLE_COLOR],
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'border', '2px solid rgb(22, 181, 181)');
});

it('renders code snippet with border radius', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withBorder: true,
            withCustomBorderRadius: false,
            border: ['solid', '2px', EXAMPLE_COLOR],
            borderRadius: '12px',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'border-radius', '12px');
});

it('renders code snippet with padding', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withCustomPadding: false,
            padding: '6rem',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'padding', '96px');
});
