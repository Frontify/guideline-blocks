/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { GradientBlock } from './GradientBlock';

const EDIT_COLOR_LABEL = 'Edit color';

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

const renderGradientBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [GradientBlockWithStubs, appBridge] = withAppBridgeBlockStubs(GradientBlock, appBridgeProps);
    const utils = render(<GradientBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('GradientBlock', () => {
    it('should not load color palettes on render', () => {
        const { appBridge } = renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        expect(appBridge.getColorPalettesWithColors.called).toBe(false);
    });

    it('should load color palettes when the color flyout is opened', async () => {
        const { appBridge } = renderGradientBlock({
            editorState: true,
            blockSettings: { gradientColors },
        });

        await userEvent.click(screen.getAllByLabelText(EDIT_COLOR_LABEL)[0]);

        await waitFor(() => {
            expect(appBridge.getColorPalettesWithColors.called).toBe(true);
        });
    });
});
