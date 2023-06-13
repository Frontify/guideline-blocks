/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock, createFooter } from '@frontify/guideline-blocks-settings';
import { Security } from './types';

/**
 * Returns segment controls for global security settings.
 *
 * @param {string} id custom id for the setting block
 *
 * @returns {SettingBlock} Returns
 */

export const getSecurityGlobalControlSetting = (id?: string): SettingBlock[] => {
    const securityId = getSecurityGlobalControlId(id);
    return [
        {
            id: securityId,
            type: 'segmentedControls',
            defaultValue: Security.Global,
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
            id: 'globalSettingsInfo',
            type: 'notification',
            footer: createFooter({
                label: 'Change global settings [here].',
                replace: { here: { event: 'general-settings.open' } },
            }),
        },
    ];
};

/**
 * Returns the downloadable security settings.
 *
 * @param {string} id custom id for the setting block
 * @param {string} globalControlId custom id for the global control setting block
 *
 * @returns {SettingBlock} Returns downloadable security settings.
 */

type SecurityDownloadableSettingType = {
    id?: string;
    globalControlId?: string;
};

export const getSecurityDownloadableSetting = (options?: SecurityDownloadableSettingType): SettingBlock => {
    const securityId = getSecurityGlobalControlId(options?.globalControlId);
    return {
        id: options?.id ? options.id : 'downloadable',
        type: 'switch',
        defaultValue: false,
        label: 'Downloadable',
        show: (bundle) => bundle.getBlock(securityId)?.value === Security.Custom,
    };
};

const getSecurityGlobalControlId = (id?: string): string => {
    return id ? id : 'security';
};
