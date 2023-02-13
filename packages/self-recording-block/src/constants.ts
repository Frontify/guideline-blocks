/* (c) Copyright Frontify Ltd., all rights reserved. */

export const CAMERA_CONSTRAINTS = {
    video: {
        width: 1920,
        height: 1080,
        facingMode: 'user',
    },
    audio: false,
};

// TS doesn't have the correct type yet for this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SCREEN_CONSTRAINTS: any = {
    video: {
        width: 1920,
        height: 1080,
        displaySurface: 'window',
    },
    audio: false,
};
