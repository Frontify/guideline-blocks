/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const resizeEvenly = (itemList: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const defaultWidth = calculateDefaultColorWidth(itemList.length, colorScaleBlockRef);

    return itemList.map((item) => {
        return { ...item, width: defaultWidth, resized: false };
    });
};
