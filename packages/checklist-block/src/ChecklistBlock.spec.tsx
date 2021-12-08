/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import ChecklistBlock from '.';
import { ChecklistContent, ChecklistItemMode } from './types';
import { createItem } from './utilities/contentHelpers';

const CHECKLIST_BLOCK_SELECTOR = '[data-test-id="checklist-block"]';
const CHECKLIST_ITEM = '[data-test-id="checklist-item"]';
const COMPLETED_VISIBILITY_BUTTON = '[data-test-id="toggle-completed-visibility"]';
const CHECKLIST_ITEM_CREATOR = `[data-test-id="checklist-item"][data-mode=${ChecklistItemMode.Create}]`;
const CHECKLIST_CONTAINER = '[data-test-id="checklist-container"]';
const TEXT_EDITOR = '[data-test-id="text-editor"]';

const createContentArray = (length: number, fixedParams?: Partial<ChecklistContent>) => {
    const createRandomItem = (fixedParams?: Partial<ChecklistContent>) => {
        const item = createItem('text');
        item.completed = Math.random() > 0.5;
        return { ...item, ...fixedParams };
    };
    return new Array(length).fill(0).map(() => createRandomItem(fixedParams));
};

it('Renders a checklist block', () => {
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {});

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_BLOCK_SELECTOR).should('exist');
});

it('Displays the correct number of checklist items in View Mode', () => {
    const length = Math.ceil(Math.random() * 10);
    const contentArray = createContentArray(length);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, { blockSettings: { content: contentArray } });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_ITEM).should('have.length', length);
});

it('Displays the correct number of checklist items in Edit Mode', () => {
    const length = Math.ceil(Math.random() * 10);
    const contentArray = createContentArray(length);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: true,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', length);
});

it('Allows users to create new item in Edit Mode', () => {
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: [] },
        editorState: true,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 0);
    cy.get(CHECKLIST_ITEM_CREATOR).should('be.visible').find(TEXT_EDITOR).type('Test{Enter}', { force: true });
    cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 1);
    cy.get(CHECKLIST_ITEM_CREATOR).should('be.visible').find(TEXT_EDITOR).should('have.value', '');
});

it('Hides creator in View Mode', () => {
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: [] },
        editorState: false,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_ITEM_CREATOR).should('not.exist');
});

it('Can hide/show completed tasks in View mode', () => {
    const completedItems = createContentArray(5, { completed: true });
    const incompleteItems = createContentArray(5, { completed: false });
    const contentArray = [...completedItems, ...incompleteItems];
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, { blockSettings: { content: contentArray } });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_ITEM).should('have.length', 10);
    cy.get('[checked]').should('have.length', 5);
    cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
    cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
    cy.get(COMPLETED_VISIBILITY_BUTTON).should('be.visible');
    cy.get(COMPLETED_VISIBILITY_BUTTON)
        .find('button')
        .then(($button) => {
            const text = $button.text();
            expect(text).to.match(/Hide/);
            cy.wrap($button).click();
        });
    cy.get(CHECKLIST_ITEM).should('have.length', 5);
    cy.get('[checked]').should('have.length', 0);
});

it('Cannot hide/show completed tasks in Edit mode', () => {
    const completedItems = createContentArray(5, { completed: true });
    const incompleteItems = createContentArray(5, { completed: false });
    const contentArray = [...completedItems, ...incompleteItems];
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: true,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
    cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
    cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
});
