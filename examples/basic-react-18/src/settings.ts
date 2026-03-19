/* (c) Copyright Frontify Ltd., all rights reserved. */

export const IMAGE_SETTING_ID = 'image';

export const settings = {
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
};
