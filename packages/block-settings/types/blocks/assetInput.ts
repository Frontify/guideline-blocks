/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType, FileExtension } from '@frontify/app-bridge';
import { AssetInputSize } from '@frontify/fondue';
import { BaseBlock } from './base';

export enum AssetInputSource {
    Library = 'Library',
    Upload = 'Upload',
}

export enum AssetInputMode {
    BrowseAndUpload = 'BrowseAndUpload',
    UploadOnly = 'UploadOnly',
    BrowseOnly = 'BrowseOnly',
}

export type AssetInputValue = {
    source: AssetInputSource;
    value: number;
};

export type AssetInputBlock = {
    type: 'assetInput';
    multiSelection?: boolean;
    extensions?: (FileExtension | string)[];
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
    mode?: AssetInputMode;
    size?: AssetInputSize;
    hideExtension?: boolean;
    hideSize?: boolean;
} & BaseBlock<AssetInputValue | AssetInputValue['value']>;
