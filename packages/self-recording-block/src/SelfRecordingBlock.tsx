/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

type CanvasRectangleElement = {
    shape: 'rectangle';
    source: HTMLVideoElement;
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
};

type CanvasCircleElement = {
    shape: 'circle';
    source: HTMLVideoElement;
    radius: number;
    top?: number;
    bottom?: number;
};

type CanvasElement = CanvasRectangleElement | CanvasCircleElement;

const bindScreenToVideoElement = async (videoElement: HTMLVideoElement) => {
    // TS doesn't have the correct type yet for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const displayMediaOptions: any = {
        video: {
            displaySurface: 'window',
        },
        audio: false,
    };

    try {
        videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (error) {
        console.error('No permission to record the screen.');
    }
};

const bindCameraToVideoElement = async (videoElement: HTMLVideoElement) => {
    const displayMediaOptions: MediaStreamConstraints = {
        video: {
            width: {
                min: 1280,
                max: 1920,
            },
            height: {
                min: 720,
                max: 1080,
            },
            facingMode: 'user',
        },
        audio: false,
    };

    try {
        videoElement.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
    } catch (error) {
        console.error('No permission to record the camera.');
    }
};

const bindMicrophoneToAudioElement = async (audioElement: HTMLAudioElement) => {
    const displayMediaOptions: MediaStreamConstraints = {
        video: false,
        audio: true,
    };

    try {
        audioElement.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
    } catch (error) {
        console.error('No permission to record the camera.');
    }
};

const bindVideoElementsToCanvas = (canvasShapeElements: CanvasElement[], canvasElement: HTMLCanvasElement) => {
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get the canvas context.');
    }

    const step = () => {
        for (const canvasShapeElement of canvasShapeElements) {
            if (canvasShapeElement.shape === 'circle') {
                ctx.save();
                ctx.beginPath();
                ctx.arc(25, 25, 25, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(
                    canvasShapeElement.source,
                    0,
                    0,
                    canvasShapeElement.radius * 2,
                    canvasShapeElement.radius * 2
                );

                ctx.beginPath();
                ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
                ctx.clip();
                ctx.closePath();
                ctx.restore();
            } else {
            }
            // console.log(videoFrame);
            // ctx.drawImage(canvasShapeElement.source, 0, 0, canvasElement.width, canvasElement.height);
        }
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

export const SelfRecordingBlock: FC<BlockProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const screenRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (screenRef.current && microphoneRef.current && cameraRef.current && canvasRef.current) {
            bindScreenToVideoElement(screenRef.current);
            bindCameraToVideoElement(cameraRef.current);
            bindMicrophoneToAudioElement(microphoneRef.current);
            bindVideoElementsToCanvas(
                [
                    { shape: 'rectangle', source: screenRef.current },
                    { shape: 'circle', source: cameraRef.current, radius: 20, top: 200 },
                ],
                canvasRef.current
            );
        }
    }, []);

    return (
        <div data-test-id="example-block">
            <video ref={screenRef} autoPlay={true}></video>
            <video ref={cameraRef} autoPlay={true}></video>
            <audio ref={microphoneRef} autoPlay={true}></audio>
            <canvas ref={canvasRef} className="tw-w-[480px] tw-h-[360px]"></canvas>
        </div>
    );
};
