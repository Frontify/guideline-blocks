/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    name?: string;
    description?: string;
    view_type?: string;
    color_spaces?: string[];
};

export type ColorBlockListViewProps = {
    colors: string[];
    colorSpaces: string[];
    isEditing: boolean;
};

export type ColorBlockDropsViewProps = {
    colors: string[];
    colorSpaces: string[];
    isEditing: boolean;
};

export type ColorBlockCardsViewProps = {
    colors: string[];
    colorSpaces: string[];
    isEditing: boolean;
};
