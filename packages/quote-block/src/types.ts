/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { CSSProperties } from 'react';

export type Props = {
    appBridge: AppBridgeNative;
};

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
    isCustomLineWidth?: boolean;
    lineWidthValue?: string;
    lineWidthChoice?: LineWidth;
    accentLinecolor?: Color;
    quotesColor?: Color;
    content?: string;
};

export type ContentWithAuthorProps = {
    showAuthor: boolean;
    authorName: string;
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
}

export enum LineType {
    Solid = 'solid',
    Dashed = 'dashed',
    Dotted = 'dotted',
}

export enum LineWidth {
    SmallWidth = 'SmallWidth',
    MediumWidth = 'MediumWidth',
    LargeWidth = 'LargeWidth',
}

export const quoteSizeMap: Record<QuoteSize, string> = {
    [QuoteSize.SmallSize]: '16px',
    [QuoteSize.MediumSize]: '24px',
    [QuoteSize.LargeSize]: '32px',
};

export const lineWidthMap: Record<LineWidth, string> = {
    [LineWidth.SmallWidth]: '2px',
    [LineWidth.MediumWidth]: '4px',
    [LineWidth.LargeWidth]: '8px',
};
