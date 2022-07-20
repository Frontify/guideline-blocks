/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

export const IMAGE_SETTING_ID = 'image';

export const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.Snippet,
                    label: 'Custom Block',
                },
            ],
        },
        {
            id: IMAGE_SETTING_ID,
            type: 'assetInput',
        },
    ],
};
