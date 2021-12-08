/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import ChecklistBlock from '.';
import { ChecklistContent, ChecklistItemMode, ProgressBarType } from './types';
import { createItem } from './utilities/contentHelpers';

const CHECKLIST_BLOCK_SELECTOR = '[data-test-id="checklist-block"]';
const CHECKLIST_ITEM = '[data-test-id="checklist-item"]';
const COMPLETED_VISIBILITY_BUTTON = '[data-test-id="toggle-completed-visibility"]';
const CHECKLIST_ITEM_CREATOR = `[data-test-id="checklist-item"][data-mode=${ChecklistItemMode.Create}]`;
const CHECKLIST_CONTAINER = '[data-test-id="checklist-container"]';
const TEXT_EDITOR = '[data-test-id="text-editor"]';
const CONTROL_BUTTONS = '[data-test-id="control-buttons"]';
const PROGRESS_BAR = '[data-test-id="progress-bar"]';
const PROGRESS_HEADER_VALUE = '[data-test-id="progress-header-value"]';

const DRAGGABLE_ITEM = '[data-test-id=draggable-item]';
const INSERTION_INDICATOR = '[data-test-id=insertion-indicator]';

const randomInteger = (min: number, max: number) => Math.ceil(Math.random() * (max - min) + min);

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
    const length = randomInteger(0, 10);
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

it('Allows users to remove item in Edit Mode', () => {
    const contentArray = createContentArray(5);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: true,
    });
    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 5);
    cy.get(CONTROL_BUTTONS).first().find('button').last().focus().click();
    cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 4);
});

it('Allows users to move item up or down in Edit Mode', () => {
    const contentArray = createContentArray(3);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: true,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_CONTAINER)
        .find(DRAGGABLE_ITEM)
        .first()
        .then(($firstItem) => {
            const firstItemKey = $firstItem.attr('data-key');
            cy.wrap($firstItem).find(CONTROL_BUTTONS).find('button').eq(1).focus().click();
            cy.get(CHECKLIST_CONTAINER)
                .find(DRAGGABLE_ITEM)
                .first()
                .then(($newFirstItem) => {
                    const newFirstItemKey = $newFirstItem.attr('data-key');
                    expect(newFirstItemKey).not.to.equal(firstItemKey);
                });
        });
});

it('Disables List modifications in View Mode', () => {
    const contentArray = createContentArray(5);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: false,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_ITEM_CREATOR).should('have.length', 0);
    cy.get(CONTROL_BUTTONS)
        .find('button')
        .each(($button) => {
            expect($button).to.be.disabled;
        });
    cy.get(TEXT_EDITOR).invoke('attr', 'contenteditable').should('equal', 'false');
    cy.get(DRAGGABLE_ITEM).first().realPress('Space');
    cy.get(INSERTION_INDICATOR).should('have.length', 0);
});

it('Disables Up arrow if first item and Down arrow if last item', () => {
    const contentArray = createContentArray(3);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray },
        editorState: true,
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_CONTAINER)
        .find(CHECKLIST_ITEM)
        .first()
        .find(CONTROL_BUTTONS)
        .find('button')
        .each(($button, index) => {
            if (index === 0) {
                expect($button).to.be.disabled;
            } else {
                expect($button).not.to.be.disabled;
            }
        });
    cy.get(CHECKLIST_CONTAINER)
        .find(CHECKLIST_ITEM)
        .last()
        .find(CONTROL_BUTTONS)
        .find('button')
        .each(($button, index) => {
            if (index === 1) {
                expect($button).to.be.disabled;
            } else {
                expect($button).not.to.be.disabled;
            }
        });
});

it('Can hide/show completed tasks in View mode', () => {
    const completedItems = createContentArray(5, { completed: true });
    const incompleteItems = createContentArray(5, { completed: false });
    const contentArray = [...completedItems, ...incompleteItems];
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, { blockSettings: { content: contentArray } });

    mount(<ChecklistBlockWithStubs />);
    cy.get(CHECKLIST_ITEM).should('have.length', 10);
    cy.get('[checked]').should('have.length', 5);
    cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
    cy.get(COMPLETED_VISIBILITY_BUTTON).should('be.visible');
    cy.get(COMPLETED_VISIBILITY_BUTTON)
        .find('button')
        .should('be.visible')
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

it('Hides progress bar if no checklist items', () => {
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: [], progressBarType: ProgressBarType.Bar, progressBarVisible: true },
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(PROGRESS_BAR).should('have.length', 0);
});

it('Shows progress bar if setting is true and checklist is not empty', () => {
    const contentArray = createContentArray(1);
    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray, progressBarType: ProgressBarType.Bar, progressBarVisible: true },
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(PROGRESS_BAR).should('be.visible', 1);
});

it('Correctly displays calculated percentage in fraction', () => {
    const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
    const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
    const contentArray = [...completedItems, ...incompleteItems];

    const completedLength = completedItems.length;
    const totalLength = contentArray.length;

    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray, progressBarType: ProgressBarType.Fraction, progressBarVisible: true },
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${completedLength}/${totalLength}`);
});

it('Correctly displays calculated percentage in percentage', () => {
    const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
    const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
    const contentArray = [...completedItems, ...incompleteItems];

    const completedLength = completedItems.length;
    const totalLength = contentArray.length;
    const percentage = ((completedLength / totalLength) * 100).toFixed(0);

    const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
        blockSettings: { content: contentArray, progressBarType: ProgressBarType.Percentage, progressBarVisible: true },
    });

    mount(<ChecklistBlockWithStubs />);
    cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${percentage}%`);
});
