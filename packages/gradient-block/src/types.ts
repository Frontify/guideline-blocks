/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, Palette } from '@frontify/fondue';

export enum GradientHeight {
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export enum GradientOrientation {
    Vertical = '0',
    Horizontal = '90',
}

export type GradientColor = {
    color: Color;
    position: number;
    level?: number;
    isReverse?: boolean;
};

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    isOrientationCustom: boolean;
    orientationCustom: number;
    orientationSimple: GradientOrientation;
    displayCss?: boolean;
    gradientColors?: GradientColor[];
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
    cssValue: string;
};

export type SquareBadgesRowProps = {
    blockWidth: number;
    gradientColors: GradientColor[];
    gradientOrientation: number;
};

export type SquareBadgeProps = {
    gradientColor: GradientColor;
    gradientOrientation: number;
    index: number;
    blockWidth: number;
};

export type ColorFlyoutProps = {
    colorPalettes: Palette[];
    gradientColors: GradientColor[];
    currentlyEditingPosition: number;
    showColorModal: boolean;
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
};

export type AddColorButtonProps = {
    positionLeft: number;
    blockWidth: number;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
};

export type EditAndDeleteColorBoxProps = {
    color: GradientColor;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
    isAlmostOverflowing: boolean;
};

export type ColorTooltipProps = {
    gradientColor: GradientColor;
    gradientColors: GradientColor[];
    showColorModal: boolean;
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
};
