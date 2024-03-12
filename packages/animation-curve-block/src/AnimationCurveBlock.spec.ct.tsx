/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { BorderStyle, GutterSpacing, Radius, TextStyles, convertToRteValue } from '@frontify/guideline-blocks-settings';

import { AnimationCurveBlock } from './AnimationCurveBlock';
import { AnimationCurve, AnimationCurveType } from './types';

const RTE_SELECTOR = '[data-test-id="rich-text-editor"]';
const BLOCK_SELECTOR = '[data-test-id="animation-curve-block"]';
const CARD_SELECTOR = '[data-test-id="animation-curve-card"]';
const CARD_DURATION_SELECTOR = '[data-test-id="animation-curve-card-duration"]';
const CARD_PARAMETERS_SELECTOR = '[data-test-id="animation-curve-card-parameters"]';
const BLANK_SLATE_SELECTOR = '[data-test-id="blank-slate"]';
const BLANK_SLATE_BUTTON_SELECTOR = '[data-test-id="block-inject-button"]';
const ANIMATION_CURVES_GRID_SELECTOR = '[data-test-id="animation-curves-grid"]';
const ANIMATION_CURVES_LINE_SELECTOR = '[data-test-id="animation-curves-line"]';
const ANIMATION_CURVES_ENDPOINTS_SELECTOR = '[data-test-id="animation-canvas-endpoint"]';
const ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR = '[data-test-id="animation-curves-canvas-wrapper"]';
const ANIMATION_CURVES_CANVAS_PATH_SELECTOR = '[data-test-id="animation-curves-canvas-path"]';
const BLOCK_ITEM_WRAPPER = '[data-test-id="block-item-wrapper"]';
const BLOCK_ITEM_WRAPPER_TOOLBAR_BTN = '[data-test-id="block-item-wrapper-toolbar-btn"]';
const FLYOUT_SELECTOR = '[role="dialog"]';
const BUTTON_SELECTOR = '[data-test-id="button"]';
const ENDPOINT_SELECTOR = '[data-test-id="endpoint"]';
const STARTPOINT_SELECTOR = '[data-test-id="startPoint"]';
const TEXT_INPUT_SELECTOR = '[data-test-id="text-input"]';
const DROPDOWN_SELECTOR = '[data-test-id="dropdown-trigger"]';
const DROWDOWN_ITEM_SELECTOR = '[data-test-id="menu-item"]';
const CSS_VALUE_SELECTOR = '[data-test-id="css-value-display"]';

class AnimationCurveDummy {
    static with(id = '1'): AnimationCurve {
        return {
            id,
            title: convertToRteValue(TextStyles.heading3, `Animation Title ${id}`),
            description: convertToRteValue('p', `Animation Description ${id}`),
            animationFunction: {
                type: AnimationCurveType.EaseIn,
                parameters: { x1: 0.42, y1: 0, x2: 1, y2: 1 },
                duration: 10,
            },
        };
    }
}

const RED = { red: 255, green: 0, blue: 0 };

