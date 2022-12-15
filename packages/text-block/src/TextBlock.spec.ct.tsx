/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextBlock } from './TextBlock';
import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { PLACEHOLDER } from './settings';

const TextBlockSelector = '[data-test-id="text-block"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

describe('Text Block', () => {
    it('renders a text block', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {});

        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelector).should('exist');
    });

    it('should not be able to input to a text block when in view mode', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {});

        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).find('[contenteditable=true]').should('not.exist');
        cy.get(RichTextEditor).find('[contenteditable=false]').should('not.have.text', 'Your text here');
    });

    it('should render a text block with the correct amount of columns and correct custom spacing', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: {
                columnNumber: 2,
                content:
                    '[{"type":"p","children":[{"text":"Text "}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""}]}]',
                isColumnGutterCustom: false,
                columnGutterSimple: '24px',
            },
        });
        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelector).should('have.class', 'lg:tw-columns-2');
        cy.get(TextBlockSelector).should('have.css', 'gap', '24px');
    });

    it('should render a text block with the correct amount of columns and correct custom spacing', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: {
                columnNumber: 4,
                content:
                    '[{"type":"p","children":[{"text":"Text "}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""}]}]',
                isColumnGutterCustom: true,
                columnGutterCustom: '13px',
            },
        });
        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelector).should('have.class', 'lg:tw-columns-4');
        cy.get(TextBlockSelector).should('have.css', 'gap', '13px');
    });

    it('placeholder should be visible when there is no content', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: true,
            blockSettings: {
                columnNumber: 2,
                isColumnGutterCustom: false,
                columnGutterSimple: '24px',
            },
        });
        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).find('[contenteditable=true]').contains(PLACEHOLDER);
    });
});
