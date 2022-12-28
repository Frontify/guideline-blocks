/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const resizeEvenly = (unfilteredList: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const defaultWidth = calculateDefaultColorWidth(unfilteredList.length, colorScaleBlockRef);

    return unfilteredList.map((item) => ({
        ...item,
        width: defaultWidth,
        resized: false,
    }));
};
