/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

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
