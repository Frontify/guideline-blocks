/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetInputSize,
    AssetChooserObjectType,
    DropdownSize,
    FileExtension,
    IconEnum,
    defineSettings,
} from '@frontify/guideline-blocks-settings';

import { TextPosition } from './types';

export const settings = defineSettings({
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.Code,
                    label: 'Custom Block',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'audio',
            type: 'assetInput',
            label: 'Audio',
            info: 'Select an audio file to play.',
            size: AssetInputSize.Small,
            extensions: [FileExtension.Mp3, FileExtension.Wav],
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
