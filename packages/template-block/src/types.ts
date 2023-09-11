/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, TemplateLegacy } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Padding, Radius } from '@frontify/guideline-blocks-settings';

export type Settings = {
    title: string;
    description: string;

    // basics

    template?: TemplateLegacy;
    templateId?: number;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;

    // layout

    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // style

    hasBackground: boolean;
    backgroundColor: Color;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
};

export enum PreviewType {
    None = 'none',
    Template = 'template',
    Custom = 'custom',
}

export enum TextPositioningType {
    Bottom = 'bottom',
    Top = 'top',
    Right = 'right',
    Left = 'left',
}

export const textPositioningToFlexDirection: Record<
    TextPositioningType,
    'row' | 'row-reverse' | 'column' | 'column-reverse'
> = {
    [TextPositioningType.Bottom]: 'column',
    [TextPositioningType.Top]: 'column-reverse',
    [TextPositioningType.Right]: 'row',
    [TextPositioningType.Left]: 'row-reverse',
};

export enum AnchoringType {
    Start = 'start',
    Center = 'center',
    End = 'end',
}

export enum TextRatioType {
    OneQuarter = '25',
    OneThird = '33.3333',
    OneHalf = '50',
    TwoThirds = '66.6666',
    ThreeQuarters = '75',
}

export enum PreviewHeightType {
    Auto = 'auto',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export const previewHeightValues: Record<PreviewHeightType, string> = {
    [PreviewHeightType.Auto]: 'auto',
    [PreviewHeightType.Small]: '240px',
    [PreviewHeightType.Medium]: '480px',
    [PreviewHeightType.Large]: '640px',
};

export enum PreviewDisplayType {
    Fit = 'fit',
    Fill = 'fill',
}

export const previewDisplayValues: Record<PreviewDisplayType, string> = {
    [PreviewDisplayType.Fit]: 'contain',
    [PreviewDisplayType.Fill]: 'cover',
};

export const previewImageAnchoringValues: Record<AnchoringType, string> = {
    [AnchoringType.Start]: 'left',
    [AnchoringType.Center]: 'center',
    [AnchoringType.End]: 'right',
};
