import { ColorProps, ColorScaleBlockRef } from './types';

export const defaultColorSquareWidth = 100;
export const minimumColorWidthToAllowResizing = 18;
export const minimumAmountOfPixelsToMoveDuringResize = 8;
export const minimumAmountOfPixelsToShiftWhenAddingNewColor = 18;

export const calculateDefaultColorWidth = (colorArray: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef?.current)) {
        return defaultColorSquareWidth;
    }

    const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
    const defaultWidth = colorScaleBlockWidth / colorArray;

    return defaultWidth;
};

export const getEmptySpace = (colorScaleBlockRef: ColorScaleBlockRef, colorArray: ColorProps[]) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef.current)) {
        return 0;
    }

    const colorBlockWidth: number = colorScaleBlockRef?.current?.getBoundingClientRect().width;
    let usedSpace = 0;
    let emptySpace = 0;

    colorArray?.map((color: ColorProps) => {
        if (color && color.color && color.width) {
            usedSpace += color.width;
        }

        return color;
    });

    emptySpace = colorBlockWidth - usedSpace;

    return emptySpace;
};

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

export const resizeEvenly = (itemList: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!itemList) {
        return [];
    }

    const defaultWidth = calculateDefaultColorWidth(itemList.length, colorScaleBlockRef);

    const newDisplayableItems = itemList.map((item) => {
        return { ...item, width: defaultWidth };
    });

    return newDisplayableItems;
};

export const canExpandColorBlock = (displayableItems: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const colorScaleBlockWidth = colorScaleBlockRef?.current?.getBoundingClientRect().width || 0;
    let usedSpace = 0;

    displayableItems?.map((color: ColorProps) => {
        const width = color?.width ?? calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);

        if (width) {
            usedSpace += width;
        }

        return color;
    });

    return usedSpace < colorScaleBlockWidth;
};
