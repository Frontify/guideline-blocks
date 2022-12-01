/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ColorPalette } from '@frontify/app-bridge';

export type Settings = {
    colorPaletteIds: number[];
};

export type TooltipContentProps = {
    colorName: string;
    colorValue: string;
    status: 'error' | 'success' | 'idle';
};

export type PaletteProps = {
    palette: ColorPalette;
    isEditing: boolean;
};
