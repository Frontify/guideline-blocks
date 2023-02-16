/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@mediapipe/selfie_segmentation';

import { CameraSize, VideoMode } from '../types';
import { drawFrameCover } from './drawFrameCover';

import { dependencies } from '../../package.json';
import { cameraSizeToMaskSizeMap } from '../constants';

const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const versionSelfieSegmentation = dependencies['@mediapipe/selfie_segmentation'];
const segmenterConfig: bodySegmentation.MediaPipeSelfieSegmentationMediaPipeModelConfig = {
    runtime: 'mediapipe',
    modelType: 'general',
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@${versionSelfieSegmentation}`,
};

// Cache the segmenter and image to avoid re-creating it on every rerender.
let segmenter: bodySegmentation.BodySegmenter | undefined;
let image: HTMLImageElement | undefined;

export const bindFrameToCanvas = async (
    frame: HTMLImageElement | HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    tmpCanvasElement: HTMLCanvasElement,
    size: CameraSize,
    options: { videoMode: VideoMode; backgroundAssetUrl?: string },
    signal: AbortSignal
) => {
    const ctx = canvasElement.getContext('2d');
    const backgroundCtx = tmpCanvasElement.getContext('2d');
    if (!ctx || !backgroundCtx) {
        throw new Error('Could not get the canvas context.');
    }

    const frameWidth = (frame as HTMLVideoElement).videoWidth ?? (frame as HTMLImageElement).naturalWidth;
    const frameHeight = (frame as HTMLVideoElement).videoHeight ?? (frame as HTMLImageElement).naturalHeight;

    setCanvasWidth(canvasElement, cameraSizeToMaskSizeMap[size].width);
    setCanvasWidth(tmpCanvasElement, frameWidth);

    setCanvasHeight(canvasElement, cameraSizeToMaskSizeMap[size].height);
    setCanvasHeight(tmpCanvasElement, frameHeight);

    if ((options.videoMode === VideoMode.Asset || options.videoMode === VideoMode.Blur) && !segmenter) {
        segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    }

    if (
        (options.videoMode === VideoMode.Asset && options.backgroundAssetUrl && !image) ||
        image?.src !== options.backgroundAssetUrl
    ) {
        image = await new Promise<HTMLImageElement>((resolve) => {
            const img = new Image(canvasElement.width, canvasElement.height);
            img.crossOrigin = 'anonymous';
            img.src = options.backgroundAssetUrl ?? '';
            img.addEventListener('load', () => resolve(img));
        });
    }

    const step = async () => {
        if (signal.aborted) {
            return;
        }

        if (options.videoMode === VideoMode.Asset && segmenter && image) {
            const peopleSegmentation = await segmenter.segmentPeople(frame);
            const bodyMask = await bodySegmentation.toBinaryMask(
                peopleSegmentation,
                { r: 0, g: 0, b: 0, a: 0 },
                { r: 0, g: 0, b: 0, a: 255 },
                false,
                0.5
            );

            drawFrameCover(image, backgroundCtx);

            const backgroundAssetData = backgroundCtx.getImageData(
                0,
                0,
                tmpCanvasElement.width,
                tmpCanvasElement.height
            );

            for (let i = 0; i < backgroundAssetData.data.length; i += 4) {
                bodyMask.data[i] = backgroundAssetData.data[i];
                bodyMask.data[i + 1] = backgroundAssetData.data[i + 1];
                bodyMask.data[i + 2] = backgroundAssetData.data[i + 2];
            }

            await bodySegmentation.drawMask(canvasElement, frame, bodyMask, 1, 0, true);
        } else if (options.videoMode === VideoMode.Blur && segmenter) {
            const peopleSegmentation = await segmenter.segmentPeople(frame);
            await bodySegmentation.drawBokehEffect(canvasElement, frame, peopleSegmentation, 0.7, 9, 4, true);
        } else {
            drawFrameCover(frame, ctx);
        }

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

const setCanvasWidth = (canvasElement: HTMLCanvasElement, width: number) => {
    canvasElement.width = width;
    canvasElement.style.width = `${width}px`;
};

const setCanvasHeight = (canvasElement: HTMLCanvasElement, height: number) => {
    canvasElement.height = height;
    canvasElement.style.height = `${height}px`;
};
