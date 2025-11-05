/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { Color } from '@frontify/fondue';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { Radius } from '@frontify/guideline-blocks-settings';

import { CodeSnippetBlock } from './CodeSnippetBlock';

const editorSelector = '.cm-editor';
const lineNumbersSelector = '.cm-lineNumbers';
const blockSelector = '[data-test-id="code-snippet-block"]';
const headerSelector = '[data-test-id="code-snippet-header"]';

const EXAMPLE_COLOR: Color = { red: 22, green: 181, blue: 181, name: 'Java' };

it('renders basic code snippet block', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {});

    mount(<CodeSnippetWithStubs />);
    cy.get(blockSelector).should('exist');
});

it('renders with Github Dark theme', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            theme: 'githubDark',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(editorSelector).should('have.css', 'background-color', 'rgb(13, 17, 23)');
});

it('renders without heading panel', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withHeading: false,
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get(headerSelector).should('not.exist');
});

it('renders with heading panel', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withHeading: true,
            language: 'typescript',
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get(headerSelector).contains('TypeScript');
});

it('renders with line numbers', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withRowNumbers: true,
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(lineNumbersSelector).should('exist');
});

it('renders without line numbers', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            withRowNumbers: false,
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(lineNumbersSelector).should('not.exist');
});

it('renders with border', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            hasBorder: true,
            borderWidth: '2px',
            borderStyle: 'Solid',
            borderColor: EXAMPLE_COLOR,
        },
    });
    mount(<CodeSnippetWithStubs />);
    cy.get(blockSelector).should('have.css', 'border', '2px solid rgb(22, 181, 181)');
});

it('renders with border radius', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            borderColor: EXAMPLE_COLOR,
            hasExtendedCustomRadius: false,
            extendedRadiusChoice: Radius.Large,
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(blockSelector).should('have.css', 'border-radius', '12px');
});

it('renders with custom border radius', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            borderRadius: '12px',
            borderColor: EXAMPLE_COLOR,
            hasExtendedCustomRadius: true,
            extendedRadiusTopLeft: '5px',
            extendedRadiusTopRight: '2px',
            extendedRadiusBottomRight: '10px',
            extendedRadiusBottomLeft: '8px',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(blockSelector).should('have.css', 'border-radius', '5px 2px 10px 8px');
});

it('renders with syntax highlighting for javascript', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        blockSettings: {
            language: 'javascript',
            content: 'const a = 1;',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get(editorSelector).find('.cm-line span').first().should('have.css', 'color', 'rgb(119, 0, 136)');
    cy.get(editorSelector).find('.cm-line span').eq(1).should('have.css', 'color', 'rgb(0, 0, 255)');
});

it('switches language from dropdown inside block', () => {
    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        editorState: true,
        blockSettings: {
            withHeading: true,
            language: 'html',
        },
    });

    mount(<CodeSnippetWithStubs />);
    cy.get('[data-test-id=fondue-select]').first().contains('HTML');
    cy.get('[data-test-id=fondue-select]').click();
    cy.get('[data-test-id=fondue-select-item]').eq(9).click({ force: true });
    cy.get('[data-test-id=fondue-select]').first().contains('JavaScript');
});

it('can copy using the copy button in the header', () => {
    const content = 'const a = 1;';

    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        editorState: true,
        blockSettings: {
            withHeading: true,
            language: 'javascript',
            content,
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get('[data-test-id=header-copy-button]').should('be.visible');
    cy.get('[data-test-id=header-copy-button]').contains('Copy').realClick();
    cy.get('[data-test-id=header-copy-button]').contains('Copied');
    cy.window()
        .its('navigator.clipboard')
        .invoke('readText')
        .then(async (text) => {
            expect(await text).to.eq(content);
        });
});

it('can copy using the copy button without a header', () => {
    const content = `const counter = function() {
        let count = 0;
        return function() {
            return ++count;
        }
    };`;

    const [CodeSnippetWithStubs] = withAppBridgeBlockStubs(CodeSnippetBlock, {
        editorState: true,
        blockSettings: {
            language: 'javascript',
            content,
        },
    });

    mount(<CodeSnippetWithStubs />);

    cy.get('[data-test-id=code-snippet-block]').realHover();
    cy.get('[data-test-id=copy-button]').should('be.visible');
    cy.get('[data-test-id=copy-button]').realHover();
    cy.get('[data-test-id=fondue-tooltip-content]').should('exist');
    cy.get('[data-test-id=fondue-tooltip-content]').contains('Copy to clipboard');
    cy.get('[data-test-id=copy-button]').click();
    cy.window()
        .its('navigator.clipboard')
        .invoke('readText')
        .then(async (text) => {
            expect(await text).to.eq(content);
        });
    cy.get('[data-test-id=fondue-tooltip-content]').contains('Copied');
});
