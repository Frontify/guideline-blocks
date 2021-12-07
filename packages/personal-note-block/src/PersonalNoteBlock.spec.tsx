/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import PersonalNoteBlock from '.';
import { NoteBorderStyle } from './types';

const PersonalNoteBlockSelector = '[data-test-id="personal-note-block"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

const EXAMPLE_COLOR = {
    rgba: { r: 22, g: 181, b: 181, a: 1 },
    name: 'Java',
    hex: '#16b5b5',
};

const EXAMPLE_COLOR_DARK = {
    rgba: { r: 46, g: 95, b: 159, a: 1 },
    name: 'St Tropaz',
    hex: '#2e5f9f',
};

it('renders a personal note block', () => {
    const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {});

    mount(<PersonalNoteBlockWithStubs />);
    cy.get(PersonalNoteBlockSelector).should('exist');
});

it('write content to personal note block', () => {
    const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, { editorState: true });

    mount(<PersonalNoteBlockWithStubs />);
    cy.get(RichTextEditor).find('[contenteditable=true]').type('Hello world');
});

it('renders personal note block with correct styling (and light text color)', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {
        blockSettings: {
            hasCustomBorderRadius: true,
            borderRadiusValue: '5px',
            borderSelection: [NoteBorderStyle.Dashed, '2px', EXAMPLE_COLOR],
            hasBackground: true,
            backgroundColor: EXAMPLE_COLOR_DARK,
        },
    });

    mount(<StorybookBlockWithStubs />);
    cy.get(PersonalNoteBlockSelector).should('have.css', 'border-style', 'dashed');
    cy.get(PersonalNoteBlockSelector).should('have.css', 'border-width', '2px');
    cy.get(PersonalNoteBlockSelector).should('have.css', 'border-color', 'rgb(22, 181, 181)');
    cy.get(PersonalNoteBlockSelector).should('have.css', 'border-radius', '5px');
    cy.get(PersonalNoteBlockSelector).should('have.css', 'background-color', 'rgb(46, 95, 159)');
    cy.get(PersonalNoteBlockSelector).should('have.class', 'tw-text-white');
});
