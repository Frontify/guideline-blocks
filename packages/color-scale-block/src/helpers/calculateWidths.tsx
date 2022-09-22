/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';
import { getEmptySpace } from './getEmptySpace';
import { minimumAmountOfPixelsToMoveDuringResize } from '../helpers';
import { minimumAmountOfPixelsToShiftWhenAddingNewColor } from '../helpers';
import { minimumColorWidthToAllowResizing } from '../helpers';

export const calculateWidths = (
    itemList: ColorProps[],
    colorScaleBlockRef: ColorScaleBlockRef,
    addingNewColor: boolean
) => {
    let emptySpace = 0;
    let emptySquares = 0;
    let emptySquareWidth = 12;
    let itemsWithWidths: ColorProps[] = [];

    itemsWithWidths = itemList?.map((color: ColorProps) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current && (!color || (color && !color.color))) {
            // Square has no color, so this is an empty placeholder square
            emptySquares++;
            return color;
        } else if (colorScaleBlockRef && colorScaleBlockRef.current && (!color || (color && !color.width))) {
            // In this case, a width is missing
            return {
                ...color,
                width: calculateDefaultColorWidth(itemList.length, colorScaleBlockRef),
            };
        }
        return color;
    });

    if (colorScaleBlockRef && colorScaleBlockRef.current) {
        const emptySpace: number = getEmptySpace(colorScaleBlockRef, itemList);

        emptySquareWidth = addingNewColor ? emptySpace : emptySpace / emptySquares;

        itemsWithWidths = itemsWithWidths?.map((color: ColorProps) => {
            if (!color || (color && !color.color)) {
                if (color) {
                    return { ...color, width: emptySquareWidth };
                }
                return {
                    width: emptySquareWidth,
                    alt: 'Click to drag',
                };
            }
            return color;
        });
    }

    emptySpace = getEmptySpace(colorScaleBlockRef, itemList);

    if (addingNewColor) {
        if (emptySpace > minimumAmountOfPixelsToMoveDuringResize) {
            itemsWithWidths[itemsWithWidths.length - 1].width = emptySpace;

            emptySquareWidth = 0;
        }
    }

    emptySpace = getEmptySpace(colorScaleBlockRef, itemList);

    if (emptySpace <= minimumColorWidthToAllowResizing && itemsWithWidths) {
        itemsWithWidths = itemsWithWidths?.map((color: ColorProps) => {
            if (!color || (color && !color.id)) {
                if (color) {
                    return {
                        ...color,
                        width: calculateDefaultColorWidth(itemList.length, colorScaleBlockRef),
                    };
                }
                return {
                    width: calculateDefaultColorWidth(itemList.length, colorScaleBlockRef),
                    alt: 'Click to drag',
                };
            }
            return color;
        });

        if (addingNewColor) {
            let resizingDone = false;
            itemsWithWidths = itemsWithWidths?.map((color: ColorProps) => {
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
