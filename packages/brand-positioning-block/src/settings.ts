/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [],
    basics: [
        {
            id: 'test',
            type: 'input',
            label: 'Test',
            placeholder: 'Test input',
            info: 'Change this later',
        },
    ],
    layout: [],
    style: [],
});
