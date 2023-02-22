/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import React from 'react';
import { RichTextEditorToHtml } from './RichTextEditorToHtml';

const TextBlockSelectorHtml = '[data-test-id="rte-content-html"]';
const defaultContent = [
    {
        type: 'p',
        children: [{ text: 'Rich Text Editor Value' }],
    },
];
describe('Display plain html from RTE values', () => {
    it('renders html content with RichTextEditor content passed', () => {
        const [RichTextEditorToHtmlWithStubs] = withAppBridgeBlockStubs(RichTextEditorToHtml, {});

        mount(<RichTextEditorToHtmlWithStubs content={JSON.stringify(defaultContent)} />);
        cy.get(TextBlockSelectorHtml).should('have.text', 'Rich Text Editor Value');
    });

    it('renders html content with html passed', () => {
        const [RichTextEditorToHtmlWithStubs] = withAppBridgeBlockStubs(RichTextEditorToHtml, {});

        mount(<RichTextEditorToHtmlWithStubs content={'<p>Html Text</p>'} />);
        cy.get(TextBlockSelectorHtml).should('have.text', 'Html Text');
    });

    it('renders html content with string only passed', () => {
        const [RichTextEditorToHtmlWithStubs] = withAppBridgeBlockStubs(RichTextEditorToHtml, {});

        mount(<RichTextEditorToHtmlWithStubs content={'string'} />);
        cy.get(TextBlockSelectorHtml).should('have.text', 'string');
    });

    it('renders html content with correct stylings', () => {
        const [RichTextEditorToHtmlWithStubs] = withAppBridgeBlockStubs(RichTextEditorToHtml, {});

        mount(<RichTextEditorToHtmlWithStubs columnGap={'10px'} columns={2} content={'hoi'} />);
        cy.get(TextBlockSelectorHtml).should('have.css', 'columns', 'auto 2').and('have.css', 'column-gap', '10px');
    });
});
