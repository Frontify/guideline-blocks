/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { Color, merge } from '@frontify/fondue';
import { FC } from 'react';
import { QuoteBlockIcon, QuoteBlockIconProps } from './QuoteBlockIcon';
import { CUSTOM_ICON_LEFT_ID, CUSTOM_ICON_RIGHT_ID } from './settings';
import { QuoteSize, QuoteStyle } from './types';
import { flexBoxAlignmentClassNames } from './utilities';

type QuotationProps = {
    textAlignment?: string;
    isFullWidth?: boolean;
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
    textAlignment,
    isFullWidth,
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

    const getWrapperClasses = () => {
        if (isQuotationMarkType && isFullWidth) {
            return 'tw-flex tw-justify-between tw-gap-x-7';
        }
        if (isQuotationMarkType && !isFullWidth) {
            return merge(['tw-flex tw-gap-x-7', flexBoxAlignmentClassNames[textAlignment ?? 'left']]);
        }
        return '';
    };

    return isQuotationMarkType ? (
        <div className={getWrapperClasses()}>
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
