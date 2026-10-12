/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { BorderStyle, GutterSpacing, Radius, TextStyles, convertToRteValue } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AnimationCurveBlock } from './AnimationCurveBlock';
import { type AnimationCurve, AnimationCurveType, defaultAnimationCurveTypeValues } from './types';

const BLOCK_TEST_ID = 'animation-curve-block';
const CARD_TEST_ID = 'animation-curve-card';
const CARD_DURATION_TEST_ID = 'animation-curve-card-duration';
const CARD_PARAMETERS_TEST_ID = 'animation-curve-card-parameters';
const BLANK_SLATE_TEST_ID = 'blank-slate';
const BLANK_SLATE_BUTTON_TEST_ID = 'block-inject-button';
const CANVAS_GRID_TEST_ID = 'animation-curves-grid';
const CANVAS_LINE_TEST_ID = 'animation-curves-line';
const CANVAS_ENDPOINT_TEST_ID = 'animation-canvas-endpoint';
const CANVAS_WRAPPER_TEST_ID = 'animation-curves-canvas-wrapper';
const CANVAS_PATH_TEST_ID = 'animation-curves-canvas-path';
const BLOCK_ITEM_WRAPPER_TEST_ID = 'block-item-wrapper';
const TOOLBAR_BUTTON_TEST_ID = 'block-item-wrapper-toolbar-btn';
const BUTTON_TEST_ID = 'fondue-button';
const SELECT_TEST_ID = 'fondue-select';
const CSS_VALUE_TEST_ID = 'css-value-display';

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
const RED_HEX = '#ff0000';

const renderAnimationCurveBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [AnimationCurveBlockWithStubs, appBridge] = withAppBridgeBlockStubs(AnimationCurveBlock, appBridgeProps);
    const utils = render(<AnimationCurveBlockWithStubs />);
    return { ...utils, appBridge };
};

const getCardToolbar = (cardIndex: number) => {
    const blockItemWrapper = screen.getAllByTestId(BLOCK_ITEM_WRAPPER_TEST_ID)[cardIndex];
    const [, deleteButton, editButton] = within(blockItemWrapper).getAllByTestId(TOOLBAR_BUTTON_TEST_ID);
    return { deleteButton, editButton };
};

const openBlankSlateFlyout = async () => {
    await userEvent.click(screen.getByTestId(BLANK_SLATE_BUTTON_TEST_ID));
    return screen.findByRole('dialog');
};

const getFlyoutButtons = (flyout: HTMLElement) => {
    const [cancelButton, saveButton] = within(flyout).getAllByTestId(BUTTON_TEST_ID);
    return { cancelButton, saveButton };
};

const getParameterInputs = (flyout: HTMLElement) => {
    const [x1Input, y1Input, x2Input, y2Input] = within(flyout).getAllByRole('spinbutton');
    return { x1Input, y1Input, x2Input, y2Input };
};

const selectCurveFromDropdown = async (flyout: HTMLElement, curveTitle: string) => {
    await userEvent.click(within(flyout).getByTestId(SELECT_TEST_ID));
    await userEvent.click(await screen.findByRole('option', { name: curveTitle }));
};

const typeIntoInput = async (input: HTMLElement, value: string) => {
    await userEvent.clear(input);
    await userEvent.type(input, value);
};

// user-event neither steps number inputs on ArrowDown nor keeps a leading '-' typed into a controlled number input.
const pasteNegativeValue = async (input: HTMLElement) => {
    await userEvent.tripleClick(input);
    await userEvent.paste('-1');
};

