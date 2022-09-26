/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockColor, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';
import { getEmptySpace } from './getEmptySpace';
import { MINIMUM_AMOUNT_OF_PIXELS_TO_MOVE_DURING_RESIZE } from '.';
import { MINIMUM_AMOUNT_OF_PIXELS_TO_SHIFT_WHEN_ADDING_NEW_COLOR } from '.';
import { MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING } from '.';

export const calculateWidths = (
    blockColors: BlockColor[],
    colorScaleBlockRef: ColorScaleBlockRef,
    addingNewColor: boolean
) => {
    let emptySpace, itemsWithWidths: BlockColor[];

    itemsWithWidths = blockColors.map((color: BlockColor) => {
        if (colorScaleBlockRef?.current && !color?.width) {
            // In this case, a width is missing
            return {
                ...color,
                width: calculateDefaultColorWidth(blockColors.length, colorScaleBlockRef),
            };
        }
        return color;
    });

    emptySpace = getEmptySpace(colorScaleBlockRef, blockColors);

    if (addingNewColor) {
        if (emptySpace > MINIMUM_AMOUNT_OF_PIXELS_TO_MOVE_DURING_RESIZE) {
            itemsWithWidths[itemsWithWidths.length - 1].width = emptySpace;
        }
    }

    emptySpace = getEmptySpace(colorScaleBlockRef, blockColors);

    if (emptySpace <= MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING && itemsWithWidths) {
        if (addingNewColor) {
            let resizingDone = false;
            itemsWithWidths = itemsWithWidths.map((color: BlockColor) => {
                if (!resizingDone) {
                    if (color?.width && color.width > MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING) {
                        resizingDone = true;

                        return {
                            ...color,
                            width: color?.width - MINIMUM_AMOUNT_OF_PIXELS_TO_SHIFT_WHEN_ADDING_NEW_COLOR,
                        };
                    }
                }
                return color;
            });

            itemsWithWidths[itemsWithWidths.length - 1].width = MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING;
        }
    }

    return itemsWithWidths;
};
