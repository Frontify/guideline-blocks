/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetInputSize, defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    basics: [
        {
            id: 'image',
            type: 'assetInput',
            size: AssetInputSize.Small,
            objectTypes: [AssetChooserObjectType.ImageVideo],
        },
        {
            id: 'hasLink',
            type: 'switch',
            label: 'Link',
            defaultValue: false,
            on: [
                {
                    id: 'linkUrl',
                    type: 'linkChooser',
                    placeholder: 'Paste link, or type to search',
                },
            ],
            off: [],
        },
    ],
});
