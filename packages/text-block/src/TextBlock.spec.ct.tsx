/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextBlock } from './TextBlock';
import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

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
    });

    it('should render a text block with the correct amount of columns and correct spacing', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(TextBlock, {
            blockSettings: {
                columnNumber: 4,
                content:
                    'Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. Hello, this is my text. ',
                isColumnGutterCustom: true,
                columnGutterCustom: '13px',
            },
        });
        mount(<TextBlockWithStubs />);
        cy.get(TextBlockSelector).should('have.class', 'lg:tw-columns-4');
        cy.get(TextBlockSelector).should('have.css', 'gap', '13px');
    });
});
