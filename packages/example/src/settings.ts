/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

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
                    icon: IconEnum.Code,
                    label: 'Custom Block',
                },
            ],
        },
    ],
});
