/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

export type BlockProps = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    style?: StorybookStyle;
    url?: string;
    isCustomHeight?: boolean;
    heightChoice?: StorybookHeight;
    heightValue?: string;
    positioning?: StorybookPosition;
    hasBorder?: boolean;
    borderColor: Color;
    borderStyle: StorybookBorderStyle;
    borderWidth: string;
    hasRadius?: boolean;
    radiusChoice?: StorybookBorderRadius;
    radiusValue?: string;
};

export enum StorybookStyle {
    Default = 'Default',
    WithAddons = 'WithAddons',
}

export enum StorybookBorderRadius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum StorybookBorderStyle {
    Solid = 'Solid',
    Dotted = 'Dotted',
    Dashed = 'Dashed',
}

export enum StorybookHeight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum StorybookPosition {
    Vertical = 'Vertical',
    Horizontal = 'Horizontal',
}

export const borderStyles: Record<StorybookBorderStyle, string> = {
    [StorybookBorderStyle.Solid]: 'solid',
    [StorybookBorderStyle.Dotted]: 'dotted',
    [StorybookBorderStyle.Dashed]: 'dashed',
};

export const heights: Record<StorybookHeight, string> = {
    [StorybookHeight.Small]: '200px',
    [StorybookHeight.Medium]: '400px',
    [StorybookHeight.Large]: '600px',
};

const textPositioningToFlexDirection: Record<TextPositioningType, 'row' | 'row-reverse' | 'column' | 'column-reverse'> =
    {
        [TextPositioningType.Bottom]: 'column',
        [TextPositioningType.Top]: 'column-reverse',
        [TextPositioningType.Right]: 'row',
        [TextPositioningType.Left]: 'row-reverse',
    };
