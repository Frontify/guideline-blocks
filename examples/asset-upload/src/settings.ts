/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';

export const IMAGE_SETTING_ID = 'image';

export const settings = defineSettings({
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: 'Code',
                    label: 'Custom Block',
                },
            ],
        },
        {
            id: IMAGE_SETTING_ID,
            type: 'assetInput',
        },
    ],
});
