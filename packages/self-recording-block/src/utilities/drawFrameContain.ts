/* (c) Copyright Frontify Ltd., all rights reserved. */

export const drawFrameContain = (frame: HTMLImageElement | HTMLVideoElement, ctx: CanvasRenderingContext2D) => {
    const frameWidth = (frame as HTMLVideoElement).videoWidth ?? (frame as HTMLImageElement).naturalWidth;
    const frameHeight = (frame as HTMLVideoElement).videoHeight ?? (frame as HTMLImageElement).naturalHeight;

    const canvas = ctx.canvas;
    const hRatio = canvas.width / frameWidth;
    const vRatio = canvas.height / frameHeight;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - frameWidth * ratio) / 2;
    const centerShiftY = (canvas.height - frameHeight * ratio) / 2;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
        frame,
        0,
        0,
        frameWidth,
        frameHeight,
        centerShiftX,
        centerShiftY,
        frameWidth * ratio,
        frameHeight * ratio
    );
    ctx.restore();
};