describe('AnimationCurve Block', () => {
    it('should render an animation curve block with the default values', () => {
        renderAnimationCurveBlock();
        expect(screen.getByTestId(BLOCK_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(CSS_VALUE_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render an animation curve block in edit mode only showing blank slate', () => {
        renderAnimationCurveBlock({ editorState: true });
        expect(screen.getByTestId(BLANK_SLATE_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(CARD_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render in a 4 col grid', () => {
        renderAnimationCurveBlock({ blockSettings: { columns: 4 } });
        // The column count per width is driven by container queries, which happy-dom can't evaluate.
        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveClass(
            'tw-grid-cols-1',
            '@xs:tw-grid-cols-2',
            '@sm:tw-grid-cols-3',
            '@md:tw-grid-cols-4'
        );
    });

    it('should render with a large spacing', () => {
        renderAnimationCurveBlock({ blockSettings: { columns: 2, spacingChoice: GutterSpacing.L } });
        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveStyle({ gap: '50px' });
    });

    it('should render with a custom spacing of 42px', () => {
        renderAnimationCurveBlock({
            blockSettings: { columns: 2, hasCustomSpacing: true, spacingCustom: '42px' },
        });
        expect(screen.getByTestId(BLOCK_TEST_ID)).toHaveStyle({ gap: '42px' });
    });

    it('should render two animation curves with a curve', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with(), AnimationCurveDummy.with('2')] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
    });

    it('should render with the duration on the card', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasDuration: true },
        });
        expect(screen.getByTestId(CARD_DURATION_TEST_ID)).toBeInTheDocument();
    });

    it('should not render the duration on the card', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasDuration: false },
        });
        expect(screen.queryByTestId(CARD_DURATION_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render with the parameter on the card', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasParameter: true },
        });
        expect(screen.getByTestId(CARD_PARAMETERS_TEST_ID)).toBeInTheDocument();
    });

    it('should not render the parameter on the card', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasParameter: false },
        });
        expect(screen.queryByTestId(CARD_PARAMETERS_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render one animation curve with a background color with padding', () => {
        renderAnimationCurveBlock({
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBackground: true,
                backgroundColor: RED,
            },
        });
        const canvasWrapper = screen.getByTestId(CANVAS_WRAPPER_TEST_ID);
        expect(canvasWrapper).toHaveClass('tw-px-5', 'tw-py-4');
        expect(canvasWrapper).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('should render one animation curve with a dashed border, padding', () => {
        renderAnimationCurveBlock({
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderColor: RED,
                borderWidth: 2,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({
            borderStyle: 'dashed',
            borderWidth: '2px',
            borderColor: 'rgb(255, 0, 0)',
        });
        expect(screen.getByTestId(CANVAS_WRAPPER_TEST_ID)).toHaveClass('tw-px-5', 'tw-py-4');
    });

    it('should render one animation curve with a solid border, radius, padding', () => {
        renderAnimationCurveBlock({
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderColor: RED,
                borderWidth: 2,
                radiusChoice: Radius.Large,
            },
        });
        const card = screen.getByTestId(CARD_TEST_ID);
        expect(card).toHaveStyle({ borderStyle: 'dashed', borderWidth: '2px', borderColor: 'rgb(255, 0, 0)' });
        expect(card).toHaveStyle({ borderRadius: '12px' });
        expect(screen.getByTestId(CANVAS_WRAPPER_TEST_ID)).toHaveClass('tw-px-5', 'tw-py-4');
    });

    it('should render one animation curve with a solid border, custom radius, padding', () => {
        renderAnimationCurveBlock({
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
        const card = screen.getByTestId(CARD_TEST_ID);
        expect(card).toHaveStyle({ borderStyle: 'dashed', borderWidth: '2px', borderColor: 'rgb(255, 0, 0)' });
        expect(card).toHaveStyle({ borderRadius: '42px' });
        expect(screen.getByTestId(CANVAS_WRAPPER_TEST_ID)).toHaveClass('tw-px-5', 'tw-py-4');
    });

    it('should render the animation curve block with background, border radius and no border, the card and the canvas wrapper should have the border radius', () => {
        renderAnimationCurveBlock({
            blockSettings: {
                content: [AnimationCurveDummy.with()],
                hasBackground: true,
                backgroundColor: RED,
                hasBorder: false,
                hasRadius: true,
                radiusValue: '42px',
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ borderRadius: '42px' });
        expect(screen.getByTestId(CANVAS_WRAPPER_TEST_ID)).toHaveStyle({ borderRadius: '42px' });
    });

    it('should render one animation curve with a red line', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], lineColor: RED },
        });
        expect(screen.getByTestId(CANVAS_PATH_TEST_ID)).toHaveAttribute('stroke', RED_HEX);
    });

    it('should render one animation curve without the grid', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasGrid: false },
        });
        expect(screen.queryByTestId(CANVAS_GRID_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render one animation curve with endpoints', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasEndpoints: true, endpointsColor: RED },
        });
        const endpoints = screen.getAllByTestId(CANVAS_ENDPOINT_TEST_ID);
        expect(endpoints).toHaveLength(2);
        for (const endpoint of endpoints) {
            expect(endpoint).toHaveAttribute('fill', RED_HEX);
        }
    });

    it('should render one animation curve with a grid and custom grid color', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasGrid: true, gridColor: RED },
        });
        expect(screen.getByTestId(CANVAS_GRID_TEST_ID)).toBeInTheDocument();
        for (const line of screen.getAllByTestId(CANVAS_LINE_TEST_ID)) {
            expect(line).toHaveAttribute('stroke', RED_HEX);
        }
    });

    it('should render one animation with motions', async () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], hasMotion: true },
        });
        const path = screen.getByTestId(CANVAS_PATH_TEST_ID);
        expect(path).not.toHaveAttribute('style');

        await userEvent.hover(screen.getByTestId(CARD_TEST_ID));

        expect(path).toHaveAttribute('style', expect.stringContaining('animateDash'));
    });

    it('should render in edit mode with the blank slate button height of 82px', () => {
        renderAnimationCurveBlock({ editorState: true });
        expect(screen.getByTestId(BLANK_SLATE_BUTTON_TEST_ID).parentElement).toHaveStyle({ height: '82px' });
    });

    it('should delete the last animation curve', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: {
                content: [AnimationCurveDummy.with(), AnimationCurveDummy.with('2'), AnimationCurveDummy.with('3')],
            },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(3);

        await userEvent.click(getCardToolbar(2).deleteButton);

        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
        });
    });

    // TODO(vitest-migration): 'should have an animation curve that is draggable' dropped — dnd-kit pointer drag needs real layout (getBoundingClientRect) for collision detection.
    // TODO(vitest-migration): 'should move the first animation curve to fourth position by keyboard' and 'should move the fourth animation curve to first position by keyboard' dropped — dnd-kit's keyboard sensor computes the next position from measured element rects, which are all zero in happy-dom.

    it('should add a new animation curve', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);

        const flyout = await openBlankSlateFlyout();
        await userEvent.click(getFlyoutButtons(flyout).saveButton);

        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
        });
    });

    it('should not add an animation curve after pressing cancel', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);

        const flyout = await openBlankSlateFlyout();
        await userEvent.click(getFlyoutButtons(flyout).cancelButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);
    });

    it('should add a custom animation curve', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);

        const flyout = await openBlankSlateFlyout();
        await selectCurveFromDropdown(flyout, 'Custom');
        // TODO(vitest-migration): dragging the start/end handles on the flyout canvas and asserting the resulting x1/y1/x2/y2 values dropped — the pointer-to-parameter mapping divides by the SVG's measured size, which is zero in happy-dom.
        await userEvent.click(getFlyoutButtons(flyout).saveButton);

        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
        });
    });

    it('should update the input fields when a curve is selected from the dropdown', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);

        const flyout = await openBlankSlateFlyout();
        await selectCurveFromDropdown(flyout, 'Ease in (Sine)');

        const { x1, y1, x2, y2 } = defaultAnimationCurveTypeValues[AnimationCurveType.EaseInSine];
        const { x1Input, y1Input, x2Input, y2Input } = getParameterInputs(flyout);
        expect(x1Input).toHaveValue(x1);
        expect(y1Input).toHaveValue(y1);
        expect(x2Input).toHaveValue(x2);
        expect(y2Input).toHaveValue(y2);
    });

    it('should edit an existing animation curve so that it is a custom animation curve', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);

        await userEvent.click(getCardToolbar(0).editButton);
        const flyout = await screen.findByRole('dialog');
        await selectCurveFromDropdown(flyout, 'Custom');
        // TODO(vitest-migration): dragging the start handle on the flyout canvas and asserting the resulting x1/y1/x2/y2 values dropped — the pointer-to-parameter mapping divides by the SVG's measured size, which is zero in happy-dom.
        await userEvent.click(getFlyoutButtons(flyout).saveButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
        expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(1);
    });

    it('should add two animation curves and delete one of them', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });

        await userEvent.click(getFlyoutButtons(await openBlankSlateFlyout()).saveButton);
        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
        });

        await userEvent.click(getFlyoutButtons(await openBlankSlateFlyout()).saveButton);
        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(3);
        });

        await userEvent.click(getCardToolbar(2).deleteButton);
        await waitFor(() => {
            expect(screen.getAllByTestId(CARD_TEST_ID)).toHaveLength(2);
        });
    });

    it('should not allow saving an animation curve with x1 or x2 outside of 0 to 1', async () => {
        renderAnimationCurveBlock({
            editorState: true,
            blockSettings: { content: [AnimationCurveDummy.with()] },
        });

        await userEvent.click(getCardToolbar(0).editButton);
        const flyout = await screen.findByRole('dialog');
        const { saveButton } = getFlyoutButtons(flyout);
        const { x1Input, x2Input } = getParameterInputs(flyout);

        await typeIntoInput(x1Input, '1.1');
        expect(saveButton).toBeDisabled();
        await typeIntoInput(x1Input, '0.25');
        expect(saveButton).not.toBeDisabled();
        await pasteNegativeValue(x1Input);
        expect(saveButton).toBeDisabled();
        await typeIntoInput(x1Input, '0.25');
        expect(saveButton).not.toBeDisabled();

        await typeIntoInput(x2Input, '1.1');
        expect(saveButton).toBeDisabled();
        await typeIntoInput(x2Input, '0.25');
        expect(saveButton).not.toBeDisabled();
        await pasteNegativeValue(x2Input);
        expect(saveButton).toBeDisabled();
    });

    it('should show the correct cubic-bezier values of an ease in animation curve', () => {
        renderAnimationCurveBlock({
            blockSettings: { content: [AnimationCurveDummy.with()], displayCss: true },
        });
        const cssValues = screen.getAllByTestId(CSS_VALUE_TEST_ID);
        expect(cssValues).toHaveLength(1);
        expect(cssValues[0]).toHaveTextContent('cubic-bezier(0.42, 0, 1, 1)');
    });
});
