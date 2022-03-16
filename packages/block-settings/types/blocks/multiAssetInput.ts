/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';
import { BaseBlock } from './base';

export type MultiAssetInputBlock = {
    type: 'multiAssetInput';
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
} & BaseBlock<number[]>;
