/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum GradientHeight {
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export enum Orientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    displayCss?: boolean;
    content?: string;
};

export const gradientHeightValues: Record<GradientHeight, string> = {
    [GradientHeight.Small]: '48px',
    [GradientHeight.Medium]: '72px',
    [GradientHeight.Large]: '96px',
};
