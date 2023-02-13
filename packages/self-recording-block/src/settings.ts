/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { RecordingMode } from './types';

export const settings = defineSettings({
    main: [
        {
            id: 'recordingMode',
            type: 'dropdown',
            defaultValue: RecordingMode.ScreenAndCamera,
            size: DropdownSize.Large,
            choices: [
                {
                    value: RecordingMode.ScreenAndCamera,
                    icon: IconEnum.PlayCircle16,
                    label: 'Screen and camera',
                },
                {
                    value: RecordingMode.CameraOnly,
                    icon: IconEnum.PlayCircle16,
                    label: 'Camera only',
                },
            ],
        },
    ],
});
