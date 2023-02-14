/* (c) Copyright Frontify Ltd., all rights reserved. */

import { drawVideoFrameScaled } from './drawVideoFrameScaled';

export const bindVideoToCanvas = (videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement, scale: number) => {
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get the canvas context.');
    }

    const parentContainerWidth = (canvasElement.parentElement as HTMLDivElement).clientWidth * scale;
    const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    canvasElement.width = parentContainerWidth;
    canvasElement.style.width = `${parentContainerWidth}px`;
    canvasElement.height = parentContainerWidth / videoAspectRatio;
    canvasElement.style.height = `${parentContainerWidth / videoAspectRatio}px`;

    const step = () => {
        drawVideoFrameScaled(videoElement, ctx);

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};
