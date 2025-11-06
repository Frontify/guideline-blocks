/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Palette = {
    id: number | string;
    title: string;
    colors: RgbaColorWithName[];
};

type RgbaColor = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

export type RgbaColorWithName = RgbaColor & {
    name?: string;
};

export type PickerType = 'brand' | 'custom';
export type ShowPickerUnion = 'both' | PickerType;
