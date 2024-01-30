/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { LegacyOrderableListItem } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-settings';
import { mount } from 'cypress/react18';
import { ChecklistBlock } from './ChecklistBlock';
import { createItem } from './helpers';
import {
    ChecklistContent,
    ChecklistDecoration,
    ChecklistItemMode,
    ProgressBarType,
    Settings,
    StrikethroughStyleType,
    StrikethroughType,
} from './types';
import { randomInteger } from './utilities';

const CHECKLIST_BLOCK_SELECTOR = '[data-test-id="checklist-block"]';
const CHECKLIST_ITEM = '[data-test-id="checklist-item"]';
const COMPLETED_VISIBILITY_BUTTON = '[data-test-id="toggle-completed-visibility"]';
const CHECKLIST_ITEM_CREATOR = `[data-test-id="checklist-item"][data-mode=${ChecklistItemMode.Create}]`;
const CHECKLIST_CONTAINER = '[data-test-id="checklist-container"]';
const TEXT_EDITOR = '[data-test-id="text-editor"]';
const CONTROL_BUTTONS = '[data-test-id="control-buttons"]';
const PROGRESS_BAR = '[data-test-id="progress-bar"]';
const PROGRESS_BAR_FILL = '[data-test-id="progress-bar-fill"]';
const PROGRESS_HEADER_VALUE = '[data-test-id="progress-header-value"]';
const CHECKBOX = '[data-test-id="checkbox"]';
const CHECKBOX_LABEL = '[data-test-id="checkbox-label"]';
const CHECKBOX_DATE = '[data-test-id="checkbox-date"]';

const DRAGGABLE_ITEM = '[data-test-id=draggable-item]';
const INSERTION_INDICATOR = '[data-test-id=insertion-indicator]';

const createContentArray = (length: number, fixedParams?: Partial<LegacyOrderableListItem<ChecklistContent>>) => {
    const createRandomItem = (fixedParams?: Partial<LegacyOrderableListItem<ChecklistContent>>) => {
        const item = createItem('text', null);

        item.completed = Math.random() > 0.5;
        return { ...item, ...fixedParams, key: item.id };
    };
    return Array.from({ length })
        .fill(0)
        .map(() => createRandomItem(fixedParams));
};

const testSettings: Settings = {
    content: [],
    textColor: { red: 45, green: 50, blue: 50, alpha: 1 },
    checkboxColor: { red: 108, green: 112, blue: 112, alpha: 1 },
    completeTextColor: { red: 255, green: 55, blue: 90, alpha: 1 },
    completeCheckboxColor: { red: 255, green: 55, blue: 90, alpha: 1 },
    completedDecoration: ChecklistDecoration.Strikethrough,
    highlightColor: { red: 190, green: 225, blue: 212, alpha: 1 },
    dateVisible: true,
    progressBarVisible: true,
    progressBarType: ProgressBarType.Bar,
    progressBarFillColor: { red: 0, green: 200, blue: 165, alpha: 1 },
    progressBarTrackColor: { red: 222, green: 240, blue: 233, alpha: 1 },
    strikethroughStyle: StrikethroughType.Dashed,
    strikethroughWidth: '5px',
    strikethroughColor: { red: 255, green: 55, blue: 90, alpha: 1 },
};

