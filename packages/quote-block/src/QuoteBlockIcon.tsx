/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { QuoteSize, QuoteStyle, quoteSizeMap } from './types';
import { quoteIconMap } from './utilities';

export type QuoteBlockIconProps = {
    customIconId: string;
    blockAssets: Record<string, Asset[]>;
    quoteStyle: QuoteStyle;
    color: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    isCustomQuoteStyle?: boolean;
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIconId,
    blockAssets,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
    isCustomQuoteStyle,
}) => {
    const customIconUrl = isCustomQuoteStyle ? blockAssets?.[customIconId]?.[0]?.genericUrl : '';
    const size = isCustomSize ? sizeValue ?? '' : quoteSizeMap[sizeChoice ?? QuoteSize.LargeSize];
    return quoteIconMap(size, color, customIconUrl)[quoteStyle];
};
