/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { CameraSize, RecordingMode } from './types';

export const settings = defineSettings({
    main: [
        {
            id: 'recordingMode',
            type: 'dropdown',
            defaultValue: RecordingMode.CameraAndAudio,
            size: DropdownSize.Large,
            choices: [
                {
                    value: RecordingMode.CameraAndAudio,
                    icon: IconEnum.PlayCircle16,
                    label: 'Camera and Audio',
                },
                {
                    value: RecordingMode.AudioOnly,
                    icon: IconEnum.PlayCircle16,
                    label: 'Audio only',
                },
            ],
        },
        {
            id: 'size',
            type: 'slider',
            defaultValue: CameraSize.Small,
            choices: [
                {
                    value: CameraSize.Small,
                    label: 'S',
                },
                {
                    value: CameraSize.Medium,
                    label: 'M',
                },
                {
                    value: CameraSize.Large,
                    label: 'L',
                },
            ],
        },
    ],
});
