/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonEmphasis, ButtonSize, IconPlayCircle12 } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useFileUpload } from '@frontify/app-bridge';

import { CAMERA_CONSTRAINTS, cameraSizeToRatioMap } from './constants';
import { Settings, VideoCanvasElement, VideoShape } from './types';

// const bindMicrophoneToAudioElement = async (audioElement: HTMLAudioElement) => {
//     const displayMediaOptions: MediaStreamConstraints = {
//         video: false,
//         audio: true,
//     };

//     try {
//         audioElement.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
//     } catch (error) {
//         console.error('No permission to record the microphone.');
//     }
// };

function drawVideFrameScaled(video: HTMLVideoElement, ctx: CanvasRenderingContext2D) {
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
}

const bindCameraToVideoElement = async (videoElement: HTMLVideoElement) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);
            videoElement.addEventListener('loadedmetadata', () => resolve());
            videoElement.play();
        } catch (error) {
            reject('No permission to record the camera.');
        }
    });
};

const bindVideoToCanvas = (videoCanvasElement: VideoCanvasElement, canvasElement: HTMLCanvasElement) => {
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get the canvas context.');
    }

    const parentContainerWidth = (canvasElement.parentElement as HTMLDivElement).clientWidth * videoCanvasElement.ratio;
    const videoAspectRatio = videoCanvasElement.source.videoWidth / videoCanvasElement.source.videoHeight;
    canvasElement.width = parentContainerWidth;
    canvasElement.style.width = `${parentContainerWidth}px`;
    canvasElement.height = parentContainerWidth / videoAspectRatio;
    canvasElement.style.height = `${parentContainerWidth / videoAspectRatio}px`;

    const size = Math.min(canvasElement.width, canvasElement.height);

    const step = () => {
        if (videoCanvasElement.shape === VideoShape.Circle) {
            drawVideFrameScaled(videoCanvasElement.source, ctx);

            // only draw image where mask is
            ctx.globalCompositeOperation = 'destination-in';

            // Draw circle mask
            ctx.beginPath();
            ctx.arc(canvasElement.width / 2, canvasElement.height / 2, size / 2, 0, 2 * Math.PI);
            ctx.fill();

            // restore to default composite operation (is draw over current image)
            ctx.globalCompositeOperation = 'source-over';
        }

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const [state, setState] = useState<'idle' | 'record'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [uploadFiles] = useFileUpload();
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const sizeRatio = cameraSizeToRatioMap[blockSettings.size];

    const onStartRecord = () => {
        if (!canvasRef.current) {
            throw new Error('No `canvas` registered');
        }
        const stream = canvasRef.current.captureStream();
        recorder.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        const allChunks: BlobPart[] = [];

        recorder.current.addEventListener('dataavailable', (event) => {
            allChunks.push(event.data);
        });

        recorder.current.addEventListener('stop', () => {
            const blob = new Blob(allChunks, { type: 'video/webm' });
            uploadFiles(new File([blob], 'self-record.webm'));
        });

        recorder.current.start();
    };

    const onStopRecord = () => {
        recorder.current?.stop();
    };

    useEffect(() => {
        const bindElements = async () => {
            if (cameraRef.current && canvasRef.current && state === 'record') {
                await bindCameraToVideoElement(cameraRef.current);

                bindVideoToCanvas(
                    { shape: VideoShape.Circle, ratio: sizeRatio, source: cameraRef.current },
                    canvasRef.current
                );
            }
        };

        bindElements();
    }, [sizeRatio, state]);

    return (
        <>
            {state === 'idle' && (
                <div className="tw-h-36 tw-flex tw-items-center tw-justify-center">
                    <Button
                        emphasis={ButtonEmphasis.Default}
                        size={ButtonSize.Small}
                        icon={<IconPlayCircle12 />}
                        onClick={() => setState('record')}
                    >
                        Add Recording
                    </Button>
                </div>
            )}

            {state === 'record' && (
                <div className="tw-flex tw-flex-col tw-items-center">
                    <canvas ref={canvasRef}></canvas>
                    <video ref={cameraRef} autoPlay={true} className="tw-hidden"></video>

                    <div className="tw-flex tw-gap-4">
                        <button onClick={onStartRecord}>Record</button>
                        <button onClick={onStopRecord}>Stop</button>
                    </div>
                </div>
            )}
        </>
    );
};
