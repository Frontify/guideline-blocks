/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Settings = {
    columnGutterCustom: string;
    columnGutterSimple: string;
    columnNumber: number;
    isColumnGutterCustom: boolean;
    content?: string;
};

export const GRID_CLASSES: Record<number, string> = {
    1: 'tw-columns-1',
    2: 'tw-columns-2',
    3: 'tw-columns-3',
    4: 'tw-columns-4',
};
