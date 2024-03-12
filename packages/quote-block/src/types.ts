/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { CSSProperties } from 'react';

export type Settings = {
    type?: QuoteType;
    quoteStyleLeft?: QuoteStyle;
    quoteStyleRight?: QuoteStyle;
    showAuthor: boolean;
    authorName: string;
    isCustomSize?: boolean;
    sizeValue?: string;
    sizeChoice?: QuoteSize;
    showAccentLine?: boolean;
    lineType?: LineType;
    lineWidthValue?: string;
    isCustomLineColor?: boolean;
    accentLineColor?: Color;
    isCustomQuotesColor?: boolean;
    quotesColor?: Color;
    content?: string;
    textAlignment?: string;
    quotationMarksAnchoring?: string;
    isCustomQuoteStyleLeft?: boolean;
    isCustomQuoteStyleRight?: boolean;
};

export type IconProps = {
    style: CSSProperties;
};

export enum QuoteType {
    QuotationMarks = 'QuotationMarks',
    Indentation = 'Indentation',
}

export enum QuoteSize {
    SmallSize = 'SmallSize',
    MediumSize = 'MediumSize',
    LargeSize = 'LargeSize',
}

export enum QuoteStyle {
    DoubleUp = 'DoubleUp',
    DoubleDown = 'DoubleDown',
    SingleUp = 'SingleUp',
    SingleDown = 'SingleDown',
    DoubleChevronLeft = 'DoubleChevronLeft',
    DoubleChevronRight = 'DoubleChevronRight',
    SingleChevronLeft = 'SingleChevronLeft',
    SingleChevronRight = 'SingleChevronRight',
    HookBracketLeft = 'HookBracketLeft',
    HookBracketRight = 'HookBracketRight',
    None = 'None',
    Custom = 'Custom',
}

export enum LineType {
    Solid = 'solid',
    Dashed = 'dashed',
    Dotted = 'dotted',
}

export const quoteSizeMap: Record<QuoteSize, string> = {
    [QuoteSize.SmallSize]: '16px',
    [QuoteSize.MediumSize]: '24px',
    [QuoteSize.LargeSize]: '32px',
};

export enum TextAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum QuotationMarksAnchoring {
    FullWidth = 'fullWidth',
    HugText = 'hugText',
}

export type CustomIconProps = {
    style: CSSProperties;
    customIconId: string;
    appBridge: AppBridgeBlock;
};
