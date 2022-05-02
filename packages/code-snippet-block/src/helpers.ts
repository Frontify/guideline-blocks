/* (c) Copyright Frontify Ltd., all rights reserved. */

import { transformToClockwiseNotation } from '@frontify/guideline-blocks-shared';
import { Property } from 'csstype';
import { BorderRadiusTuple, PaddingTuple } from './types';
import { appendPxSufix, formatString, isPxSufixMissing } from './utils';

export const getCustomPadding = (value: PaddingTuple): string => {
    return transformToClockwiseNotation(value).reduce(formatString, '');
};

export const getCustomBorderRadius = (value: BorderRadiusTuple): string => {
    return transformToClockwiseNotation(value).reduce(formatString, '');
};

// TODO: remove getBorderWidthInPx - use appendUnit after fix
export const getBorderWidthInPx = (lineWidth?: Property.BorderWidth) => {
    let result = lineWidth;
    if (lineWidth && isPxSufixMissing(lineWidth)) {
        result = appendPxSufix(lineWidth);
    }
    return result;
};
