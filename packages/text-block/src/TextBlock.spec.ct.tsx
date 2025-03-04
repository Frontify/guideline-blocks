/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextBlock } from './TextBlock';
import { mount } from 'cypress/react18';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { PLACEHOLDER } from './settings';

const TextBlockSelectorHtml = '[data-test-id="rte-content-html"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

const defaultContent = [
    {
        type: 'p',
        children: [{ text: 'Rich Text Editor Value' }],
    },
];

describe('Text Block', () => {
    it('renders a text block', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: true,
        });

        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).should('exist');
    });

    it('should not be able to input to a text block when in view mode', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: { content: JSON.stringify(defaultContent) },
        });

        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).should('not.exist');
        cy.get(TextBlockSelectorHtml).should('exist');
    });

    it('placeholder should be visible when there is no content', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: true,
        });
        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).find('[contenteditable=true]').contains(PLACEHOLDER);
    });

    // renders html in view mode
    it('renders html content with RichTextEditor content passed', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: { content: JSON.stringify(defaultContent) },
        });

        mount(<TextBlockWithStubs />);

        cy.get(TextBlockSelectorHtml).should('have.text', 'Rich Text Editor Value');
    });

    it('renders html content with html passed', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: { content: '<p>Html Text</p>' },
        });

        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelectorHtml).should('have.text', 'Html Text');
    });

    it('renders html content with string only passed', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: { content: 'string' },
        });

        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelectorHtml).should('have.text', 'string');
    });

    it('should have a minimum height of 36px when editing mode is on', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: true,
        });

        mount(<TextBlockWithStubs />);

        cy.get('.text-block').should('have.css', 'min-height', '36px');
    });

    it('should not have a minimum height of 36px when editing mode is of', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: false,
        });

        mount(<TextBlockWithStubs />);

        cy.get('.text-block').should('not.have.css', 'min-height', '36px');
    });
});
