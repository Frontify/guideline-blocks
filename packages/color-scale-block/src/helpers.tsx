import { ColorProps, ColorScaleBlockRef } from './types';

export const defaultColorSquareWidth = 100;

export const calculateDefaultColorWidth = (colorArray: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef?.current)) {
        return defaultColorSquareWidth;
    }

    const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
    const defaultWidth = colorScaleBlockWidth / colorArray;

    return defaultWidth;
};

export const calculateWidths = (itemList: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    let emptySpace = 0;
    let usedSpace = 0;
    let emptySquares = 0;
    let emptySquareWidth = 12;
    let itemsWithWidths: ColorProps[] = [];

    itemsWithWidths = itemList?.map((color: ColorProps) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current && (!color || (color && !color.id))) {
            // Square has no ID, so this is an empty placeholder square
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
        const colorBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;

        itemsWithWidths?.map((color: ColorProps) => {
            if (color && color.id && color.width) {
                usedSpace += color.width;
            }

            return color;
        });

        emptySpace = colorBlockWidth - usedSpace;

        emptySquareWidth = emptySpace / emptySquares;

        itemsWithWidths = itemsWithWidths?.map((color: ColorProps) => {
            if (!color || (color && !color.id)) {
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

    if (emptySpace === 0 && itemsWithWidths) {
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
