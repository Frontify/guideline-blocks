/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorScaleBlockRef } from '../types';
import {
    COLOR_SCALE_BLOCK_BORDER_WIDTH,
    COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING,
    COLOR_SQUARE_SPACING,
    DEFAULT_COLOR_SQUARE_WIDTH,
} from './constants';

export const calculateDefaultColorWidth = (colorArrayLength: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!colorScaleBlockRef.current) {
        return DEFAULT_COLOR_SQUARE_WIDTH;
    }

    const colorScaleBlockWidth =
        colorScaleBlockRef.current.getBoundingClientRect().width -
        COLOR_SCALE_BLOCK_BORDER_WIDTH -
        COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING -
        4;

    return colorScaleBlockWidth / colorArrayLength;
};
