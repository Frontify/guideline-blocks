/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { ReactNode } from 'react';

export enum RecordingMode {
    CameraAndAudio = 'camera-and-audio',
    AudioOnly = 'audio-only',
}

export enum CameraSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum VideoShape {
    Circle = 'circle',
    Square = 'square',
    FullFrame = 'full-frame',
}

export type AudioSpectrum = {
    barWidth: number;
    barGap: number;
};

export enum VideoMode {
    None = 'none',
    Blur = 'blur',
    Custom = 'custom',
}

export type Settings = {
    recordingMode: RecordingMode;
    shape: VideoShape;
    size: CameraSize;
    microphoneDeviceId?: string;
    cameraDeviceId?: string;
    videoMode: VideoMode;
    hasBorder: boolean;
    borderColor: Color;
    borderStyle: BorderStyle;
    borderWidth: string;
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
};

export type RecorderState = 'idle' | 'recording' | 'paused' | 'previewing' | 'uploading' | 'permissions-error';

export type MaskProps = {
    shape: VideoShape;
    children: ReactNode;
    size: CameraSize;
};
