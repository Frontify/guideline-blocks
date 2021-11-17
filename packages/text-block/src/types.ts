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
