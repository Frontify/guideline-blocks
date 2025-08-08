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
    alignment: Alignment;
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
    security: Security;
    hasCustomRatio: boolean;
    ratioChoice: Ratio;
    ratioCustom: string;
};

export enum Alignment {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export enum CaptionPosition {
    Below = 'Below',
    Above = 'Above',
    Right = 'Right',
    Left = 'Left',
}
export enum Ratio {
    RatioNone = 'none',
    Ratio1To1 = '1:1',
    Ratio3To2 = '3:2',
    Ratio4To3 = '4:3',
    Ratio16To9 = '16:9',
}

export const imageAspectRatioValues: Record<Ratio, string> = {
    [Ratio.RatioNone]: 'none',
    [Ratio.Ratio1To1]: '1:1',
    [Ratio.Ratio3To2]: '3:2',
    [Ratio.Ratio4To3]: '4:3',
    [Ratio.Ratio16To9]: '16:9',
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

export const mapAlignmentClasses: Record<Alignment, string> = {
    [Alignment.Left]: 'tw-justify-start',
    [Alignment.Center]: 'tw-justify-center',
    [Alignment.Right]: 'tw-justify-end',
};

export const mapCaptionPositionClasses: Record<CaptionPosition, string> = {
    [CaptionPosition.Below]: 'tw-flex-col tw-gap-3',
    [CaptionPosition.Above]: 'tw-flex-col-reverse tw-gap-3',
    [CaptionPosition.Right]: 'tw-flex-col tw-gap-3 @sm:!tw-flex-row @sm:tw-gap-0 @sm:tw-justify-between',
    [CaptionPosition.Left]: 'tw-flex-col tw-gap-3 @sm:!tw-flex-row-reverse @sm:tw-gap-0 @sm:tw-justify-between',
};
