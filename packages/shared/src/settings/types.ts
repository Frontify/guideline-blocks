import { Color } from '@frontify/arcade';

export enum BorderStyle {
    Solid = 'Solid',
    Dashed = 'Dashed',
    Dotted = 'Dotted',
}

export const borderStyleMap: Record<BorderStyle, string> = {
    [BorderStyle.Solid]: 'solid',
    [BorderStyle.Dotted]: 'dotted',
    [BorderStyle.Dashed]: 'dashed',
};

export enum Radius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const radiusStyleMap: Record<Radius, string> = {
    [Radius.None]: '0px',
    [Radius.Small]: '2px',
    [Radius.Medium]: '4px',
    [Radius.Large]: '12px',
};

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingStyleMap: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '24px',
    [Padding.Medium]: '36px',
    [Padding.Large]: '60px',
};

export type PaddingSettings = {
    paddingChoice: Padding;
    hasCustomPaddingValue: boolean;
    paddingValue: string;
};

export type PaddingExtendedSettings = {
    hasCustomPadding: boolean;
    paddingChoice: Padding;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

export type RadiusExtendedSettings = {
    hasCustomRadius: boolean;
    radiusChoice: Radius;
    radiusTopLeft: string;
    radiusTopRight: string;
    radiusBottomLeft: string;
    radiusBottomRight: string;
};

export type BorderSettings = {
    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderWidth: string;
    borderColor: Color;
};

export type RadiusSettings = {
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
};
