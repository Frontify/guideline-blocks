/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum GradientHeight {
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export enum GradientOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    isOrientationCustom?: boolean;
    orientationCustom?: string;
    orientationSimple?: GradientOrientation;
    displayCss?: boolean;
    content?: string;
};

export const gradientHeightValues: Record<GradientHeight, string> = {
    [GradientHeight.Small]: '48px',
    [GradientHeight.Medium]: '72px',
    [GradientHeight.Large]: '96px',
};

export const gradientOrientationValues: Record<GradientOrientation, number> = {
    [GradientOrientation.Vertical]: 90,
    [GradientOrientation.Horizontal]: 0,
};
