/* (c) Copyright Frontify Ltd., all rights reserved. */

import { blockColor, ColorScaleBlockRef } from '../types';

export const getEmptySpace = (colorScaleBlockRef: ColorScaleBlockRef, colorArray: blockColor[]) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef.current)) {
        return 0;
    }

    const colorBlockWidth: number = colorScaleBlockRef?.current?.getBoundingClientRect().width;
    let usedSpace = 0;
    let emptySpace = 0;

    colorArray?.map((color: blockColor) => {
        if (color && color.width) {
            usedSpace += color.width;
        }

        return color;
    });

    emptySpace = colorBlockWidth - usedSpace;

    return emptySpace;
};
