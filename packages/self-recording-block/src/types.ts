/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum RecordingMode {
    CameraOnly = 'camera-only',
    ScreenAndCamera = 'screen-and-camera',
}

export type Settings = {
    recordingMode: RecordingMode;
};
