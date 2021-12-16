/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import TextBlock from '.';

const TextBlockSelector = '[data-test-id="text-block"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

it('renders a text block', () => {
    const [TextBlockWithStubs] = withAppBridgeStubs(TextBlock, {});

    mount(<TextBlockWithStubs />);
    cy.get(TextBlockSelector).should('exist');
});

it('should not be able to input to a text block when in view mode', () => {
    const [TextBlockWithStubs] = withAppBridgeStubs(TextBlock, {});

    mount(<TextBlockWithStubs />);
    cy.get(RichTextEditor).find('[contenteditable=true]').should('not.exist');
});

it('should not be able input to two text blocks when in edit mode', () => {
    const [TextBlockWithStubs] = withAppBridgeStubs(TextBlock, {
        blockSettings: {
            columnNumber: 2,
        },
        editorState: true,
    });

    mount(<TextBlockWithStubs />);
    cy.get(RichTextEditor).first().find('[contenteditable=true]').type('Hello, this is my text.').blur();
    cy.get(RichTextEditor).first().find('[contenteditable=true]').contains('Hello, this is my text.');
    cy.get(RichTextEditor).eq(1).find('[contenteditable=true]').type('And this is my other text.').blur();
    cy.get(RichTextEditor).eq(1).find('[contenteditable=true]').contains('And this is my other text.');
});

it('should render a text block with the correct amount of columns and correct spacing', () => {
    const [TextBlockWithStubs] = withAppBridgeStubs(TextBlock, {
        blockSettings: {
            columnNumber: 4,
            isColumnGutterCustom: true,
            columnGutterCustom: '13px',
        },
    });
    mount(<TextBlockWithStubs />);
    cy.get(RichTextEditor).should('have.length', 4);
    cy.get(TextBlockSelector).should('have.class', 'tw-grid-cols-4');
    cy.get(TextBlockSelector).should('have.css', 'gap', '13px');
});
