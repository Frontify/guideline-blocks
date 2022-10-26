/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { DropdownSize, IconEnum } from '@frontify/fondue';
import type { BlockSettings } from '@frontify/guideline-blocks-settings';

export const IMAGE_SETTING_ID = 'image';

export const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: 'Large' as DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: 'Code' as IconEnum.Code,
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
