/* (c) Copyright Frontify Ltd., all rights reserved. */

export const drawFrameCover = (frame: HTMLImageElement | HTMLVideoElement, ctx: CanvasRenderingContext2D) => {
    const frameWidth = (frame as HTMLVideoElement).videoWidth ?? (frame as HTMLImageElement).naturalWidth;
    const frameHeight = (frame as HTMLVideoElement).videoHeight ?? (frame as HTMLImageElement).naturalHeight;

    const canvas = ctx.canvas;
    const containerRatio = canvas.height / canvas.width;

    let width = frameWidth;
    let height = frameHeight;
    const imgRatio = height / width;

    if (imgRatio > containerRatio) {
        // image's height too big
        height = width * containerRatio;
    } else {
        // image's width too big
        width = height / containerRatio;
    }

    const offset = {
        x: (frameWidth - width) * 0.5,
        y: (frameHeight - height) * 0.5,
    };

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(frame, offset.x, offset.y, width, height, 0, 0, canvas.width, canvas.height);
    ctx.restore();
};
