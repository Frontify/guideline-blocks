/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from '@frontify/guideline-blocks-settings';

export const getSecuritySettings = (): SettingBlock[] => {
    return [
        {
            id: 'security',
            type: 'segmentedControls',
            defaultValue: Security.Global,
            helperText: 'Change global settings here.',
            choices: [
                {
                    value: Security.Global,
                    label: 'Global Settings',
                },
                {
                    value: Security.Custom,
                    label: 'Custom',
                },
            ],
        },
        {
            id: 'downloadable',
            type: 'switch',
            defaultValue: false,
            label: 'Downloadable',
            show: (bundle) => bundle.getBlock('security')?.value === Security.Custom,
        },
    ];
};

export enum Security {
    Global = 'Global',
    Custom = 'Custom',
}
