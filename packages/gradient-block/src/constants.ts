/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { GradientHeight, GradientOrientation } from './types';

export const HEIGHT_OF_SQUARE_BADGE = 28;
export const DEFAULT_HEIGHT_VALUE = GradientHeight.Small;
export const DEFAULT_ORIENTATION_VALUE = GradientOrientation.Horizontal;
export const DEFAULT_GRADIENT_COLORS = [
    {
        color: {
            red: 217,
            green: 217,
            blue: 213,
            alpha: 1,
            name: 'Light gray',
        } as Color,
        position: 0,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
            name: 'White',
        } as Color,
        position: 100,
    },
];
