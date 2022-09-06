/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { CSSProperties } from 'react';

export type Props = {
    appBridge: AppBridgeBlock;
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
    lineWidthValue?: string;
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

export const quoteSizeMap: Record<QuoteSize, string> = {
    [QuoteSize.SmallSize]: '16px',
    [QuoteSize.MediumSize]: '24px',
    [QuoteSize.LargeSize]: '32px',
};
