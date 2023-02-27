/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextBlock } from './TextBlock';
import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { PLACEHOLDER } from './settings';

const TextBlockSelectorHtml = '[data-test-id="rte-content-html"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

const defaultContent = [
    {
        type: 'p',
        children: [{ text: 'Rich Text Editor Value' }],
    },
    {
        type: 'p',
        children: [
            {
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione omnis repellendus at recusandae voluptatibus libero, voluptate sed consequatur, voluptates minus labore. Iusto cum consectetur mollitia sapiente alias ipsam iure reiciendis?',
            },
        ],
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
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {});

        mount(<TextBlockWithStubs />);
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
});
