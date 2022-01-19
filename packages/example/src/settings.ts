/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: 'Large',
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.Snippet,
                    label: 'Custom Block',
                },
            ],
        },
    ],
};

// eslint-disable-next-line import/no-default-export
export default settings;
