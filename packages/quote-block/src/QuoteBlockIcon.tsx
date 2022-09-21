/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockAssets } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { DEFAULT_COLOR_VALUE } from './settings';
import { QuoteSize, QuoteStyle, quoteSizeMap } from './types';
import { quoteIconMap } from './utilities';

export type QuoteBlockIconProps = {
    customIconId: string;
    appBridge: AppBridgeBlock;
    quoteStyle: QuoteStyle;
    color?: Color;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
};

export const QuoteBlockIcon: FC<QuoteBlockIconProps> = ({
    customIconId,
    appBridge,
    quoteStyle,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
}) => {
    const { blockAssets } = useBlockAssets(appBridge);

    const customIconUrl = quoteStyle === QuoteStyle.Custom ? blockAssets?.[customIconId]?.[0]?.genericUrl : '';
    const rgbaColor = toRgbaString(color ?? DEFAULT_COLOR_VALUE);
    const size = isCustomSize ? sizeValue ?? '' : quoteSizeMap[sizeChoice ?? QuoteSize.SmallSize];

    return <>{quoteIconMap(size, rgbaColor, customIconUrl)[quoteStyle]}</>;
};
