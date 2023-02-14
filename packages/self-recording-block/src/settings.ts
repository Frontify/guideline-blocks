/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import { CameraSize, RecordingMode, VideoShape } from './types';

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
    ],
    layout: [
        {
            id: 'shape',
            type: 'slider',
            label: 'Shape',
            defaultValue: VideoShape.Circle,
            choices: [
                {
                    value: VideoShape.Circle,
                    icon: IconEnum.Circle16,
                },
                {
                    value: VideoShape.Square,
                    icon: IconEnum.Icon16,
                },
                {
                    value: VideoShape.FullFrame,
                    icon: IconEnum.RectangleLandscape16,
                },
            ],
        },
        {
            id: 'size',
            type: 'slider',
            label: 'Size',
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
    style: [
        { id: 'style-sectionHeading-1', type: 'sectionHeading', label: '', blocks: [getBorderSettings()] },
        {
            id: 'style-sectionHeading-2',
            type: 'sectionHeading',
            label: '',
            blocks: [getBorderRadiusSettings()],
            show: (bundle) => bundle.getBlock('shape')?.value !== VideoShape.Circle,
        },
    ],
});
