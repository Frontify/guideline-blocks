/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { Color } from '@frontify/fondue';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { CodeSnippetBlock } from './CodeSnippetBlock';

const codeSnippetEditorSelector = '.cm-editor';
const codeSnippetLineNumbersSelector = '.cm-lineNumbers';
const codeSnippetBlockSelector = '[data-test-id="code-snippet-block"]';
const codeSnippetHeaderSelector = '[data-test-id="code-snippet-header"]';

const EXAMPLE_COLOR: Color = { red: 22, green: 181, blue: 181, name: 'Java' };

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
            lineWidth: '2px',
            lineStyle: 'solid',
            borderColor: EXAMPLE_COLOR,
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'border', '2px solid rgb(22, 181, 181)');
});

it('renders code snippet with border radius', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withBorder: true,
            lineWidth: '2px',
            lineStyle: 'solid',
            borderRadius: '12px',
            borderColor: EXAMPLE_COLOR,
            withCustomBorderRadius: false,
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'border-radius', '12px');
});

it('renders code snippet with custom border radius', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withBorder: true,
            lineWidth: '2px',
            lineStyle: 'solid',
            borderRadius: '12px',
            borderColor: EXAMPLE_COLOR,
            withCustomBorderRadius: true,
            borderRadiusTopLeft: '5px',
            borderRadiusTopRight: '2px',
            borderRadiusBottomRight: '10px',
            borderRadiusBottomLeft: '8px',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'border-radius', '5px 2px 10px 8px');
});

it('renders code snippet with margin', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withCustomPadding: false,
            margin: '60px',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'margin', '60px');
});

it('renders code snippet with custom margin', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withCustomMargin: true,
            marginTop: '5px',
            marginLeft: '25px',
            marginRight: '15px',
            marginBottom: '60px',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(codeSnippetEditorSelector).should('have.css', 'margin', '5px 15px 60px 25px');
});
