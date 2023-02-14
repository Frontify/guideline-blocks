/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { cameraSizeToScaleMap } from '../constants';
import { CameraSize, VideoShape } from '../types';
import { bindCameraToVideoElement, drawVideoFrameScaled } from '../utilities';

const bindVideoToCanvas = (videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement, scale: number) => {
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

export const VideoRecorder = ({
    updateAssetIdsFromKey,
    size,
    shape,
}: {
    //TODO: remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAssetIdsFromKey: any;
    size: CameraSize;
    shape: VideoShape;
}) => {
    const [state, setState] = useState<'idle' | 'recording' | 'uploading'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [uploadFiles, { results, doneAll }] = useAssetUpload();

    useEffect(() => {
        if (results.length > 0 && doneAll) {
            updateAssetIdsFromKey(
                'video',
                results.map((asset) => asset.id)
            );
            setState('idle');
        }
    }, [doneAll, results, updateAssetIdsFromKey]);

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
            setState('uploading');
            uploadFiles(new File([blob], 'self-record.webm'));
        });

        recorder.current.start();
        setState('recording');
    };

    const onStopRecord = () => {
        recorder.current?.stop();
    };

    useEffect(() => {
        const bindElements = async () => {
            if (cameraRef.current && canvasRef.current) {
                await bindCameraToVideoElement(cameraRef.current);

                const sizeScale = cameraSizeToScaleMap[size];

                bindVideoToCanvas(cameraRef.current, canvasRef.current, sizeScale);
            }
        };

        bindElements();
    }, [size, state]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            <canvas ref={canvasRef}></canvas>
            <video ref={cameraRef} autoPlay={true} className="tw-hidden"></video>

            <div className="tw-flex tw-gap-4">
                {state}
                <button onClick={onStartRecord}>Record</button>
                <button onClick={onStopRecord}>Stop</button>
            </div>
        </div>
    );
};
