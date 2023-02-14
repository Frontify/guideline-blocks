/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CameraSize } from './types';

export const CAMERA_CONSTRAINTS = {
    video: {
        width: 1920,
        height: 1080,
        facingMode: 'user',
    },
    audio: false,
};

export const cameraSizeToRatioMap: Record<CameraSize, number> = {
    [CameraSize.Small]: 0.5,
    [CameraSize.Medium]: 0.7,
    [CameraSize.Large]: 1,
};
