/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HEIGHT_OF_SQUARE_BADGE } from './constants';
import { GradientBlock } from './GradientBlock';
import {
    HEIGHT_CUSTOM_ID,
    HEIGHT_SIMPLE_ID,
    IS_CUSTOM_HEIGHT_ID,
    IS_CUSTOM_ORIENTATION_ID,
    ORIENTATION_CUSTOM_ID,
    ORIENTATION_SIMPLE_ID,
} from './settings';
import { GradientHeight, GradientOrientation } from './types';

const ADD_COLOR_BUTTON_TEST_ID = 'add-color-button';
const COLOR_TOOLTIP_TEST_ID = 'color-tooltip';
const COLOR_POINTS_TEST_ID = 'color-points';
const COLOR_PICKER_FORM_TEST_ID = 'color-picker-form';
const CSS_VALUE_DISPLAY_TEST_ID = 'css-value-display';
const CSS_COPY_BUTTON_TEST_ID = 'css-value-display-copy-button';
const EDIT_AND_DELETE_COLOR_BOX_TEST_ID = 'edit-and-delete-color-box';
const GRADIENT_BLOCK_DISPLAY_TEST_ID = 'gradient-block-display';
const GRADIENT_BLOCK_DIVIDER_TEST_ID = 'gradient-block-divider';
const SQUARE_BADGE_TEST_ID = 'square-badge';
const SQUARE_BADGE_CHECKMARK_TEST_ID = 'square-badge-checkmark';
const SQUARE_BADGE_CLIPBOARD_TEST_ID = 'square-badge-clipboard';
const COLOR_INPUT_HEX_TEST_ID = 'color-picker-value-input-hex';
const FLYOUT_TRIGGER_TEST_ID = 'fondue-flyout-trigger';
const BRAND_COLOR_TEST_ID = 'brand-color';
const EDIT_COLOR_LABEL = 'Edit color';
const DELETE_COLOR_LABEL = 'Delete color';
const BLOCK_WIDTH = 800;
const ADD_COLOR_MOUSE_X = 400;

const HORIZONTAL_GRADIENT =
    'linear-gradient(90deg, #ffffff 0%, #000000 25%, #ffffff 100%)';
const HORIZONTAL_GRADIENT_WITH_OPACITY =
    'linear-gradient(90deg, #ffffff 0%, #00000080 25%, #ffffff 100%)';
const HORIZONTAL_GRADIENT_WITH_RED_STOP =
    'linear-gradient(90deg, #ffffff 0%, #000000 25%, #ff0000 50%, #ffffff 100%)';
const HORIZONTAL_GRADIENT_BLUE_STOP =
    'linear-gradient(90deg, #ffffff 0%, #0000ff 25%, #ffffff 100%)';
const HORIZONTAL_GRADIENT_AFTER_DELETE =
    'linear-gradient(90deg, #ffffff 0%, #ffffff 100%)';
const VERTICAL_GRADIENT = 'linear-gradient(0deg, #ffffff 0%, #000000 25%, #ffffff 100%)';
const CUSTOM_ORIENTATION_GRADIENT =
    'linear-gradient(45deg, #ffffff 0%, #000000 25%, #ffffff 100%)';

const gradientColors = [
    {
        color: { red: 255, green: 255, blue: 255, alpha: 1 },
        position: 0,
    },
    {
        color: { red: 0, green: 0, blue: 0, alpha: 1 },
        position: 25,
    },
    {
        color: { red: 255, green: 255, blue: 255, alpha: 1 },
        position: 100,
    },
];

const gradientColorsWithOpacity = [
    {
        color: { red: 255, green: 255, blue: 255, alpha: 1 },
        position: 0,
    },
    {
        color: { red: 0, green: 0, blue: 0, alpha: 0.5 },
        position: 25,
    },
    {
        color: { red: 255, green: 255, blue: 255, alpha: 1 },
        position: 100,
    },
];

const multiLevelGradientColors = [
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 0 },
    { color: { red: 0, green: 0, blue: 0, alpha: 1 }, position: 1 },
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 2 },
    { color: { red: 0, green: 0, blue: 0, alpha: 1 }, position: 3 },
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 4 },
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 20 },
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 21 },
    { color: { red: 255, green: 255, blue: 255, alpha: 1 }, position: 95 },
    { color: { red: 0, green: 0, blue: 0, alpha: 1 }, position: 100 },
];

const targetForMultiLevelGradient = [0, 1, 2, 3, 4, 0, 1, 0, 1];

const renderGradientBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [GradientBlockWithStubs, appBridge] = withAppBridgeBlockStubs(GradientBlock, appBridgeProps);
    const utils = render(<GradientBlockWithStubs />);
    utils.rerender(<GradientBlockWithStubs />);
    return { ...utils, appBridge, GradientBlockWithStubs };
};

