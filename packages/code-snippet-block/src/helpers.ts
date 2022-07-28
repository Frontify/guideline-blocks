/* (c) Copyright Frontify Ltd., all rights reserved. */

import { transformSpiderToCSSNotation } from '@frontify/guideline-blocks-shared';
import { Property } from 'csstype';
import { BorderRadiusTuple, PaddingTuple } from './types';
import { appendPxSuffix, formatString, isPxSuffixMissing } from './utils';

export const getCustomPadding = (value: PaddingTuple): string => {
    return transformSpiderToCSSNotation(value).reduce(formatString, '');
};

export const getCustomBorderRadius = (value: BorderRadiusTuple): string => {
    return transformSpiderToCSSNotation(value).reduce(formatString, '');
};

// TODO: remove getBorderWidthInPx - use appendUnit after fix
export const getBorderWidthInPx = (lineWidth?: Property.BorderWidth) => {
    let result = lineWidth;
    if (lineWidth && isPxSuffixMissing(lineWidth)) {
        result = appendPxSuffix(lineWidth);
    }
    return result;
};
