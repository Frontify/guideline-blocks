/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { QuoteSize, type QuoteStyle, quoteSizeMap } from './types';
import { quoteIconMap } from './utilities';
import { Asset } from '@frontify/app-bridge';

export type QuoteBlockIconProps = {
    customIcon: Asset | undefined;
    quoteStyle: QuoteStyle;
    color: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIcon,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
}) => {
    const size = isCustomSize ? (sizeValue ?? '') : quoteSizeMap[sizeChoice ?? QuoteSize.LargeSize];
    return quoteIconMap(size, color, customIcon)[quoteStyle];
};