const expectedBackground = (cssValue: string) => ({ background: cssValue });

describe('Gradient Block', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal('navigator', {
        clipboard: { writeText },
    });

    beforeEach(() => {
        vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(BLOCK_WIDTH);
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            x: 0,
            y: 0,
            width: BLOCK_WIDTH,
            height: 40,
            top: 0,
            left: 0,
            right: BLOCK_WIDTH,
            bottom: 40,
            toJSON: () => ({}),
        } as DOMRect);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render a gradient block', () => {
        renderGradientBlock({
            blockSettings: { gradientColors },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT)
        );
    });

    it('should render three square badges', async () => {
        renderGradientBlock({
            blockSettings: { gradientColors: gradientColorsWithOpacity },
        });

        const badges = await screen.findAllByTestId(SQUARE_BADGE_TEST_ID);
        expect(badges).toHaveLength(3);
        expect(badges[0]).toHaveTextContent('#ffffff');
        expect(badges[1]).toHaveTextContent('#00000080');
        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT_WITH_OPACITY)
        );
    });

    it('should stack square badges on multiple levels', async () => {
        renderGradientBlock({
            blockSettings: { gradientColors: multiLevelGradientColors },
        });

        const badges = await screen.findAllByTestId(SQUARE_BADGE_TEST_ID);
        badges.forEach((badge, index) => {
            expect(badge).toHaveStyle({
                top: `${targetForMultiLevelGradient[index] * HEIGHT_OF_SQUARE_BADGE}px`,
            });
        });
    });

    it('should render a CSS value display', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                displayCss: true,
            },
        });

        expect(screen.getByTestId(CSS_VALUE_DISPLAY_TEST_ID)).toBeInTheDocument();
    });

    it('should copy the CSS value in view mode', async () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                displayCss: true,
            },
        });

        await userEvent.click(screen.getByTestId(CSS_COPY_BUTTON_TEST_ID));
        expect(screen.getByTestId(CSS_COPY_BUTTON_TEST_ID)).toHaveTextContent('Copied');
    });

    it('should render three color points in edit mode', () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        expect(screen.getAllByTestId(COLOR_POINTS_TEST_ID)).toHaveLength(3);
    });

    it('should change the square badge icon after copy', async () => {
        renderGradientBlock({
            blockSettings: { gradientColors },
        });

        const badge = (await screen.findAllByTestId(SQUARE_BADGE_TEST_ID))[0];
        expect(badge.querySelector(`[data-test-id="${SQUARE_BADGE_CLIPBOARD_TEST_ID}"]`)).toBeInTheDocument();

        await userEvent.click(badge.querySelector('button') as HTMLElement);

        await waitFor(() => {
            expect(badge.querySelector(`[data-test-id="${SQUARE_BADGE_CHECKMARK_TEST_ID}"]`)).toBeInTheDocument();
        });
    });

    it('should not load color palettes on render', () => {
        const { appBridge } = renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        expect(appBridge.getColorPalettesWithColors.called).toBe(false);
    });

    it('should show the add color button on hover', () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        fireEvent.mouseMove(screen.getByTestId(GRADIENT_BLOCK_DIVIDER_TEST_ID), {
            clientX: ADD_COLOR_MOUSE_X,
            clientY: 10,
        });

        expect(screen.getByTestId(ADD_COLOR_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should load color palettes when the color flyout is opened', async () => {
        const { appBridge } = renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        expect(appBridge.getColorPalettesWithColors.called).toBe(false);

        await userEvent.click(screen.getAllByLabelText(EDIT_COLOR_LABEL)[0]);

        await waitFor(() => {
            expect(appBridge.getColorPalettesWithColors.called).toBe(true);
        });
        expect(screen.getByTestId(COLOR_PICKER_FORM_TEST_ID)).toBeInTheDocument();
    });

    it('should add a new color from the flyout', async () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        fireEvent.mouseMove(screen.getByTestId(GRADIENT_BLOCK_DIVIDER_TEST_ID), {
            clientX: ADD_COLOR_MOUSE_X,
            clientY: 10,
        });
        await userEvent.click(screen.getByTestId(ADD_COLOR_BUTTON_TEST_ID));

        const colorPickerForm = await screen.findByTestId(COLOR_PICKER_FORM_TEST_ID);
        await userEvent.click(colorPickerForm.querySelector(`[data-test-id="${FLYOUT_TRIGGER_TEST_ID}"]`) as HTMLElement);

        const brandColor = await screen.findAllByTestId(BRAND_COLOR_TEST_ID);
        await userEvent.click(brandColor[0]);

        const saveAndCloseButtons = screen.getAllByRole('button', { name: /save|close/i });
        await userEvent.click(saveAndCloseButtons.find((button) => button.textContent?.includes('Save')) as HTMLElement);
        await userEvent.click(saveAndCloseButtons.find((button) => button.textContent?.includes('Close')) as HTMLElement);

        await waitFor(() => {
            expect(screen.getAllByTestId(COLOR_POINTS_TEST_ID)).toHaveLength(4);
        });
        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT_WITH_RED_STOP)
        );
    });

    it('should show a tooltip on a color point', () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        expect(screen.getAllByTestId(COLOR_TOOLTIP_TEST_ID)[0]).toBeInTheDocument();
        expect(screen.getAllByTestId(EDIT_AND_DELETE_COLOR_BOX_TEST_ID)[0]).toBeInTheDocument();
    });

    it('should edit an existing color to blue', async () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        await userEvent.click(screen.getAllByLabelText(EDIT_COLOR_LABEL)[1]);

        const colorPickerForm = await screen.findByTestId(COLOR_PICKER_FORM_TEST_ID);
        await userEvent.click(colorPickerForm.querySelector(`[data-test-id="${FLYOUT_TRIGGER_TEST_ID}"]`) as HTMLElement);
        await userEvent.click(await screen.findByLabelText('Custom'));

        const hexInput = screen.getByTestId(COLOR_INPUT_HEX_TEST_ID).querySelector('input') as HTMLInputElement;
        await userEvent.clear(hexInput);
        await userEvent.type(hexInput, '0000ff');
        await userEvent.tab();

        const saveButton = screen.getAllByRole('button').find((button) => button.textContent?.includes('Save'));
        await userEvent.click(saveButton as HTMLElement);

        const closeButton = screen.getAllByRole('button').find((button) => button.textContent?.includes('Close'));
        await userEvent.click(closeButton as HTMLElement);

        await waitFor(() => {
            expect(screen.getAllByTestId(COLOR_POINTS_TEST_ID)).toHaveLength(3);
        });
        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT_BLUE_STOP)
        );
    });

    it('should delete an existing color', async () => {
        renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        await userEvent.click(screen.getAllByLabelText(DELETE_COLOR_LABEL)[1]);

        expect(screen.getAllByTestId(COLOR_POINTS_TEST_ID)).toHaveLength(2);
        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT_AFTER_DELETE)
        );
    });

    it('should use the small gradient height', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Small,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle({ height: '48px' });
    });

    it('should use the medium gradient height', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Medium,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle({ height: '72px' });
    });

    it('should use the large gradient height', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Large,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle({ height: '96px' });
    });

    it('should use a custom gradient height', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [IS_CUSTOM_HEIGHT_ID]: true,
                [HEIGHT_CUSTOM_ID]: 300,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle({ height: '300px' });
    });

    it('should use a horizontal gradient orientation', () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [ORIENTATION_SIMPLE_ID]: GradientOrientation.Horizontal,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(HORIZONTAL_GRADIENT)
        );
    });

    it('should use a vertical gradient orientation', async () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [ORIENTATION_SIMPLE_ID]: GradientOrientation.Vertical,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(expectedBackground(VERTICAL_GRADIENT));

        const badges = await screen.findAllByTestId(SQUARE_BADGE_TEST_ID);
        badges.forEach((badge, index) => {
            expect(badge).toHaveStyle({
                left: '0%',
                top: `${index * HEIGHT_OF_SQUARE_BADGE}px`,
            });
        });
    });

    it('should use a custom gradient orientation', async () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors,
                [IS_CUSTOM_ORIENTATION_ID]: true,
                [ORIENTATION_CUSTOM_ID]: 45,
            },
        });

        expect(screen.getByTestId(GRADIENT_BLOCK_DISPLAY_TEST_ID)).toHaveStyle(
            expectedBackground(CUSTOM_ORIENTATION_GRADIENT)
        );

        const badges = await screen.findAllByTestId(SQUARE_BADGE_TEST_ID);
        badges.forEach((badge, index) => {
            expect(badge).toHaveStyle({
                left: '0%',
                top: `${index * HEIGHT_OF_SQUARE_BADGE}px`,
            });
        });
    });

    it('should not overlay the gradient block if just one color is present', async () => {
        renderGradientBlock({
            blockSettings: {
                gradientColors: [
                    {
                        color: { red: 255, green: 255, blue: 255, alpha: 1 },
                        position: 0,
                    },
                ],
            },
        });

        const badges = await screen.findAllByTestId(SQUARE_BADGE_TEST_ID);
        expect(badges).toHaveLength(1);
        expect(badges[0]).toHaveStyle({ top: '0px' });
    });
});
