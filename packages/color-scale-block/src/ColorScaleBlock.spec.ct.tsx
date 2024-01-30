/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import '@4tw/cypress-drag-drop';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { ColorScaleBlock } from './ColorScaleBlock';

const COLOR_SCALE_BLOCK_SELECTOR = '[data-test-id="color-scale-block"]';
const COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR = '[data-test-id="color-scale-block-editor-mode-buttons"]';
const ADD_COLOR_BUTTON_SELECTOR = '[data-test-id="flyout-trigger"]';
const RESIZE_EVENLY_BUTTON_SELECTOR = '[data-test-id="button"]';
const COLOR_PICKER_FLYOUT_SELECTOR = '[data-test-id="color-scale-block-color-picker-content"]';
const COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR = '[data-test-id="brand-color"]';
const COLOR_SQUARE_SELECTOR = '[data-test-id="color-scale-block-color-square"]';
const COLOR_SQUARE_BACKGROUND_SELECTOR = '[data-test-id="color-scale-block-color-square-with-background"]';
const COLOR_SQUARE_DROP_ZONE_SELECTOR = '[data-test-id="drop-zone"]';
const COLOR_SQUARE_WRAPPER_SELECTOR = '[data-test-id="color-wrapper"]';
const COLOR_SQUARE_DELETE_BUTTON_SELECTOR = '[data-test-id="delete-color"]';
const COLOR_SQUARE_DRAG_HANDLE_SELECTOR = '[data-test-id="drag-handle"]';
const COLOR_SCALE_BLOCK_BORDER_WIDTH = 2;
const COLOR_SCALE_BLOCK_PADDING = 2;
const COLOR_SQUARE_HARDCODED_WIDTH = 100;