describe('Checklist Block', () => {
    it('Renders a checklist block', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {});

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_BLOCK_SELECTOR).should('exist');
    });

    it('Displays the correct number of checklist items in View Mode', () => {
        const length = randomInteger(0, 10);
        const content = createContentArray(length);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, { blockSettings: { content } });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_ITEM).should('have.length', length);
    });

    it('Displays the correct number of checklist items in Edit Mode', () => {
        const length = Math.ceil(Math.random() * 10);
        const content = createContentArray(length);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', length);
    });

    it('Allows users to create new item in Edit Mode', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
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
        const content = createContentArray(5);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 5);
        cy.get(CONTROL_BUTTONS).first().find('button').last().focus().click();
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 4);
    });

    it('Allows users to move item up or down in Edit Mode', () => {
        const content = createContentArray(3);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).first().realHover();
        cy.get(CHECKLIST_CONTAINER)
            .find(CHECKLIST_ITEM)
            .first()
            .then(($firstItem) => {
                const firstItemKey = $firstItem.data('key');
                cy.wrap($firstItem).find(CONTROL_BUTTONS).should('be.visible').find('button').eq(1).click();
                cy.get(CHECKLIST_CONTAINER)
                    .find(CHECKLIST_ITEM)
                    .first()
                    .then(($newFirstItem) => {
                        const newFirstItemKey = $newFirstItem.data('key');
                        expect(newFirstItemKey).not.to.equal(firstItemKey);
                    });
            });
    });

    //TODO: Tests should be there again as soon as OrderableList.spec.tsx has accessibility tests again

    // it('Allows users to move item with keyboard', () => {
    //     const content = createContentArray(3, { completed: false });
    //     const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
    //         blockSettings: { content },
    //         editorState: true,
    //     });

    //     mount(<ChecklistBlockWithStubs />);
    //     cy.window().focus();
    //     cy.get('body').realPress('Tab');
    //     cy.get(DRAGGABLE_ITEM)
    //         .first()
    //         .then(($firstItem) => {
    //             const firstItemKey = $firstItem.data('key');
    //             cy.wrap($firstItem).should('be.focused').realPress('ArrowLeft');
    //             cy.get(CONTROL_BUTTONS).first().find('button').last().should('be.focused').realPress('ArrowLeft');
    //             cy.get(CONTROL_BUTTONS).first().find('button').eq(1).should('be.focused').click();
    //             cy.get(CHECKLIST_CONTAINER)
    //                 .find(DRAGGABLE_ITEM)
    //                 .first()
    //                 .then(($newFirstItem) => {
    //                     const newFirstItemKey = $newFirstItem.data('key');
    //                     expect(newFirstItemKey).not.to.equal(firstItemKey);
    //                 });
    //             cy.get(CHECKLIST_CONTAINER)
    //                 .find(DRAGGABLE_ITEM)
    //                 .eq(1)
    //                 .then(($secondItem) => {
    //                     const secondItemKey = $secondItem.data('key');
    //                     expect(firstItemKey).to.equal(secondItemKey);
    //                 });
    //         });
    // });

    // it('Allows users to remove item with keyboard', () => {
    //     const length = randomInteger(3, 10);
    //     const content = createContentArray(length, { completed: false });
    //     const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
    //         blockSettings: { content },
    //         editorState: true,
    //     });

    //     mount(<ChecklistBlockWithStubs />);
    //     cy.window().focus();
    //     cy.get('body').realPress('Tab');
    //     cy.get(DRAGGABLE_ITEM)
    //         .should('have.length', length)
    //         .first()
    //         .then(($firstItem) => {
    //             const firstItemKey = $firstItem.data('key');
    //             cy.wrap($firstItem).should('be.focused').realPress('ArrowLeft');
    //             cy.get(CONTROL_BUTTONS).first().find('button').last().should('be.focused').click();
    //             cy.get(CHECKLIST_CONTAINER)
    //                 .find(DRAGGABLE_ITEM)
    //                 .should('have.length', length - 1)
    //                 .first()
    //                 .then(($newFirstItem) => {
    //                     const newFirstItemKey = $newFirstItem.data('key');
    //                     expect(newFirstItemKey).not.to.equal(firstItemKey);
    //                 });
    //         });
    // });

    // it('Allows users to create item with keyboard', () => {
    //     const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
    //         blockSettings: { content: [] },
    //         editorState: true,
    //     });

    //     mount(<ChecklistBlockWithStubs />);
    //     cy.window().focus();
    //     cy.get('body').realPress('Tab');
    //     cy.get(DRAGGABLE_ITEM).should('have.length', 0);
    //     cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused').type('TEXT{Enter}');
    //     cy.get(DRAGGABLE_ITEM).should('have.length', 1).find(TEXT_EDITOR).should('have.text', 'TEXT');
    //     cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused');
    //     cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused').type('{Enter}');
    //     cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('not.be.focused');
    // });

    it('Disables List modifications in View Mode', () => {
        const completedItems = createContentArray(1, { completed: true });
        const incompleteItems = createContentArray(1, { completed: false });
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
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
        const content = createContentArray(3);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER)
            .find(CHECKLIST_ITEM)
            .first()
            .find(CONTROL_BUTTONS)
            .find('button')
            .each(($button, index) =>
                index === 0 ? expect($button).to.be.disabled : expect($button).not.to.be.disabled
            );
        cy.get(CHECKLIST_CONTAINER)
            .find(CHECKLIST_ITEM)
            .last()
            .find(CONTROL_BUTTONS)
            .find('button')
            .each(($button, index) =>
                index === 1 ? expect($button).to.be.disabled : expect($button).not.to.be.disabled
            );
    });

    it('Can hide/show completed tasks in View mode', () => {
        const completedItems = createContentArray(5, { completed: true });
        const incompleteItems = createContentArray(5, { completed: false });
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, { blockSettings: { content } });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_ITEM).should('have.length', 10);
        cy.get('[checked]').should('have.length', 5);
        cy.get(CHECKLIST_BLOCK_SELECTOR)
            .realHover()
            .get(COMPLETED_VISIBILITY_BUTTON)
            .should('be.visible')
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
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
        cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
        cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
    });

    it('Hides progress bar if no checklist items', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content: [], progressBarType: ProgressBarType.Bar, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_BAR).should('have.length', 0);
    });

    it('Shows progress bar if setting is true and checklist is not empty', () => {
        const content = createContentArray(1);
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Bar, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_BAR).should('be.visible', 1);
    });

    it('Correctly displays calculated percentage in fraction', () => {
        const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
        const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const completedLength = completedItems.length;
        const totalLength = content.length;

        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Fraction, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${completedLength}/${totalLength}`);
    });

    it('Correctly displays calculated percentage in percentage', () => {
        const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
        const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const completedLength = completedItems.length;
        const totalLength = content.length;
        const percentage = ((completedLength / totalLength) * 100).toFixed(0);

        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Percentage, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${percentage}%`);
    });

    it('Correctly renders styles provided by settings', () => {
        const completedItems = createContentArray(5, { completed: true });
        const incompleteItems = createContentArray(5, { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: { ...testSettings, content },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX).each(($item) => {
            const border = $item.css('border-color');
            const fill = $item.css('background-color');
            const checked = $item.data('checked');
            if (checked) {
                expect(border).to.equal(toRgbaString(testSettings.completeCheckboxColor));
                expect(fill).to.equal(toRgbaString(testSettings.completeCheckboxColor));
            } else {
                expect(border).to.equal(toRgbaString(testSettings.checkboxColor));
                expect(fill).to.equal('rgb(255, 255, 255)');
            }
        });
        cy.get(TEXT_EDITOR).each(($editor) => {
            const color = $editor.css('color');
            expect(color).to.equal(toRgbaString(testSettings.textColor));
        });
        cy.get(CHECKBOX_LABEL)
            .find('span')
            .each(($labelSection) => {
                const color = $labelSection.css('color');
                const textDecoration = $labelSection.css('text-decoration-line');
                const strikethroughStyle = $labelSection.css('text-decoration-style');
                const strikethroughThickness = $labelSection.css('text-decoration-thickness');
                const strikethroughColor = $labelSection.css('text-decoration-color');
                expect(color).to.equal(toRgbaString(testSettings.completeTextColor));
                expect(textDecoration).to.equal('line-through');
                expect(strikethroughStyle).to.equal(StrikethroughStyleType[testSettings.strikethroughStyle]);
                expect(strikethroughThickness).to.equal(testSettings.strikethroughWidth);
                expect(strikethroughColor).to.equal(toRgbaString(testSettings.strikethroughColor));
            });
        cy.get(PROGRESS_BAR).should('have.css', 'background-color', toRgbaString(testSettings.progressBarTrackColor));
        cy.get(PROGRESS_BAR_FILL).should(
            'have.css',
            'background-color',
            toRgbaString(testSettings.progressBarFillColor)
        );
        cy.get(CHECKBOX_DATE).should('have.length', 5);
    });

    it('Does not show date if visibility is off', () => {
        const content = createContentArray(5, { completed: true });
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: {
                content,
                dateVisible: false,
            },
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX_DATE).should('have.length', 0);
    });

    it('Correctly displays highlight color', () => {
        const content = createContentArray(5, { completed: true });
        const highlightColor = { red: 85, green: 85, blue: 85 };
        const [ChecklistBlockWithStubs] = withAppBridgeBlockStubs(ChecklistBlock, {
            blockSettings: {
                content,
                completedDecoration: ChecklistDecoration.Highlight,
                highlightColor,
            },
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX_LABEL).find('span').should('have.css', 'background-color', toRgbaString(highlightColor));
    });
});
