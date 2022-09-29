/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { FC } from 'react';
import { QuoteBlockIcon, QuoteBlockIconProps } from './QuoteBlockIcon';
import { CUSTOM_ICON_LEFT_ID, CUSTOM_ICON_RIGHT_ID } from './settings';
import { QuoteSize, QuoteStyle } from './types';

type QuotationProps = {
    isQuotationMarkType: boolean;
    blockAssets: Record<string, Asset[]>;
    color?: Color;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    quoteStyleLeft?: QuoteStyle;
    quoteStyleRight?: QuoteStyle;
    children: React.ReactElement;
};

export const Quotations: FC<QuotationProps> = ({
    isQuotationMarkType,
    blockAssets,
    color,
    isCustomSize,
    sizeValue,
    sizeChoice,
    quoteStyleLeft,
    quoteStyleRight,
    children,
}) => {
    const defaultProps: QuoteBlockIconProps = {
        color,
        blockAssets,
        isCustomSize,
        sizeValue,
        sizeChoice,
        customIconId: CUSTOM_ICON_LEFT_ID,
        quoteStyle: quoteStyleLeft ?? QuoteStyle.DoubleUp,
    };
    return isQuotationMarkType ? (
        <div className="tw-flex tw-justify-between tw-gap-x-7">
            <QuoteBlockIcon {...defaultProps} />
            {children}
            <QuoteBlockIcon
                {...defaultProps}
                customIconId={CUSTOM_ICON_RIGHT_ID}
                quoteStyle={quoteStyleRight ?? QuoteStyle.DoubleDown}
            />
        </div>
    ) : (
        children
    );
};
