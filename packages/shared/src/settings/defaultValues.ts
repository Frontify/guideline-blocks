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

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingValues: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '24px',
    [Padding.Medium]: '36px',
    [Padding.Large]: '48px',
};
