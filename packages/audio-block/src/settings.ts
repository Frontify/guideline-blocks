/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import {
    AssetChooserObjectType,
    defineSettings,
    getSecurityDownloadableSetting,
    getSecurityGlobalControlSetting,
} from '@frontify/guideline-blocks-settings';

import { TextPosition } from './types';

export const AUDIO_ID = 'audio';
export const ATTACHMENTS_ASSET_ID = 'attachments';

export const settings = defineSettings({
    basics: [
        {
            id: AUDIO_ID,
            type: 'assetInput',
            label: 'Audio',
            info: 'Select an audio file to play.',
            size: 'small',
            extensions: FileExtensionSets.Audio,
            objectTypes: [AssetChooserObjectType.File],
            showForTranslations: true,
        },
    ],
    layout: [
        {
            id: 'positioning',
            label: 'Positioning',
            type: 'segmentedControls',
            defaultValue: TextPosition.Above,
            choices: [
                { value: TextPosition.Below, icon: 'MediaObjectTextBottom' },
                { value: TextPosition.Above, icon: 'MediaObjectTextTop' },
            ],
        },
    ],
    security: [...getSecurityGlobalControlSetting(), getSecurityDownloadableSetting()],
});
