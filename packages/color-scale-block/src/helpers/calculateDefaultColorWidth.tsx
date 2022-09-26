/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorScaleBlockRef } from '../types';
import { DEFAULT_COLOR_SQUARE_WIDTH } from './constants';

export const calculateDefaultColorWidth = (colorArray: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef?.current)) {
        return DEFAULT_COLOR_SQUARE_WIDTH;
    }

    const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
    const defaultWidth = colorScaleBlockWidth / colorArray;

    return defaultWidth;
};
