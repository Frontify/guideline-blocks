/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockColor, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';
import { getEmptySpace } from './getEmptySpace';
import { minimumAmountOfPixelsToMoveDuringResize } from '../helpers';
import { minimumAmountOfPixelsToShiftWhenAddingNewColor } from '../helpers';
import { minimumColorWidthToAllowResizing } from '../helpers';

export const calculateWidths = (
    itemList: BlockColor[],
    colorScaleBlockRef: ColorScaleBlockRef,
    addingNewColor: boolean
) => {
    let emptySpace = 0;
    let itemsWithWidths: BlockColor[] = [];

    itemsWithWidths = itemList?.map((color: BlockColor) => {
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
        if (emptySpace > minimumAmountOfPixelsToMoveDuringResize) {
            itemsWithWidths[itemsWithWidths.length - 1].width = emptySpace;
        }
    }

    emptySpace = getEmptySpace(colorScaleBlockRef, itemList);

    if (emptySpace <= minimumColorWidthToAllowResizing && itemsWithWidths) {
        if (addingNewColor) {
            let resizingDone = false;
            itemsWithWidths = itemsWithWidths?.map((color: BlockColor) => {
                if (!resizingDone) {
                    if (color && color.width && color.width > minimumColorWidthToAllowResizing) {
                        resizingDone = true;

                        return {
                            ...color,
                            width: color && color.width - minimumAmountOfPixelsToShiftWhenAddingNewColor,
                        };
                    }
                }
                return color;
            });

            itemsWithWidths[itemsWithWidths.length - 1].width = minimumColorWidthToAllowResizing;
        }
    }

    return itemsWithWidths || [];
};
