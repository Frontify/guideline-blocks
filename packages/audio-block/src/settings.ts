/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import { AssetChooserObjectType, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

import { TextPosition } from './types';
import { getSecuritySettings } from '@frontify/guideline-blocks-shared/src/settings/security';

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
    security: getSecuritySettings(),
});