describe('Color Scale Block', () => {
    it('renders an empty color scale block', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        mount(<ColorScaleBlockWithStubs />);
        cy.get(COLOR_SCALE_BLOCK_SELECTOR).should('exist');
    });

    it('renders Add Color button in edit mode', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        mount(<ColorScaleBlockWithStubs />);
        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(ADD_COLOR_BUTTON_SELECTOR)
            .contains('Add Color')
            .should('exist');
    });

    it('renders Resize Evenly button in edit mode', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        mount(<ColorScaleBlockWithStubs />);
        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(RESIZE_EVENLY_BUTTON_SELECTOR)
            .contains('Resize Evenly')
            .should('exist');
    });

    it.only('renders a color picker flyout when user clicks on Add Color button', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        mount(<ColorScaleBlockWithStubs />);
        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(ADD_COLOR_BUTTON_SELECTOR)
            .contains('Add Color')
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR).should('exist');
    });

    it('adds a new color square when user selects a new color and presses Confirm', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        const COLOR_PICKER_FLYOUT_COLOR_INDEX = 1;

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_SELECTOR).should('have.length', 0);

        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(ADD_COLOR_BUTTON_SELECTOR)
            .contains('Add Color')
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX)
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR).parentsUntil('[role="dialog"]').contains('Confirm').click();

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_SELECTOR).should('have.length', 1);
    });

    it('closes the color picker flyout when the user clicks on Cancel', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        const COLOR_PICKER_FLYOUT_COLOR_INDEX = 1;

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_SELECTOR).should('have.length', 0);

        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(ADD_COLOR_BUTTON_SELECTOR)
            .contains('Add Color')
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX)
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .parentsUntil('[role="dialog"]')
            .find('[data-test-id="button-text"]')
            .contains('Cancel')
            .click();

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_PICKER_FLYOUT_SELECTOR).should('not.exist');
    });

    it('adds a new color square with the same color that was selected in the color picker flyout', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: { customHeight: false, heightSlider: '96px', heightInput: '100px' },
        });

        const COLOR_PICKER_FLYOUT_COLOR_INDEX = 0;

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(ADD_COLOR_BUTTON_SELECTOR)
            .contains('Add Color')
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX)
            .find('span')
            .invoke('attr', 'style')
            .as('style1');

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX)
            .click();

        cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
            .parentsUntil('[role="dialog"]')
            .find('[data-test-id="button-text"]')
            .contains('Confirm')
            .click();

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_BACKGROUND_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX)
            .invoke('attr', 'style')
            .as('style2');

        cy.get('@style1').then((style1) => {
            cy.get('@style2').then((style2) => {
                expect(style2).to.include(style1);
            });
        });
    });

    it('allows the user to delete a color square', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: {
                customHeight: false,
                heightSlider: '96px',
                heightInput: '100px',
                colorInput: [
                    {
                        red: 255,
                        green: 0,
                        alpha: 1,
                        blue: 0,
                        id: 1,
                    },
                ],
            },
        });

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_BACKGROUND_SELECTOR).should('have.length', 1);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_WRAPPER_SELECTOR)
            .eq(0)
            .realHover()
            .find(COLOR_SQUARE_DELETE_BUTTON_SELECTOR)
            .eq(0)
            .click();

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_BACKGROUND_SELECTOR).should('have.length', 0);
    });

    it('resizes all color square to take up equal amounts of space in the block when the user clicks on the Resize Evenly button', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: {
                customHeight: false,
                heightSlider: '96px',
                heightInput: '100px',
                colorInput: [
                    {
                        red: 255,
                        green: 0,
                        blue: 0,
                        alpha: 1,
                        id: 1,
                    },
                    {
                        red: 255,
                        green: 255,
                        alpha: 1,
                        blue: 0,
                        id: 2,
                    },
                    {
                        red: 255,
                        green: 255,
                        alpha: 1,
                        blue: 100,
                        id: 3,
                    },
                ],
            },
        });

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_WRAPPER_SELECTOR).should('have.length', 3);

        cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
            .find(RESIZE_EVENLY_BUTTON_SELECTOR)
            .contains('Resize Evenly')
            .click();

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .as('colorBlockWidth');

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_WRAPPER_SELECTOR)
            .eq(0)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .as('firstColorSquareWidth');

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_WRAPPER_SELECTOR)
            .eq(1)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .as('secondColorSquareWidth');

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_WRAPPER_SELECTOR)
            .eq(2)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .as('thirdColorSquareWidth');

        cy.get<number>('@colorBlockWidth').then((colorBlockWidth) => {
            cy.get('@firstColorSquareWidth').should('be.closeTo', colorBlockWidth / 3, 3);
            cy.get('@secondColorSquareWidth').should('be.closeTo', colorBlockWidth / 3, 3);
            cy.get('@thirdColorSquareWidth').should('be.closeTo', colorBlockWidth / 3, 3);
        });
    });

    it('allows the user to resize a color square', () => {
        const COLOR_WIDTH = 300;

        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: {
                customHeight: false,
                heightSlider: '96px',
                heightInput: '100px',
                cypressTest: true,
                colorInput: [
                    {
                        red: 255,
                        alpha: 1,
                        green: 0,
                        blue: 0,
                        id: 1,
                        width: COLOR_WIDTH,
                    },
                ],
            },
        });

        mount(<ColorScaleBlockWithStubs />);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_BACKGROUND_SELECTOR).should('have.length', 1);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_SELECTOR)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .as('colorSquareWidthBeforeResize');

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .eq(0)
            .find(COLOR_SQUARE_DRAG_HANDLE_SELECTOR)
            .as('dragHandle')
            .then(($element) => $element[0].getBoundingClientRect())
            .as('dragHandlePosition');

        cy.get('@dragHandle')
            .realHover()
            .should('have.css', 'opacity', '1')
            .and('be.visible')
            .and('have.attr', 'draggable');

        cy.get<DOMRect>('@dragHandlePosition').then((dragHandlePosition) => {
            cy.get('@dragHandle')
                .trigger('mousedown')
                .trigger('mousemove', {
                    clientX: dragHandlePosition.x + dragHandlePosition.width / 2,
                    clientY: dragHandlePosition.y + dragHandlePosition.height / 2,
                });

            cy.get('@dragHandle')
                .trigger('mousedown')
                .trigger('mousemove', {
                    clientX: dragHandlePosition.x + dragHandlePosition.width / 2 - COLOR_WIDTH / 2,
                    clientY: dragHandlePosition.y + dragHandlePosition.height / 2,
                });
        });

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_SELECTOR)
            .then(($element) => $element[0].getBoundingClientRect())
            .its('width')
            .should('be.closeTo', COLOR_WIDTH / 2, 0.1);
    });

    it('allows the user to drag and drop a color square', () => {
        const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
            editorState: true,
            blockSettings: {
                customHeight: false,
                heightSlider: '96px',
                heightInput: '100px',
                colorInput: [
                    {
                        red: 0,
                        green: 0,
                        blue: 255,
                        id: 2,
                        width: 100,
                        alpha: 1,
                    },
                    {
                        red: 255,
                        green: 0,
                        blue: 0,
                        id: 1,
                        width: 100,
                        alpha: 1,
                    },
                ],
            },
        });

        const COLOR_PICKER_FLYOUT_COLOR_INDEX_1 = 0;
        const COLOR_PICKER_FLYOUT_COLOR_INDEX_2 = 1;

        mount(<ColorScaleBlockWithStubs />);

        cy.on('uncaught:exception', (error) => {
            if (error.message.includes('Cannot call hover while not dragging')) {
                // return false to prevent the error from
                // failing this test
                return false;
            }

            // fail test on any other errors
            return true;
        });

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX_2)
            .find(COLOR_SQUARE_BACKGROUND_SELECTOR)
            .invoke('attr', 'style')
            .as('draggedElementStyle');

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX_2)
            .find(COLOR_SQUARE_BACKGROUND_SELECTOR)
            .eq(0)
            .realHover()
            .drag(`${COLOR_SQUARE_DROP_ZONE_SELECTOR}:eq(0)`, { force: true });

        cy.wait(1000);

        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
            .find(COLOR_SQUARE_SELECTOR)
            .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX_1)
            .find(COLOR_SQUARE_BACKGROUND_SELECTOR)
            .invoke('attr', 'style')
            .as('firstColorInBlockStyle');

        cy.get('@draggedElementStyle').then((draggedElementStyle) => {
            cy.get('@firstColorInBlockStyle').should('equal', draggedElementStyle);
        });
    });

    it('resizes all color squares to take up an equal amount of space whenever a new color is added, excluding from the calculation any color squares that have already been resized', () => {
        cy.get('body')
            .eq(0)
            .then(($body) => {
                const pageWidth = $body[0].getBoundingClientRect().width;

                const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
                    editorState: true,
                    blockSettings: {
                        customHeight: false,
                        heightSlider: '96px',
                        heightInput: '100px',
                        colorInput: [
                            {
                                red: 0,
                                green: 0,
                                alpha: 1,
                                blue: 255,
                                id: 2,
                                width: pageWidth / 2 - COLOR_SCALE_BLOCK_BORDER_WIDTH - COLOR_SCALE_BLOCK_PADDING,
                            },
                            {
                                red: 255,
                                alpha: 1,
                                green: 0,
                                blue: 0,
                                id: 1,
                                width: COLOR_SQUARE_HARDCODED_WIDTH,
                                resized: true,
                            },
                        ],
                    },
                });

                const COLOR_PICKER_FLYOUT_COLOR_INDEX_3 = 2;
                let thirdColorSquareWidth;

                mount(<ColorScaleBlockWithStubs />);

                cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
                    .find(ADD_COLOR_BUTTON_SELECTOR)
                    .contains('Add Color')
                    .click();

                cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
                    .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
                    .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX_3)
                    .click();

                cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
                    .parentsUntil('[role="dialog"]')
                    .find('[data-test-id="button-text"]')
                    .contains('Confirm')
                    .click();

                cy.get(COLOR_SCALE_BLOCK_SELECTOR)
                    .find(COLOR_SQUARE_WRAPPER_SELECTOR)
                    .eq(2)
                    .then(($colorSquare3) => {
                        thirdColorSquareWidth = $colorSquare3[0].getBoundingClientRect().width;

                        expect(thirdColorSquareWidth).to.be.closeTo(
                            (pageWidth - COLOR_SQUARE_HARDCODED_WIDTH) / 2 -
                                COLOR_SCALE_BLOCK_PADDING -
                                COLOR_SCALE_BLOCK_BORDER_WIDTH,
                            2
                        );
                    });
            });
    });

    it('adds a color square that is 50% of the width of the block if it is the 2nd square', () => {
        cy.get('body')
            .eq(0)
            .then(($body) => {
                const pageWidth = $body[0].getBoundingClientRect().width;
                const [ColorScaleBlockWithStubs] = withAppBridgeBlockStubs(ColorScaleBlock, {
                    editorState: true,
                    blockSettings: {
                        customHeight: false,
                        heightSlider: '96px',
                        heightInput: '100px',
                        colorInput: [
                            {
                                red: 255,
                                alpha: 1,
                                green: 0,
                                blue: 0,
                                id: 1,
                                width: pageWidth / 2 - COLOR_SCALE_BLOCK_BORDER_WIDTH - COLOR_SCALE_BLOCK_PADDING,
                            },
                        ],
                    },
                });

                const COLOR_PICKER_FLYOUT_COLOR_INDEX_2 = 1;
                let colorBlockWidth: number;
                let secondColorSquareWidth;

                mount(<ColorScaleBlockWithStubs />);

                cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_WRAPPER_SELECTOR).should('have.length', 1);

                cy.get(COLOR_SCALE_BLOCK_EDITOR_MODE_BUTTON_SELECTOR)
                    .find(ADD_COLOR_BUTTON_SELECTOR)
                    .contains('Add Color')
                    .click();

                cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
                    .find(COLOR_PICKER_FLYOUT_BRAND_COLOR_SELECTOR)
                    .eq(COLOR_PICKER_FLYOUT_COLOR_INDEX_2)
                    .click();

                cy.get(COLOR_PICKER_FLYOUT_SELECTOR)
                    .parentsUntil('[role="dialog"]')
                    .find('[data-test-id="button-text"]')
                    .contains('Confirm')
                    .click();

                cy.get(COLOR_SCALE_BLOCK_SELECTOR).find(COLOR_SQUARE_WRAPPER_SELECTOR).should('have.length', 2);

                cy.get(COLOR_SCALE_BLOCK_SELECTOR)
                    .eq(0)
                    .then(($colorBlock) => {
                        colorBlockWidth = $colorBlock[0].getBoundingClientRect().width;

                        cy.get(COLOR_SCALE_BLOCK_SELECTOR)
                            .find(COLOR_SQUARE_WRAPPER_SELECTOR)
                            .eq(1)
                            .then(($colorSquares) => {
                                secondColorSquareWidth = $colorSquares[0].getBoundingClientRect().width;

                                expect(secondColorSquareWidth).to.be.closeTo(colorBlockWidth / 2, 2);
                            });
                    });
            });
    });
});
