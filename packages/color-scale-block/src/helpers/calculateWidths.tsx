/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';
import { getEmptySpace } from './getEmptySpace';
import { MINIMUM_AMOUNT_OF_PIXELS_TO_MOVE_DURING_RESIZE } from '../helpers';
import { MINIMUM_AMOUNT_OF_PIXELS_TO_SHIFT_WHEN_ADDING_NEW_COLOR } from '../helpers';
import { MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING } from '../helpers';

export const calculateWidths = (
    itemList: ColorProps[],
    colorScaleBlockRef: ColorScaleBlockRef,
    addingNewColor: boolean
) => {
    let emptySpace = 0;
    let itemsWithWidths: ColorProps[] = [];

    itemsWithWidths = itemList?.map((color: ColorProps) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current && color && !color.width) {
            // In this case, a width is missing
            return {
                ...color,
                width: calculateDefaultColorWidth(itemList.length, colorScaleBlockRef),
            };
        }
        return color;
    });

    emptySpace = getEmptySpace(colorScaleBlockRef, itemList);

    if (addingNewColor) {
        if (emptySpace > MINIMUM_AMOUNT_OF_PIXELS_TO_MOVE_DURING_RESIZE) {
            itemsWithWidths[itemsWithWidths.length - 1].width = emptySpace;
        }
    }

    emptySpace = getEmptySpace(colorScaleBlockRef, itemList);

    if (emptySpace <= MINIMUM_COLOR_WIDTH_TO_ALLOW_RESIZING && itemsWithWidths) {
        if (addingNewColor) {
            let resizingDone = false;
            itemsWithWidths = itemsWithWidths?.map((color: ColorProps) => {
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

    return itemsWithWidths || [];
};
