/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetInputSize,
    FileExtension,
    IconEnum,
    defineSettings,
} from '@frontify/guideline-blocks-settings';

import { TextPosition } from './types';

export const AUDIO_ID = 'audio';
export const AUDIO_EXTENSIONS = [FileExtension.Flac, FileExtension.Mp3, FileExtension.Ogg, FileExtension.Wav];
export const ATTACHMENTS_SETTING_ID = 'attachments';

export const settings = defineSettings({
    basics: [
        {
            id: AUDIO_ID,
            type: 'assetInput',
            label: 'Audio',
            info: 'Select an audio file to play.',
            size: AssetInputSize.Small,
            extensions: AUDIO_EXTENSIONS,
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
});
