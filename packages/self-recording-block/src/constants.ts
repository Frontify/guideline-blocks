/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { AudioSpectrum, CameraSize } from './types';

export const COUNTDOWN_IN_SECONDS = 3;

export const CAMERA_CONSTRAINTS = {
    video: {
        width: 1920,
        height: 1080,
        facingMode: 'user',
    },
    audio: true,
};

export const MICROPHONE_CONSTRAINTS = {
    audio: true,
};

export const audioSpectrumSpecs: AudioSpectrum = {
    barWidth: 8,
    barGap: 2,
};

export const cameraSizeToScaleMap: Record<CameraSize, number> = {
    [CameraSize.Small]: 0.5,
    [CameraSize.Medium]: 0.7,
    [CameraSize.Large]: 1,
};

export const radiusClassMap: Record<Radius, string> = {
    [Radius.None]: '',
    [Radius.Small]: 'tw-rounded-sm',
    [Radius.Medium]: 'tw-rounded',
    [Radius.Large]: 'tw-rounded-xl',
};

export const borderStyleMap: Record<BorderStyle, string> = {
    [BorderStyle.Solid]: 'solid',
    [BorderStyle.Dotted]: 'dotted',
    [BorderStyle.Dashed]: 'dashed',
};

export const cameraSizeToMaskSizeMap: Record<CameraSize, { width: number; height: number }> = {
    [CameraSize.Small]: { width: 400, height: 300 },
    [CameraSize.Medium]: { width: 560, height: 420 },
    [CameraSize.Large]: { width: 800, height: 600 },
};

export const AVAILABLE_PLAYBACK_SPEEDS = [1, 1.2, 1.5, 2];
