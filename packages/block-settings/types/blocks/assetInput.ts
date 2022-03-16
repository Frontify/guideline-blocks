/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType, FileExtension } from '@frontify/app-bridge';
import { BaseBlock } from './base';

export enum AssetInputSource {
    Library = 'Library',
    Upload = 'Upload',
}

export enum AssetInputMode {
    Both = 'Both',
    UploadOnly = 'UploadOnly',
    BrowseOnly = 'BrowseOnly',
}

export type AssetInputValue = {
    source: AssetInputSource;
    value: number;
};

export type AssetInputBlock = {
    type: 'assetInput';
    extensions?: FileExtension[];
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
    mode?: AssetInputMode;
} & BaseBlock<AssetInputValue | AssetInputValue['value']>;
