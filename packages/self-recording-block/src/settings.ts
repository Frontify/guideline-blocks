/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import { LOCAL_STORAGE_PREFFERED_CAMERA_KEY, LOCAL_STORAGE_PREFFERED_MICROPHONE_KEY } from './constants';
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
    basics: [
        {
            id: 'microphoneDeviceId',
            label: 'Microphone',
            type: 'dropdown',
            choices: async () => {
                const devices = await navigator.mediaDevices.enumerateDevices();

                const microphoneDevices = devices.filter((device) => device.kind === 'audioinput');
                return microphoneDevices.map((device) => ({
                    value: device.deviceId,
                    label: device.label,
                }));
            },
        },
        {
            id: 'cameraDeviceId',
            label: 'Camera',
            type: 'dropdown',
            choices: async () => {
                const devices = await navigator.mediaDevices.enumerateDevices();

                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                return videoDevices.map((device) => ({
                    value: device.deviceId,
                    label: device.label,
                }));
            },
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
        {
            id: 'borderHeading',
            type: 'sectionHeading',
            blocks: [getBorderSettings()],
        },
        {
            id: 'borderRadiusHeading',
            type: 'sectionHeading',
            blocks: [getBorderRadiusSettings()],
            show: (bundle) => bundle.getBlock('shape')?.value !== VideoShape.Circle,
        },
    ],
});
