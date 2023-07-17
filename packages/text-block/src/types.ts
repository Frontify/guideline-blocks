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
    [GutterSpacing.S]: '10px',
    [GutterSpacing.M]: '30px',
    [GutterSpacing.L]: '50px',
};
