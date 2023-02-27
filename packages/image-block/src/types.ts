/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';

type Link = { link: { link: string }; openInNewTab: boolean };

export type Settings = {
    hasLink?: boolean;
    linkObject?: Link;
    image?: string;
    name?: string;
    description?: string;
    alignment: Alignment;
    backgroundColor: Color;
    borderColor: Color;
    borderStyle: BorderStyle;
    borderWidth: string;
    downloadable?: boolean;
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
    attachments: { id: number }[];
};

export enum ImageSecurity {
    Global = 'Global',
    Custom = 'Custom',
}

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
    Ratio2To1 = '2:1',
    Ratio1To1 = '1:1',
    Ratio1To2 = '1:2',
}
export const rationValues: Record<Ratio, string> = {
    [Ratio.Ratio2To1]: 'tw-w-full md:tw-w-2/3',
    [Ratio.Ratio1To1]: 'tw-w-full md:tw-w-1/2',
    [Ratio.Ratio1To2]: 'tw-w-full md:tw-w-1/3',
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
    [CaptionPosition.Below]: 'tw-flex-col',
    [CaptionPosition.Above]: 'md:tw-flex-col-reverse tw-flex-col',
    [CaptionPosition.Right]: 'md:tw-flex-row tw-flex-col',
    [CaptionPosition.Left]: 'md:tw-flex-row-reverse tw-flex-col',
};
