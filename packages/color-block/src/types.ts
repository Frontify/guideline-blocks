/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    name?: string;
    description?: string;
    view_type?: string;
    colorspaces?: string[];
};

export type ColorBlockListViewProps = {
    colors: string[];
    colorspaces: string[];
    isEditing: boolean;
};

export type ColorBlockDropsViewProps = {
    colors: string[];
    colorspaces: string[];
    isEditing: boolean;
};

export type ColorBlockCardsViewProps = {
    colors: string[];
    colorspaces: string[];
    isEditing: boolean;
};