describe('AnimationCurve Block', () => {
    it('should render an animation curve block with the default values', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock);
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('exist');
        cy.get(CSS_VALUE_SELECTOR).should('not.exist');
    });

    it('should render an animation curve block in edit mode only showing blank slate', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLANK_SLATE_SELECTOR).should('exist');
        cy.get(CARD_SELECTOR).should('not.exist');
    });

    it('should render in a 4 col grid', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                columns: 4,
            },
        });
        cy.viewport(1280, 800);
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'grid-template-columns', '320px 320px 320px 320px');
    });

    it('should render with a large spacing', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                columns: 2,
                spacingChoice: GutterSpacing.L,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'gap', '50px');
    });

    it('should render with a custom spacing of 42px', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                columns: 2,
                hasCustomSpacing: true,
                spacingCustom: '42px',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLOCK_SELECTOR).should('have.css', 'gap', '42px');
    });

    it('should render two animation curves with a curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with(), AnimationCurveDummy.with('2')],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 2);
    });

    it('should render with the duration on the card', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasDuration: true,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_DURATION_SELECTOR).should('exist');
    });

    it('should render with the duration on the card', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasDuration: false,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_DURATION_SELECTOR).should('not.exist');
    });

    it('should render with the parameter on the card', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasParameter: true,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_PARAMETERS_SELECTOR).should('exist');
    });

    it('should render with the parameter on the card', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasParameter: false,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_PARAMETERS_SELECTOR).should('not.exist');
    });

    it('should render one animation curve with a background color with padding', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBackground: true,
                backgroundColor: RED,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'padding', '16px 20px');
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'background-color', 'rgb(255, 0, 0)');
    });

    it('should render one animation curve with a dashed border, padding', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderColor: RED,
                borderWidth: 2,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.css', 'border', '2px dashed rgb(255, 0, 0)');
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'padding', '16px 20px');
    });

    it('should render one animation curve with a solid border, radius, padding', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderColor: RED,
                borderWidth: 2,
                radiusChoice: Radius.Large,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.css', 'border', '2px dashed rgb(255, 0, 0)');
        cy.get(CARD_SELECTOR).should('have.css', 'border-radius', '12px');
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'padding', '16px 20px');
    });

    it('should render one animation curve with a solid border, custom radius, padding', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderColor: RED,
                borderWidth: 2,
                hasRadius: true,
                radiusValue: '42px',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.css', 'border', '2px dashed rgb(255, 0, 0)');
        cy.get(CARD_SELECTOR).should('have.css', 'border-radius', '42px');
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'padding', '16px 20px');
    });

    it('should render the animation curve block with background, border radius and no border, the card and the canvas wrapper should have the border radius', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBackground: true,
                backgroundColor: RED,
                hasBorder: false,
                hasRadius: true,
                radiusValue: '42px',
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.css', 'border-radius', '42px');
        cy.get(ANIMATION_CURVES_CANVAS_WRAPPER_SELECTOR).should('have.css', 'border-radius', '42px');
    });

    it('should render one animation curve with a red line', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                lineColor: RED,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_CANVAS_PATH_SELECTOR).should('have.css', 'stroke', 'rgb(255, 0, 0)');
    });

    it('should render one animation curve without the grid', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasGrid: false,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_GRID_SELECTOR).should('not.exist');
    });

    it('should render one animation curve with endpoints', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasEndpoints: true,
                endpointsColor: RED,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_ENDPOINTS_SELECTOR).should('have.length', 2);
        cy.get(ANIMATION_CURVES_ENDPOINTS_SELECTOR).should('have.css', 'fill', 'rgb(255, 0, 0)');
    });

    it('should render one animation curve with a grid and custom grid color', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasGrid: true,
                gridColor: RED,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_GRID_SELECTOR).should('exist');
        cy.get(ANIMATION_CURVES_LINE_SELECTOR).should('have.css', 'stroke', 'rgb(255, 0, 0)');
    });

    it('should render one animation with motions', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasMotion: true,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(ANIMATION_CURVES_CANVAS_PATH_SELECTOR).should('not.have.attr', 'style');
        cy.get(CARD_SELECTOR).realHover();
        cy.get(ANIMATION_CURVES_CANVAS_PATH_SELECTOR).should('have.attr', 'style').and('not.be.empty');
    });

    it('should render in edit mode with the blank slate button height of 82px', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).parent().should('have.css', 'height', '82px');
    });

    it('should delete the last animation curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with(), AnimationCurveDummy.with('2'), AnimationCurveDummy.with('3')],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 3);
        cy.get(CARD_SELECTOR).last().realHover();
        cy.get(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(1).children().click({ force: true });
        cy.get(CARD_SELECTOR).should('have.length', 2);
    });

    it('should have an animation curve that is draggable', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with(), AnimationCurveDummy.with('2'), AnimationCurveDummy.with('3')],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        const last = cy.get(CARD_SELECTOR).last();
        cy.get(CARD_SELECTOR)
            .eq(1)
            .parent()
            .find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN)
            .eq(0)
            .realMouseDown()
            .realMouseMove(0, 1000)
            .realMouseUp();
        cy.get(CARD_SELECTOR).last().should('not.eq', last);
    });

    it('should move the first animation curve to fourth position by keyboard', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                content: [
                    AnimationCurveDummy.with(),
                    AnimationCurveDummy.with('2'),
                    AnimationCurveDummy.with('3'),
                    AnimationCurveDummy.with('4'),
                    AnimationCurveDummy.with('5'),
                ],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(RTE_SELECTOR).should('have.length', 12);
        cy.get(CARD_SELECTOR)
            .first()
            .then((first) => {
                cy.wrap(first).parent().find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(0).focus();
                cy.realPress('Enter');
                cy.realPress('ArrowDown');
                cy.realPress('ArrowRight');
                cy.realPress('Enter');
                cy.get(CARD_SELECTOR)
                    .eq(3)
                    .then((fourth) => {
                        expect(fourth.get(0).outerHTML).to.eq(first.get(0).outerHTML);
                    });
            });
    });

    it('should move the fourth animation curve to first position by keyboard', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                columns: 2,
                content: [
                    AnimationCurveDummy.with(),
                    AnimationCurveDummy.with('2'),
                    AnimationCurveDummy.with('3'),
                    AnimationCurveDummy.with('4'),
                    AnimationCurveDummy.with('5'),
                ],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(RTE_SELECTOR).should('have.length', 12);
        cy.get(CARD_SELECTOR)
            .eq(3)
            .then((fourth) => {
                cy.wrap(fourth).parent().find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(0).focus();
                cy.realPress('Enter');
                cy.realPress('ArrowUp');
                cy.realPress('ArrowLeft');
                cy.realPress('Enter');
                cy.get(CARD_SELECTOR)
                    .first()
                    .then((first) => {
                        expect(first.get(0).outerHTML).to.eq(fourth.get(0).outerHTML);
                    });
            });
    });

    it('should add a new animation curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 1);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 2);
    });

    it('should not add an animation curve after pressing cancel', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 1);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).first().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 1);
    });

    it('should add an custom animation curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 1);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        cy.get(FLYOUT_SELECTOR).should('exist');
        cy.get(DROPDOWN_SELECTOR).click();
        cy.get(DROWDOWN_ITEM_SELECTOR).eq(4).click();
        cy.get(ENDPOINT_SELECTOR).realMouseDown().realMouseMove(-10, -10).realMouseUp();
        cy.get(STARTPOINT_SELECTOR).realMouseDown().realMouseMove(20, -54).realMouseUp();
        cy.get(TEXT_INPUT_SELECTOR).eq(0).invoke('val').should('eq', '0.03');
        cy.get(TEXT_INPUT_SELECTOR).eq(1).invoke('val').should('eq', '0.3');
        cy.get(TEXT_INPUT_SELECTOR).eq(2).invoke('val').should('eq', '0.97');
        cy.get(TEXT_INPUT_SELECTOR).eq(3).invoke('val').should('eq', '1.08');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 2);
    });

    it('should updated input fields if select a curve from the dropdown', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 1);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        const x1 = cy.get(TEXT_INPUT_SELECTOR).eq(0).invoke('val');
        const y1 = cy.get(TEXT_INPUT_SELECTOR).eq(1).invoke('val');
        const x2 = cy.get(TEXT_INPUT_SELECTOR).eq(2).invoke('val');
        const y2 = cy.get(TEXT_INPUT_SELECTOR).eq(3).invoke('val');
        cy.get(DROPDOWN_SELECTOR).click();
        cy.get(DROWDOWN_ITEM_SELECTOR).eq(5).click();
        cy.get(TEXT_INPUT_SELECTOR).eq(0).invoke('val').should('not.eq', x1);
        cy.get(TEXT_INPUT_SELECTOR).eq(1).invoke('val').should('not.eq', y1);
        cy.get(TEXT_INPUT_SELECTOR).eq(2).invoke('val').should('not.eq', x2);
        cy.get(TEXT_INPUT_SELECTOR).eq(3).invoke('val').should('not.eq', y2);
    });

    it('should edit an existing animation curve so that it is a custom animation curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).should('have.length', 1);
        cy.get(CARD_SELECTOR).parent().find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(2).click({ force: true });
        cy.get(FLYOUT_SELECTOR).should('exist');
        cy.get(BLOCK_ITEM_WRAPPER).first().should('have.css', 'outline-width', '1px');
        cy.get(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(1).should('exist');
        cy.get(STARTPOINT_SELECTOR).realMouseDown().realMouseMove(0, 50).realMouseUp();
        cy.get(TEXT_INPUT_SELECTOR).eq(0).invoke('val').should('eq', '0.41');
        cy.get(TEXT_INPUT_SELECTOR).eq(1).invoke('val').should('eq', '-0.23');
        cy.get(TEXT_INPUT_SELECTOR).eq(2).invoke('val').should('eq', '1');
        cy.get(TEXT_INPUT_SELECTOR).eq(3).invoke('val').should('eq', '1');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 1);
    });

    it('should add two animation curves and delete one of them', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 2);
        cy.get(BLANK_SLATE_BUTTON_SELECTOR).click();
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().realClick();
        cy.get(CARD_SELECTOR).should('have.length', 3);
        cy.get(CARD_SELECTOR).last().parent().find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(1).click({ force: true });

        cy.get(CARD_SELECTOR).should('have.length', 2);
    });

    it('should edit an existing animation curve x1 && x2 > 1 or < 0 should not be possible', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with()],
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CARD_SELECTOR).parent().find(BLOCK_ITEM_WRAPPER_TOOLBAR_BTN).eq(2).click({ force: true });
        cy.get(FLYOUT_SELECTOR).should('exist');

        //x1
        cy.get(TEXT_INPUT_SELECTOR).eq(0).clear().realType('1.1');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('be.disabled');
        cy.get(TEXT_INPUT_SELECTOR).eq(0).clear().realType('0.25');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('not.be.disabled');
        cy.get(TEXT_INPUT_SELECTOR).eq(0).clear().realPress('ArrowDown');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('be.disabled');
        cy.get(TEXT_INPUT_SELECTOR).eq(0).clear();
        cy.get(TEXT_INPUT_SELECTOR).eq(0).clear().realType('0.25');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('not.be.disabled');

        //x2
        cy.get(TEXT_INPUT_SELECTOR).eq(2).clear().realType('1.1');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('be.disabled');
        cy.get(TEXT_INPUT_SELECTOR).eq(2).clear().realType('.25');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('not.be.disabled');
        cy.get(TEXT_INPUT_SELECTOR).eq(2).clear().realPress('ArrowDown');
        cy.get(FLYOUT_SELECTOR).find(BUTTON_SELECTOR).last().should('be.disabled');
    });

    it('should show the correct cubic-bezier values of an ease in animation curve', () => {
        const [AssetKitBlockWithStubs] = withAppBridgeBlockStubs(AnimationCurveBlock, {
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                displayCss: true,
            },
        });
        mount(<AssetKitBlockWithStubs />);
        cy.get(CSS_VALUE_SELECTOR).should('have.length', 1);
        cy.get(CSS_VALUE_SELECTOR).eq(0).should('contain.text', 'cubic-bezier(0.42, 0, 1, 1)');
    });
});
