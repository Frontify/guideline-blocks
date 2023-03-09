/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import { AssetChooserObjectType, AssetInputSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

import { TextPosition, AudioSecurity } from './types';

export const AUDIO_ID = 'audio';
export const ATTACHMENTS_SETTING_ID = 'attachments';
const SECURITY_ID = 'security';

export const settings = defineSettings({
    basics: [
        {
            id: AUDIO_ID,
            type: 'assetInput',
            label: 'Audio',
            info: 'Select an audio file to play.',
            size: AssetInputSize.Small,
            extensions: FileExtensionSets.Audio,
            objectTypes: [AssetChooserObjectType.File],
        },
    ],
    layout: [
        {
            id: 'positioning',
            label: 'Positioning',
            type: 'slider',
            defaultValue: TextPosition.Below,
            choices: [
                { value: TextPosition.Below, icon: IconEnum.MediaObjectTextBottom },
                { value: TextPosition.Above, icon: IconEnum.MediaObjectTextTop },
            ],
        },
    ],
    security: [
        {
            id: SECURITY_ID,
            type: 'slider',
            defaultValue: AudioSecurity.Global,
            helperText: 'Change global settings here.',
            choices: [
                {
                    value: AudioSecurity.Global,
                    label: 'Global Settings',
                },
                {
                    value: AudioSecurity.Custom,
                    label: 'Custom',
                },
            ],
        },
        {
            id: 'downloadable',
            type: 'switch',
            defaultValue: false,
            label: 'Downloadable',
            show: (bundle) => bundle.getBlock(SECURITY_ID)?.value === AudioSecurity.Custom,
        },
    ],
});
