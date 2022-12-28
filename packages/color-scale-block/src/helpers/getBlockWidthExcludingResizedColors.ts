/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    COLOR_SCALE_BLOCK_BORDER_WIDTH,
    COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING,
    COLOR_SQUARE_SPACING,
} from './constants';
import { ColorProps, ColorScaleBlockRef } from '../types';

export const getBlockWidthExcludingResizedColors = (
    colorArray: ColorProps[],
    colorScaleBlockRef: ColorScaleBlockRef
) => {
    if (colorScaleBlockRef.current === null) {
        return;
    }

    let resizedColorsTotalWidth = 0;

    for (const color in colorArray) {
        if (colorArray[color].resized) {
            resizedColorsTotalWidth += colorArray[color].width + COLOR_SQUARE_SPACING;
        }
    }

    const blockWidth =
        colorScaleBlockRef.current.getBoundingClientRect().width -
        COLOR_SQUARE_SPACING * colorArray.length -
        COLOR_SCALE_BLOCK_BORDER_WIDTH -
        COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING;

    const blockWidthExcludingResizedColors = blockWidth - resizedColorsTotalWidth;

    return blockWidthExcludingResizedColors;
};
