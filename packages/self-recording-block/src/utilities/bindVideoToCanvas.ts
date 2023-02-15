/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import * as mpSelfieSegmentation from '@mediapipe/selfie_segmentation';

import { VideoMode } from '../types';
import { drawFrameCover } from './drawFrameCover';

const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const segmenterConfig: bodySegmentation.MediaPipeSelfieSegmentationMediaPipeModelConfig = {
    runtime: 'mediapipe',
    modelType: 'general',
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@${mpSelfieSegmentation.VERSION}`,
};

export const bindVideoToCanvas = async (
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    tmpCanvasElement: HTMLCanvasElement,
    scale: number,
    options: { videoMode: VideoMode; backgroundAssetUrl?: string },
    signal: AbortSignal
) => {
    const ctx = canvasElement.getContext('2d');
    const backgroundCtx = tmpCanvasElement.getContext('2d');
    if (!ctx || !backgroundCtx) {
        throw new Error('Could not get the canvas context.');
    }

    const parentContainerWidth =
        (canvasElement.parentElement?.parentElement?.parentElement as HTMLDivElement).clientWidth * scale;
    setCanvasWidth(canvasElement, parentContainerWidth);
    setCanvasWidth(tmpCanvasElement, videoElement.videoWidth);

    const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const height = parentContainerWidth / videoAspectRatio;
    setCanvasHeight(canvasElement, height);
    setCanvasHeight(tmpCanvasElement, videoElement.videoHeight);

    let segmenter: bodySegmentation.BodySegmenter | undefined;
    if (options.videoMode === VideoMode.Custom || options.videoMode === VideoMode.Blur) {
        segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    }

    let image: HTMLImageElement | undefined;
    if (options.videoMode === VideoMode.Custom && options.backgroundAssetUrl) {
        image = await new Promise<HTMLImageElement>((resolve) => {
            const img = new Image(canvasElement.width, canvasElement.height);
            img.crossOrigin = 'anonymous';
            img.src = options.backgroundAssetUrl ?? '';
            img.addEventListener('load', () => {
                return resolve(img);
            });
        });
    }

    const step = async () => {
        if (signal.aborted) {
            return;
        }

        if (options.videoMode === VideoMode.Custom && segmenter && image) {
            const peopleSegmentation = await segmenter.segmentPeople(videoElement);
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

            await bodySegmentation.drawMask(canvasElement, videoElement, bodyMask, 1, 0, true);
        } else if (options.videoMode === VideoMode.Blur && segmenter) {
            const peopleSegmentation = await segmenter.segmentPeople(videoElement);
            await bodySegmentation.drawBokehEffect(canvasElement, videoElement, peopleSegmentation, 0.5, 9, 3, true);
        } else {
            drawFrameCover(videoElement, ctx);
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
