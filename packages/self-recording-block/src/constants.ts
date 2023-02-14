/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { CameraSize } from './types';

export const CAMERA_CONSTRAINTS = {
    video: {
        width: 1920,
        height: 1080,
        facingMode: 'user',
    },
    audio: true,
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
