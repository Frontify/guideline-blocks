/* (c) Copyright Frontify Ltd., all rights reserved. */

export const drawVideoFrameScaled = (video: HTMLVideoElement, ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / video.videoWidth;
    const vRatio = canvas.height / video.videoHeight;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - video.videoWidth * ratio) / 2;
    const centerShiftY = (canvas.height - video.videoHeight * ratio) / 2;
    ctx.drawImage(
        video,
        0,
        0,
        video.videoWidth,
        video.videoHeight,
        centerShiftX,
        centerShiftY,
        video.videoWidth * ratio,
        video.videoHeight * ratio
    );
};
