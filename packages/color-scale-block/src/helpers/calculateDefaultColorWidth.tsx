/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorScaleBlockRef } from '../types';
import { defaultColorSquareWidth } from './constants';

export const calculateDefaultColorWidth = (colorArray: number, colorScaleBlockRef: ColorScaleBlockRef) => {
    if (!(colorScaleBlockRef && colorScaleBlockRef?.current)) {
        return defaultColorSquareWidth;
    }

    const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
    const defaultWidth = colorScaleBlockWidth / colorArray;

    return defaultWidth;
};
