/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef, ResizeEvenlyOptions } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const resizeEvenly = (
    unfilteredList: ColorProps[],
    colorScaleBlockRef: ColorScaleBlockRef,
    options?: ResizeEvenlyOptions
) => {
    const skipResizedColors = options?.skipResizedColors ?? null;

    const colorsToIncludeInCalculation = unfilteredList.filter((color) => {
        if (skipResizedColors && color.resized) {
            return false;
        }

        return true;
    });

    // if (skipResizedColors && colorsToIncludeInCalculation.length > 0) {
    //     const defaultWidth = calculateDefaultColorWidth(colorsToIncludeInCalculation.length, colorScaleBlockRef);

    //     return unfilteredList.map((item) => {
    //         return { ...item, width: defaultWidth, resized: skipResizedColors ? item.resized : false };
    //     });
    // }

    const defaultWidth = calculateDefaultColorWidth(
        skipResizedColors && colorsToIncludeInCalculation.length > 0
            ? colorsToIncludeInCalculation.length
            : unfilteredList.length,
        colorScaleBlockRef
    );

    return unfilteredList.map((item) => {
        return {
            ...item,
            width: skipResizedColors && item.resized ? item.width : defaultWidth,
            resized: skipResizedColors ? item.resized : false,
        };
    });
};
