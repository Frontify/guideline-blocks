/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { QuoteSize, QuoteStyle, quoteSizeMap } from './types';
import { quoteIconMap } from './utilities';
import { AppBridgeBlock } from '@frontify/app-bridge';

export type QuoteBlockIconProps = {
    customIconId: string;
    appBridge: AppBridgeBlock;
    quoteStyle: QuoteStyle;
    color: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIconId,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
    appBridge,
}) => {
    const size = isCustomSize ? sizeValue ?? '' : quoteSizeMap[sizeChoice ?? QuoteSize.LargeSize];
    return quoteIconMap(size, color, customIconId, appBridge)[quoteStyle];
};
