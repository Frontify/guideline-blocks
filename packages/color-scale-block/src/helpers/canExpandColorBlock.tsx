/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockColor, ColorScaleBlockRef } from '../types';
import { calculateDefaultColorWidth } from './calculateDefaultColorWidth';

export const canExpandColorBlock = (displayableItems: BlockColor[], colorScaleBlockRef: ColorScaleBlockRef) => {
    const colorScaleBlockWidth = colorScaleBlockRef?.current?.getBoundingClientRect().width || 0;
    let usedSpace = 0;

    displayableItems?.map((color: BlockColor) => {
        const width = color?.width ?? calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);

        if (width) {
            usedSpace += width;
        }

        return color;
    });

    return usedSpace < colorScaleBlockWidth;
};
