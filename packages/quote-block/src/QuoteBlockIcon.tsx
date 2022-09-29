/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { DEFAULT_COLOR_VALUE } from './settings';
import { QuoteSize, quoteSizeMap, QuoteStyle } from './types';
import { quoteIconMap } from './utilities';

export type QuoteBlockIconProps = {
    customIconId: string;
    blockAssets: Record<string, Asset[]>;
    quoteStyle: QuoteStyle;
    color?: Color;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIconId,
    blockAssets,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
}) => {
    const customIconUrl = quoteStyle === QuoteStyle.Custom ? blockAssets?.[customIconId]?.[0]?.genericUrl : '';
    const rgbaColor = toRgbaString(color ?? DEFAULT_COLOR_VALUE);
    const size = isCustomSize ? sizeValue ?? '' : quoteSizeMap[sizeChoice ?? QuoteSize.SmallSize];

    return <>{quoteIconMap(size, rgbaColor, customIconUrl)[quoteStyle]}</>;
};
