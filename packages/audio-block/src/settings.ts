/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';

import { TextPosition } from './types';
import {
    AssetChooserObjectType,
    IconEnum,
    defineSettings,
    getSecurityDownloadableSetting,
    getSecurityGlobalControlSetting,
} from '@frontify/guideline-blocks-settings';

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
        },
    ],
    layout: [
        {
            id: 'positioning',
            label: 'Positioning',
            type: 'segmentedControls',
            defaultValue: TextPosition.Below,
            choices: [
                { value: TextPosition.Below, icon: IconEnum.MediaObjectTextBottom },
                { value: TextPosition.Above, icon: IconEnum.MediaObjectTextTop },
            ],
        },
    ],
    security: [...getSecurityGlobalControlSetting(), getSecurityDownloadableSetting()],
});
