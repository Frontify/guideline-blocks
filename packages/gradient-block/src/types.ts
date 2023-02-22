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

export type GradientColor = {
    hex: string;
    name: string;
    position: number;
};

export enum ColorSquarePositionType {
    Left = 'left',
    Right = 'right',
}

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    isOrientationCustom: boolean;
    orientationCustom: number;
    orientationSimple: GradientOrientation;
    displayCss?: boolean;
    content?: string;
    gradientColors?: GradientColor[];
    contentValue?: string;
    gradientOrientation: number;
};

export const gradientHeightValues: Record<GradientHeight, string> = {
    [GradientHeight.Small]: '48px',
    [GradientHeight.Medium]: '72px',
    [GradientHeight.Large]: '96px',
};

export const gradientOrientationValues: Record<GradientOrientation, number> = {
    [GradientOrientation.Vertical]: 0,
    [GradientOrientation.Horizontal]: 90,
};

export type CssValueDisplayProps = {
    cssValue?: string;
    isCopied: boolean;
    handleCopy: () => void;
};

export type SquareBadgeProps = {
    color: GradientColor;
    colorSquarePosition?: ColorSquarePositionType;
    handleCopy: () => void;
};
