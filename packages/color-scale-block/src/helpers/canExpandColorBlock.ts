/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorProps, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const canExpandColorBlock = (displayableItems: ColorProps[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const colorScaleBlockWidth = colorScaleBlockRef.current?.getBoundingClientRect().width || 0;
    let usedSpace = 0;

    for (const color of displayableItems) {
        const width = color.width ?? calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);

        if (width) {
            usedSpace += width;
        }
    }

    return usedSpace < colorScaleBlockWidth;
};
