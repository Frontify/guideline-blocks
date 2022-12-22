/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const resizeEvenly = (unfilteredList: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    // if (skipResizedColors && colorsToIncludeInCalculation.length > 0) {
    //     const defaultWidth = calculateDefaultColorWidth(colorsToIncludeInCalculation.length, colorScaleBlockRef);

    //     return unfilteredList.map((item) => {
    //         return { ...item, width: defaultWidth, resized: skipResizedColors ? item.resized : false };
    //     });
    // }

    const defaultWidth = calculateDefaultColorWidth(unfilteredList.length, colorScaleBlockRef);

    return unfilteredList.map((item) => {
        return {
            ...item,
            width: defaultWidth,
            resized: false,
        };
    });
};
