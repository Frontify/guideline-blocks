/* (c) Copyright Frontify Ltd., all rights reserved. */

export const BORDER_COLOR_DEFAULT_VALUE = {
    rgba: { r: 234, g: 235, b: 235, a: 1 },
    hex: '#eaebeb',
};

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
