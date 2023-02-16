/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    positioning: TextPosition;
    audio: Asset[] | undefined;
    description?: string;
    title?: string;
};

export type ItemToolbarProps = {
    onRemoveAsset: () => void;
    onUploadClick: (() => void) | undefined;
    onAssetChooseClick: (() => void) | undefined;
};
