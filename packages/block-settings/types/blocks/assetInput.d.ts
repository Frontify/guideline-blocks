/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtension, AssetChooserProjectType, AssetChooserObjectType } from '@frontify/app-bridge';
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
    value?: AssetInputValue | AssetInputValue['value'];
    defaultValue?: AssetInputValue | AssetInputValue['value'];
    multiSelection?: boolean;
    extensions?: FileExtension[];
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
    mode?: AssetInputMode;
} & BaseBlock;
