/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { DropdownSize, IconEnum } from '@frontify/fondue';
import { defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
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
    ],
});
