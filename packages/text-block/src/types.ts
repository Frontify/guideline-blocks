/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GutterSpacing } from '@frontify/guideline-blocks-shared';

export type Settings = {
    columnGutterCustom: string;
    columnGutterSimple: GutterSpacing;
    columnNumber: number;
    isColumnGutterCustom: boolean;
    content?: string;
};

export const spacingValues: Record<GutterSpacing, string> = {
    [GutterSpacing.Auto]: 'normal',
    [GutterSpacing.Small]: '10px',
    [GutterSpacing.Medium]: '30px',
    [GutterSpacing.Large]: '50px',
};
