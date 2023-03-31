/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { validationClassMap } from '@frontify/fondue';
import { mount } from 'cypress/react';
import { SketchfabBlock } from './SketchfabBlock';
import { SKETCHFAB_RULE_ERROR } from './helpers';
import { SketchfabHeight, SketchfabSettings, heights } from './types';

const MAIN_BLOCK_ID = '[data-test-id="sketchfab-block"]';
const TEXT_INPUT_ID = '[data-test-id="text-input"]';
const BUTTON_ID = '[data-test-id="button"]';
const EMPTY_BLOCK_EDIT_ID = '[data-test-id="sketchfab-empty-block-edit"]';
const EMPTY_BLOCK_VIEW_ID = '[data-test-id="sketchfab-empty-block-view"]';
const IFRAME_ID = '[data-test-id="sketchfab-iframe"]';

const SKETCHFAB_URL = 'https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed';
const SKETCHFAB_URL_WITH_PARAM = 'https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed?autospin=0.5';
const INVALID_URL = 'https://www.google.com';
const BORDER_WIDTH = '5px';
const BORDER_COLOR = { red: 50, green: 45, blue: 70, alpha: 0.2 };
const BORDER_COLOR_STRING = 'rgba(50, 45, 70, 0.2)';
const BORDER_STYLE = 'solid';
const BORDER_RADIUS = '10px';
const CUSTOM_HEIGHT = '150px';
const ANNOTATION_CYCLE_COUNT = '5';
const AUTO_SPIN_COUNT = '3';

const defaultBlockSettings = {
    [SketchfabSettings.AUTO_PLAY]: true,
    [SketchfabSettings.SHOW_ANNOTATIONS]: true,
    [SketchfabSettings.ANNOTATION_TOOLTIP_VISIBLE]: true,
    [SketchfabSettings.UI_DOF]: true,
    [SketchfabSettings.STARTING_SPIN]: true,
    [SketchfabSettings.SCROLL_WHEEL]: true,
    [SketchfabSettings.VIEWERS_TRACKING]: true,
    [SketchfabSettings.UI_DISABLE_VIEWER]: true,
    [SketchfabSettings.ALLOW_LIGHT_ROTATION]: true,
    [SketchfabSettings.DOUBLE_CLICK]: true,
    [SketchfabSettings.SHOW_UI]: true,
    [SketchfabSettings.SHOW_BUTTONS]: true,
};

describe('Sketchfab Block', () => {
    it('renders a Sketchfab block', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock);
        mount(<SketchfabBlockWithStubs />);

        cy.get(MAIN_BLOCK_ID).should('exist');
    });

    it('renders an input block on edit when no url', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: defaultBlockSettings,
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(EMPTY_BLOCK_EDIT_ID).should('exist');
    });

    it('submits input data on enter pressed and removes params', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: defaultBlockSettings,
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(TEXT_INPUT_ID).type(`${SKETCHFAB_URL_WITH_PARAM}{enter}`);
        cy.get(IFRAME_ID).should('be.visible').and('have.attr', 'src', SKETCHFAB_URL);
    });

    it('submits input data when button clicked and removes params', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: defaultBlockSettings,
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(TEXT_INPUT_ID).type(SKETCHFAB_URL_WITH_PARAM);
        cy.get(BUTTON_ID).click();
        cy.get(IFRAME_ID).should('be.visible').and('have.attr', 'src', SKETCHFAB_URL);
    });

    it('shows error message if incorrect url is added', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: defaultBlockSettings,
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(TEXT_INPUT_ID).type(INVALID_URL);
        cy.get(BUTTON_ID).click();
        cy.get(IFRAME_ID).should('not.exist');
        cy.get(TEXT_INPUT_ID).parent().should('have.class', validationClassMap['Error']);
        cy.get(EMPTY_BLOCK_EDIT_ID).contains(SKETCHFAB_RULE_ERROR).should('be.visible');
    });

    it('renders a empty block on view', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: false,
            blockSettings: defaultBlockSettings,
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(EMPTY_BLOCK_VIEW_ID).should('exist');
    });

    it('shows border styles', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.BORDER_COLOR]: BORDER_COLOR,
                [SketchfabSettings.BORDER_STYLE]: BORDER_STYLE,
                [SketchfabSettings.BORDER_WIDTH]: BORDER_WIDTH,
                [SketchfabSettings.HAS_BORDER]: true,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
                [SketchfabSettings.HAS_RADIUS]: true,
                [SketchfabSettings.RADIUS_VALUE]: BORDER_RADIUS,
            },
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(IFRAME_ID).should(($iframe) => {
            expect($iframe.css('borderColor')).to.equal(BORDER_COLOR_STRING);
            expect($iframe.css('borderWidth')).to.equal(BORDER_WIDTH);
            expect($iframe.css('borderStyle')).to.equal(BORDER_STYLE);
            expect($iframe.css('borderRadius')).to.equal(BORDER_RADIUS);
        });
    });

    it('shows correct height choice', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.IS_CUSTOM_HEIGHT]: false,
                [SketchfabSettings.HEIGHT]: SketchfabHeight.Large,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(IFRAME_ID).should('have.css', 'height', heights[SketchfabHeight.Large]);
    });

    it('shows correct custom height', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.IS_CUSTOM_HEIGHT]: true,
                [SketchfabSettings.CUSTOM_HEIGHT]: CUSTOM_HEIGHT,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(IFRAME_ID).should('have.css', 'height', CUSTOM_HEIGHT);
    });

    it('appends parameters to url', () => {
        const [SketchfabBlockWithStubs] = withAppBridgeBlockStubs(SketchfabBlock, {
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.ANNOTATION_CYCLE]: true,
                [SketchfabSettings.ANNOTATION_CYCLE_COUNT]: '5',
                [SketchfabSettings.SHOW_ANNOTATIONS]: true,
                [SketchfabSettings.AUTO_SPIN]: true,
                [SketchfabSettings.AUTO_SPIN_COUNT]: '3',
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });
        mount(<SketchfabBlockWithStubs />);

        cy.get(IFRAME_ID).should(
            'have.attr',
            'src',
            `${SKETCHFAB_URL}?autospin=${AUTO_SPIN_COUNT}&annotation_cycle=${ANNOTATION_CYCLE_COUNT}`
        );
    });
});
