/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetInputSize, defineSettings } from '@frontify/guideline-blocks-settings';

export const PLACEHOLDER = 'Your text here';
const IMAGE_ASSET_ID = 'image';

export const settings = defineSettings({
    basics: [
        {
            id: IMAGE_ASSET_ID,
            type: 'assetInput',
            size: AssetInputSize.Small,
            objectTypes: [AssetChooserObjectType.ImageVideo],
        },
    ],
});
