/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorScaleBlockRef } from '../types';
import { DEFAULT_COLOR_SQUARE_WIDTH } from './constants';

export const calculateDefaultColorWidth = (colorArrayLength: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!colorScaleBlockRef.current) {
        return DEFAULT_COLOR_SQUARE_WIDTH;
    }

    const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;

    return colorScaleBlockWidth / colorArrayLength;
};
