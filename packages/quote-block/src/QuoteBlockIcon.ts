/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { type FC } from 'react';

import { QuoteSize, type QuoteStyle, quoteSizeMap } from './types';
import { quoteIconMap } from './utilities';

export type QuoteBlockIconProps = {
    customIcon: Asset | undefined;
    quoteStyle: QuoteStyle;
    color: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    position?: 'top' | 'bottom';
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIcon,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
    position = 'top',
}) => {
    const size = isCustomSize ? (sizeValue ?? '') : quoteSizeMap[sizeChoice ?? QuoteSize.LargeSize];
    return quoteIconMap(size, color, customIcon, position)[quoteStyle];
};
