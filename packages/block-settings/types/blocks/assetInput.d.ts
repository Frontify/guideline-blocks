/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtension } from '@frontify/app-bridge';
import { AssetInputProps } from '@frontify/arcade';
import { BaseBlock } from './base';

export type AssetInputBlock = {
    type: 'assetInput';
    asset?: AssetInputProps['asset'];
    value?: number;
    allowedExtensions: FileExtension[];
} & BaseBlock;
