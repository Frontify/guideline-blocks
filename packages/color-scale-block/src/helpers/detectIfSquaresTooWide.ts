/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    COLOR_SCALE_BLOCK_BORDER_WIDTH,
    COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING,
    COLOR_SQUARE_SPACING,
} from './constants';
import { ColorProps, ColorScaleBlockRef } from '../types';

export const detectIfSquaresTooWide = (colorArray: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const colorScaleBlockWidth =
        (colorScaleBlockRef?.current?.getBoundingClientRect().width ?? 0) -
        COLOR_SCALE_BLOCK_BORDER_WIDTH -
        COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING -
        COLOR_SQUARE_SPACING * colorArray.length -
        1;

    let pixelsTakenByColorSquares = 0;

    for (const color of colorArray) {
        pixelsTakenByColorSquares += color.width;
    }

    if (pixelsTakenByColorSquares >= colorScaleBlockWidth) {
        return true;
    }

    return false;
};
