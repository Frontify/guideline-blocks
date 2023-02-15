/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
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
                    icon: IconEnum.Code,
                    label: 'Custom Block',
                },
            ],
        },
    ],
});
