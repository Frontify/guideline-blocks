/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';
import { SandpackTemplate } from './types';

const SANDPACK_TEMPLATE_ID = 'sandpackTemplate';

export const settings = defineSettings({
    main: [
        {
            id: SANDPACK_TEMPLATE_ID,
            type: 'dropdown',
            defaultValue: SandpackTemplate.Vanilla,
            size: 'large',
            choices: [
                {
                    value: SandpackTemplate.Angular,
                },
                {
                    value: SandpackTemplate.React,
                },
                {
                    value: SandpackTemplate.Solid,
                },
                {
                    value: SandpackTemplate.Svelte,
                },
                {
                    value: SandpackTemplate.Vanilla,
                },
                {
                    value: SandpackTemplate.Vue,
                },
            ],
        },
    ],
    layout: [],
});
