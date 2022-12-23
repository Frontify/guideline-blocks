/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Settings = {
    columnGutterCustom: string;
    columnGutterSimple: TextGutter;
    columnNumber: number;
    isColumnGutterCustom: boolean;
    content?: string;
};

export enum TextGutter {
    Auto = 'Auto',
    S = 'S',
    M = 'M',
    L = 'L',
}

export const spacingValues: Record<TextGutter, string> = {
    [TextGutter.Auto]: 'normal',
    [TextGutter.S]: '10px',
    [TextGutter.M]: '30px',
    [TextGutter.L]: '50px',
};

export const GRID_CLASSES: Record<number, string> = {
    1: 'tw-columns-1',
    2: 'lg:tw-columns-2',
    3: 'lg:tw-columns-3',
    4: 'lg:tw-columns-4',
};
