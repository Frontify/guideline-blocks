/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import * as mpSelfieSegmentation from '@mediapipe/selfie_segmentation';

import { drawFrameContain as drawFrameContain } from './drawFrameContain';
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
    options: { videoMode: VideoMode; backgroundAssetUrl?: string }
) => {
    const ctx = canvasElement.getContext('2d');
    const tmpCtx = tmpCanvasElement.getContext('2d');
    if (!ctx || !tmpCtx) {
        throw new Error('Could not get the canvas context.');
    }

    const parentContainerWidth = (canvasElement.parentElement as HTMLDivElement).clientWidth * scale;
    const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    canvasElement.width = tmpCanvasElement.width = parentContainerWidth;
    tmpCanvasElement.width = parentContainerWidth;
    canvasElement.style.width = tmpCanvasElement.style.width = `${parentContainerWidth}px`;
    tmpCanvasElement.style.width = `${parentContainerWidth}px`;
    canvasElement.height = tmpCanvasElement.height = parentContainerWidth / videoAspectRatio;
    tmpCanvasElement.height = parentContainerWidth / videoAspectRatio;
    canvasElement.style.height = tmpCanvasElement.style.height = `${parentContainerWidth / videoAspectRatio}px`;
    tmpCanvasElement.style.height = `${parentContainerWidth / videoAspectRatio}px`;

    let segmenter: bodySegmentation.BodySegmenter | undefined;
    if (options.videoMode === VideoMode.Custom || options.videoMode === VideoMode.Blur) {
        segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    }

    let image: HTMLImageElement | undefined;
    if (options.videoMode === VideoMode.Custom) {
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
        if (options.videoMode === VideoMode.Custom && segmenter && image) {
            const peopleSegmentation = await segmenter.segmentPeople(videoElement);
            const bodyMask = await bodySegmentation.toBinaryMask(
                peopleSegmentation,
                { r: 0, g: 0, b: 0, a: 0 },
                { r: 0, g: 0, b: 0, a: 255 },
                false,
                0.5
            );

            drawFrameCover(image, tmpCtx);
            const backgroundAssetData = tmpCtx.getImageData(0, 0, canvasElement.width, canvasElement.height);

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
            drawFrameContain(videoElement, ctx);
        }

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};
