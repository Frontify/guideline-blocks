/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType, FileExtension } from '@frontify/app-bridge';
import { BaseBlock } from './base';

export enum LegacyAssetInputSource {
    Library = 'Library',
    Upload = 'Upload',
}

export enum LegacyAssetInputMode {
    Both = 'Both',
    UploadOnly = 'UploadOnly',
    BrowseOnly = 'BrowseOnly',
}

export type LegacyAssetInputValue = {
    source: LegacyAssetInputSource;
    value: number;
};

export type LegacyAssetInputBlock = {
    type: 'legacyAssetInput';
    multiSelection?: boolean;
    extensions?: FileExtension[];
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
    mode?: LegacyAssetInputMode;
} & BaseBlock<LegacyAssetInputValue | LegacyAssetInputValue['value']>;
