/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, TemplateLegacy } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Padding, Radius, RichTextButtonStyle } from '@frontify/guideline-blocks-settings';

export type Settings = {
    title: string;
    description: string;

    // Basics
    template?: TemplateLegacy;
    templateId?: number;
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasColor_title: boolean;
    colorValue_title: Color;

    hasColor_description: boolean;
    colorValue_description: Color;

    hasColor_pages: boolean;
    colorValue_pages: Color;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

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

export const textPositioningToContentFlexDirection: Record<TextPositioningType, string> = {
    [TextPositioningType.Bottom]: 'tw-flex-col',
    [TextPositioningType.Top]: 'tw-flex-col-reverse',
    [TextPositioningType.Right]: 'tw-flex-col @sm:tw-flex-row',
    [TextPositioningType.Left]: 'tw-flex-col-reverse @sm:tw-flex-row-reverse',
};

export const verticalAlignmentToItemAlign: Record<AnchoringType, string> = {
    [AnchoringType.Start]: 'lg:tw-items-start',
    [AnchoringType.Center]: 'lg:tw-items-center',
    [AnchoringType.End]: 'lg:tw-items-end',
};

export const horizontalAlignmentToTextAlign: Record<AnchoringType, string> = {
    [AnchoringType.Start]: 'lg:tw-text-left',
    [AnchoringType.Center]: 'lg:tw-text-center',
    [AnchoringType.End]: 'lg:tw-text-right',
};

export const horizontalAlignmentToCtaSelfAlign: Record<AnchoringType, string> = {
    [AnchoringType.Start]: 'lg:tw-self-start',
    [AnchoringType.Center]: 'lg:tw-self-center',
    [AnchoringType.End]: 'lg:tw-self-end',
};

export const textRatioToFlexBasis: Record<TextRatioType, string> = {
    [TextRatioType.OneQuarter]: 'lg:tw-basis-1/4',
    [TextRatioType.OneThird]: 'lg:tw-basis-1/3',
    [TextRatioType.OneHalf]: 'lg:tw-basis-1/2',
    [TextRatioType.TwoThirds]: 'lg:tw-basis-2/3',
    [TextRatioType.ThreeQuarters]: 'lg:tw-basis-3/4',
};

export const textRatioToInverseFlexBasis: Record<TextRatioType, string> = {
    [TextRatioType.OneQuarter]: 'lg:tw-basis-3/4',
    [TextRatioType.OneThird]: 'lg:tw-basis-2/3',
    [TextRatioType.OneHalf]: 'lg:tw-basis-1/2',
    [TextRatioType.TwoThirds]: 'lg:tw-basis-1/3',
    [TextRatioType.ThreeQuarters]: 'lg:tw-basis-1/4',
};

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
    [PreviewDisplayType.Fit]: 'tw-object-contain',
    [PreviewDisplayType.Fill]: 'tw-object-cover',
};

export const previewImageAnchoringValues: Record<AnchoringType, string> = {
    [AnchoringType.Start]: 'left',
    [AnchoringType.Center]: 'center',
    [AnchoringType.End]: 'right',
};

export const paddingStyleMap: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '10px',
    [Padding.Medium]: '20px',
    [Padding.Large]: '30px',
};

export enum TemplateEditing {
    Simple = 'simple',
    Advanced = 'advanced',
}
