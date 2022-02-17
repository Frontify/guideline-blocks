/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    columnGutterCustom: string;
    columnGutterSimple: string;
    columnNumber: number;
    isColumnGutterCustom: boolean;
    content?: string[];
};

export const GRID_CLASSES: Record<number, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-2',
    3: 'tw-grid-cols-3',
    4: 'tw-grid-cols-4',
};
