/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientHeight, GradientOrientation } from './types';

export const HEIGHT_OF_SQUARE_BADGE = 28;
export const DEFAULT_HEIGHT_VALUE = GradientHeight.Medium;
export const DEFAULT_ORIENTATION_VALUE = GradientOrientation.Horizontal;
export const DEFAULT_GRADIENT_COLORS = [
    {
        color: {
            red: 171,
            green: 173,
            blue: 173,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 100,
    },
];
