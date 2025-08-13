/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { Security } from '@frontify/guideline-blocks-settings';

export type Link = { link: { link: string }; openInNewTab: boolean };

export type Settings = {
    hasLink?: boolean;
    linkObject?: Link;
    image?: string;
    name?: string;
    altText?: string;
    description?: string;
    backgroundColor: Color | null;
    borderColor: Color | null;
    borderStyle: BorderStyle;
    borderWidth: string;
    downloadable: boolean;
    assetViewerEnabled?: boolean;
    hasBackground?: boolean;
    hasBorder: boolean;
    hasCustomPadding: boolean;
    paddingChoice: Padding;
    paddingCustom: string;
    hasRadius_cornerRadius: boolean;
    radiusChoice_cornerRadius: CornerRadius;
    radiusValue_cornerRadius: string;
    positioning: CaptionPosition;
    ratio: Ratio;
    security: Security;
    hasCustomRatio: boolean;
    ratioChoice: Ratio;
    ratioCustom: string;
    autosizing: Autosizing;
    alignment: VerticalAlignment;
    horizontalAlignment: HorizontalAlignment;
    useFocalPoint: boolean;
};

export enum CaptionPosition {
    Below = 'Below',
    Above = 'Above',
    Right = 'Right',
    Left = 'Left',
}
export enum ImageAspectRatio {
    RatioNone = 'none',
    Ratio1To1 = '1:1',
    Ratio3To2 = '3:2',
    Ratio4To3 = '4:3',
    Ratio16To9 = '16:9',
}

export enum Ratio {
    Ratio2To1 = '2:1',
    Ratio1To1 = '1:1',
    Ratio1To2 = '1:2',
}
export const imageRatioValues: Record<Ratio, string> = {
    [Ratio.Ratio2To1]: 'tw-w-full @sm:tw-w-[calc(66.6666%-10px)]',
    [Ratio.Ratio1To1]: 'tw-w-full @sm:tw-w-[calc(50%-15px)]',
    [Ratio.Ratio1To2]: 'tw-w-full @sm:tw-w-[calc(41.6666%-17.5px)]',
};

export const textRatioValues: Record<Ratio, string> = {
    [Ratio.Ratio2To1]: 'tw-w-full @sm:tw-w-[calc(33.3333%-20px)]',
    [Ratio.Ratio1To1]: 'tw-w-full @sm:tw-w-[calc(50%-15px)]',
    [Ratio.Ratio1To2]: 'tw-w-full @sm:tw-w-[calc(58.3333%-12.5px)]',
};

export const imageAspectRatioValues: Record<ImageAspectRatio, string> = {
    [ImageAspectRatio.RatioNone]: 'none',
    [ImageAspectRatio.Ratio1To1]: '1:1',
    [ImageAspectRatio.Ratio3To2]: '3:2',
    [ImageAspectRatio.Ratio4To3]: '4:3',
    [ImageAspectRatio.Ratio16To9]: '16:9',
};

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingValues: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '10px',
    [Padding.Medium]: '20px',
    [Padding.Large]: '50px',
};

export enum BorderStyle {
    Dotted = 'Dotted',
    Dashed = 'Dashed',
    Solid = 'Solid',
}

export enum CornerRadius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const radiusValues: Record<CornerRadius, string> = {
    [CornerRadius.None]: '0px',
    [CornerRadius.Small]: '2px',
    [CornerRadius.Medium]: '4px',
    [CornerRadius.Large]: '12px',
};

export const mapCaptionPositionClasses: Record<CaptionPosition, string> = {
    [CaptionPosition.Below]: 'tw-flex-col tw-gap-3',
    [CaptionPosition.Above]: 'tw-flex-col-reverse tw-gap-3',
    [CaptionPosition.Right]: 'tw-flex-col tw-gap-3 @sm:!tw-flex-row @sm:tw-gap-0 @sm:tw-justify-between',
    [CaptionPosition.Left]: 'tw-flex-col tw-gap-3 @sm:!tw-flex-row-reverse @sm:tw-gap-0 @sm:tw-justify-between',
};

export enum Autosizing {
    None = 'none',
    Fit = 'fit',
    Fill = 'fill',
}

export const autosizingValues: Record<Autosizing, string> = {
    [Autosizing.None]: 'none',
    [Autosizing.Fit]: 'fit',
    [Autosizing.Fill]: 'fill',
};

export enum VerticalAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum HorizontalAlignment {
    Top = 'top',
    Center = 'center',
    Bottom = 'bottom',
}

export type ImageInformation = {
    height: number;
    focalPointX: number;
    focalPointY: number;
};
