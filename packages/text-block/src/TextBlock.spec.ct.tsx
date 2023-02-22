/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextBlock } from './TextBlock';
import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { PLACEHOLDER } from './settings';
import { TextGutter } from './types';

const TextBlockSelectorHtml = '[data-test-id="rte-content-html"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

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

    it('should render correct columns and gap in view mode', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: {
                columnNumber: 2,
                isColumnGutterCustom: false,
                columnGutterSimple: TextGutter.S,
            },
        });

        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelectorHtml).should('have.css', 'columns', 'auto 2').and('have.css', 'column-gap', '10px');
    });

    it('placeholder should be visible when there is no content', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            editorState: true,
        });
        mount(<TextBlockWithStubs />);
        cy.get(RichTextEditor).find('[contenteditable=true]').contains(PLACEHOLDER);
    });
});
