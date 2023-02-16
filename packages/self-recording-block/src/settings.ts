/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import { CameraSize, MaskShape, RecordingMode, VideoMode } from './types';

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
            show: (bundle) => bundle.getBlock('recordingMode')?.value === RecordingMode.CameraAndAudio,
            choices: async () => {
                const devices = await navigator.mediaDevices.enumerateDevices();

                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                return videoDevices.map((device) => ({
                    value: device.deviceId,
                    label: device.label,
                }));
            },
        },
        {
            id: 'cameraAsset',
            label: 'Camera',
            type: 'assetInput',
            show: (bundle) => bundle.getBlock('recordingMode')?.value === RecordingMode.AudioOnly,
        },
    ],
    layout: [
        {
            id: 'shape',
            type: 'slider',
            label: 'Shape',
            defaultValue: MaskShape.Circle,
            choices: [
                {
                    value: MaskShape.Circle,
                    icon: IconEnum.Circle16,
                },
                {
                    value: MaskShape.Square,
                    icon: IconEnum.Icon16,
                },
                {
                    value: MaskShape.FullFrame,
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
            label: '',
            blocks: [
                //TODO: Update type in the shared package

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                getBorderSettings(),

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                {
                    ...getBorderRadiusSettings(),
                    show: (bundle) => bundle.getBlock('shape')?.value !== MaskShape.Circle,
                },
            ],
        },
        {
            id: 'record',
            type: 'sectionHeading',
            label: 'Recording background',
            show: (bundle) => bundle.getBlock('recordingMode')?.value === RecordingMode.CameraAndAudio,
            blocks: [
                {
                    id: 'videoMode',
                    type: 'slider',
                    label: 'Type',
                    defaultValue: VideoMode.None,
                    choices: [
                        { label: 'None', value: VideoMode.None },
                        { label: 'Blur', value: VideoMode.Blur },
                        { label: 'Asset', value: VideoMode.Asset },
                    ],
                },
                {
                    id: 'customBackgroundAsset',
                    label: 'Custom background asset',
                    type: 'assetInput',
                    show: (bundle) => bundle.getBlock('videoMode')?.value === VideoMode.Asset,
                },
            ],
        },
    ],
});
