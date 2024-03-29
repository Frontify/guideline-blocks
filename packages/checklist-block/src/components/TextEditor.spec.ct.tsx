/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { TextEditorProps } from '../types';
import { TextEditor } from './TextEditor';

const TEXT_EDITOR = '[data-test-id="text-editor"]';
const TEXT_VALUE = 'TEXT';

const DefaultTextEditor = (props: Partial<TextEditorProps>) => {
    const defaults = { value: 'text', onTextModified: cy.stub(), resetOnSave: false };
    const textEditorProps = { ...defaults, ...props };

    return <TextEditor {...textEditorProps} />;
};

describe('Text Editor', () => {
    it('Renders a TextEditor', () => {
        mount(<DefaultTextEditor />);
        cy.get(TEXT_EDITOR).should('exist');
    });

    it('Submits value when blurred', () => {
        const stubbedOnTextModified = cy.stub().as('onTextModified');
        mount(<DefaultTextEditor onTextModified={stubbedOnTextModified} />);
        cy.get(TEXT_EDITOR).focus();
        cy.get(TEXT_EDITOR).clear().type(TEXT_VALUE);
        cy.get(TEXT_EDITOR).blur();
        cy.get('@onTextModified').should('have.been.calledWithExactly', TEXT_VALUE);
        cy.get(TEXT_EDITOR).should('have.text', TEXT_VALUE);
    });

    it('Submits value on Enter', () => {
        const stubbedOnTextModified = cy.stub().as('onTextModified');
        mount(<DefaultTextEditor onTextModified={stubbedOnTextModified} />);
        cy.get(TEXT_EDITOR).focus();
        cy.get(TEXT_EDITOR).clear().type(`${TEXT_VALUE}{Enter}`);
        cy.get('@onTextModified').should('have.been.calledWithExactly', TEXT_VALUE);
        cy.get(TEXT_EDITOR).should('have.text', TEXT_VALUE);
    });

    it('Clears value on blur if resetOnSave is true', () => {
        mount(<DefaultTextEditor resetOnSave={true} />);
        cy.get(TEXT_EDITOR).focus();
        cy.get(TEXT_EDITOR).clear().type(TEXT_VALUE);
        cy.get(TEXT_EDITOR).blur();
        cy.get(TEXT_EDITOR).should('have.text', '');
    });

    it('Prevents editing if readonly is true', () => {
        mount(<DefaultTextEditor readonly={true} />);
        cy.get(TEXT_EDITOR).invoke('attr', 'contenteditable').should('equal', 'false');
    });
});
