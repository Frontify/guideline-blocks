/* (c) Copyright Frontify Ltd., all rights reserved. */

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
    FullFrame = 'full-frame',
}

export type Settings = {
    recordingMode: RecordingMode;
    size: CameraSize;
};

export type VideoCanvasElement = {
    source: HTMLVideoElement;
    ratio: number;
    shape: VideoShape;
};
