/* (c) Copyright Frontify Ltd., all rights reserved. */

export const BORDER_COLOR_DEFAULT_VALUE = {
    rgba: { r: 234, g: 235, b: 235, a: 1 },
    hex: '#eaebeb',
};

export const BORDER_WIDTH_DEFAULT_VALUE = '1px';

export const PADDING_DEFAULT_PLACEHOLDER = '24px';

export enum BorderStyle {
    Solid = 'Solid',
    Dashed = 'Dashed',
    Dotted = 'Dotted',
}

export enum Radius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum PaddingBasic {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingBasicStyleMap: Record<PaddingBasic, string> = {
    [PaddingBasic.None]: '0px',
    [PaddingBasic.Small]: '24px',
    [PaddingBasic.Medium]: '36px',
    [PaddingBasic.Large]: '60px',
};
