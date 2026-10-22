/* (c) Copyright Frontify Ltd., all rights reserved. */

// Keep happy-dom from fetching the real Sketchfab embed for every rendered iframe.
// @vitest-environment-options {"settings":{"disableIframePageLoading":true}}

import { withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { BorderStyle } from '@frontify/guideline-blocks-settings';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SKETCHFAB_RULE_ERROR } from './helpers';
import { SketchfabBlock } from './SketchfabBlock';
import { SketchfabHeight, SketchfabSettings, heights } from './types';

const MAIN_BLOCK_TEST_ID = 'sketchfab-block';
const EMPTY_BLOCK_EDIT_TEST_ID = 'sketchfab-empty-block-edit';
const EMPTY_BLOCK_VIEW_TEST_ID = 'sketchfab-empty-block-view';
const IFRAME_TEST_ID = 'sketchfab-iframe';

const URL_INPUT_LABEL = 'Sketchfab model URL';
const CONFIRM_BUTTON_LABEL = 'Confirm';

const SKETCHFAB_URL = 'https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed';
const SKETCHFAB_URL_WITH_PARAM = 'https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed?autospin=0.5';
const INVALID_URL = 'https://www.google.com';
const BORDER_WIDTH = '5px';
const BORDER_COLOR = { red: 50, green: 45, blue: 70, alpha: 0.2 };
const BORDER_COLOR_STRING = 'rgba(50, 45, 70, 0.2)';
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

const renderSketchfabBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [SketchfabBlockWithStubs, appBridge] = withAppBridgeBlockStubs(SketchfabBlock, appBridgeProps);
    const utils = render(<SketchfabBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Sketchfab Block', () => {
    it('should render a Sketchfab block', () => {
        renderSketchfabBlock();

        expect(screen.getByTestId(MAIN_BLOCK_TEST_ID)).toBeInTheDocument();
    });

    it('should render an input block in edit mode when there is no url', () => {
        renderSketchfabBlock({ editorState: true, blockSettings: defaultBlockSettings });

        expect(screen.getByTestId(EMPTY_BLOCK_EDIT_TEST_ID)).toBeInTheDocument();
    });

    it('should submit the input on enter and remove the url params', async () => {
        renderSketchfabBlock({ editorState: true, blockSettings: defaultBlockSettings });

        await userEvent.type(screen.getByLabelText(URL_INPUT_LABEL), `${SKETCHFAB_URL_WITH_PARAM}{Enter}`);

        expect(await screen.findByTestId(IFRAME_TEST_ID)).toHaveAttribute('src', SKETCHFAB_URL);
    });

    it('should submit the input when the button is clicked and remove the url params', async () => {
        renderSketchfabBlock({ editorState: true, blockSettings: defaultBlockSettings });

        await userEvent.type(screen.getByLabelText(URL_INPUT_LABEL), SKETCHFAB_URL_WITH_PARAM);
        await userEvent.click(screen.getByRole('button', { name: CONFIRM_BUTTON_LABEL }));

        expect(await screen.findByTestId(IFRAME_TEST_ID)).toHaveAttribute('src', SKETCHFAB_URL);
    });

    it('should show an error message if an invalid url is submitted', async () => {
        renderSketchfabBlock({ editorState: true, blockSettings: defaultBlockSettings });

        await userEvent.type(screen.getByLabelText(URL_INPUT_LABEL), INVALID_URL);
        await userEvent.click(screen.getByRole('button', { name: CONFIRM_BUTTON_LABEL }));

        expect(screen.queryByTestId(IFRAME_TEST_ID)).not.toBeInTheDocument();
        expect(screen.getByTestId(EMPTY_BLOCK_EDIT_TEST_ID)).toHaveTextContent(SKETCHFAB_RULE_ERROR);
    });

    it('should render an empty block in view mode', () => {
        renderSketchfabBlock({ editorState: false, blockSettings: defaultBlockSettings });

        expect(screen.getByTestId(EMPTY_BLOCK_VIEW_TEST_ID)).toBeInTheDocument();
    });

    it('should apply the border styles', () => {
        renderSketchfabBlock({
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.BORDER_COLOR]: BORDER_COLOR,
                [SketchfabSettings.BORDER_STYLE]: BorderStyle.Solid,
                [SketchfabSettings.BORDER_WIDTH]: BORDER_WIDTH,
                [SketchfabSettings.HAS_BORDER]: true,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
                [SketchfabSettings.HAS_RADIUS]: true,
                [SketchfabSettings.RADIUS_VALUE]: BORDER_RADIUS,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveStyle({
            borderColor: BORDER_COLOR_STRING,
            borderWidth: BORDER_WIDTH,
            borderStyle: 'solid',
            borderRadius: BORDER_RADIUS,
        });
    });

    it('should apply the selected height choice', () => {
        renderSketchfabBlock({
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.IS_CUSTOM_HEIGHT]: false,
                [SketchfabSettings.HEIGHT]: SketchfabHeight.Large,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveAttribute('height', heights[SketchfabHeight.Large]);
    });

    it('should apply the custom height', () => {
        renderSketchfabBlock({
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.IS_CUSTOM_HEIGHT]: true,
                [SketchfabSettings.CUSTOM_HEIGHT]: CUSTOM_HEIGHT,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveAttribute('height', CUSTOM_HEIGHT);
    });

    it('should only load the Sketchfab viewer once it gets near the viewport', () => {
        renderSketchfabBlock({
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveAttribute('loading', 'lazy');
    });

    it('should append the parameters to the url', () => {
        renderSketchfabBlock({
            editorState: true,
            blockSettings: {
                ...defaultBlockSettings,
                [SketchfabSettings.ANNOTATION_CYCLE]: true,
                [SketchfabSettings.ANNOTATION_CYCLE_COUNT]: ANNOTATION_CYCLE_COUNT,
                [SketchfabSettings.SHOW_ANNOTATIONS]: true,
                [SketchfabSettings.AUTO_SPIN]: true,
                [SketchfabSettings.AUTO_SPIN_COUNT]: AUTO_SPIN_COUNT,
                [SketchfabSettings.URL]: SKETCHFAB_URL,
            },
        });

        expect(screen.getByTestId(IFRAME_TEST_ID)).toHaveAttribute(
            'src',
            `${SKETCHFAB_URL}?autospin=${AUTO_SPIN_COUNT}&annotation_cycle=${ANNOTATION_CYCLE_COUNT}`
        );
    });
});
