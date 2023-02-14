/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { Button, ButtonEmphasis, ButtonSize, IconPlayCircle12 } from '@frontify/fondue';
import { useAssetUpload } from '@frontify/app-bridge';

import { cameraSizeToScaleMap } from '../constants';
import { CameraSize, VideoShape } from '../types';
import { bindCameraToVideoElement, drawVideoFrameScaled } from '../utilities';

const bindVideoToCanvas = (
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    scale: number,
    shape: VideoShape
) => {
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

    const size = Math.min(canvasElement.width, canvasElement.height);

    const step = () => {
        drawVideoFrameScaled(videoElement, ctx);

        if (shape === VideoShape.Circle) {
            // only draw image where mask is
            ctx.globalCompositeOperation = 'destination-in';

            // Draw circle mask
            ctx.beginPath();
            ctx.arc(canvasElement.width / 2, canvasElement.height / 2, size / 2, 0, 2 * Math.PI);
            ctx.fill();

            // restore to default composite operation (is draw over current image)
            ctx.globalCompositeOperation = 'source-over';
        } else if (shape === VideoShape.Square) {
            // only draw image where mask is
            ctx.globalCompositeOperation = 'destination-in';

            // Draw square mask
            ctx.beginPath();
            ctx.rect(
                canvasElement.width / 2 - size / 2,
                canvasElement.height / 2 - size / 2,
                canvasElement.width / 2 + size / 2,
                canvasElement.height / 2 + size
            );
            ctx.fill();

            // restore to default composite operation (is draw over current image)
            ctx.globalCompositeOperation = 'source-over';
        }

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

                bindVideoToCanvas(cameraRef.current, canvasRef.current, sizeScale, shape);
            }
        };

        bindElements();
    }, [shape, size, state]);

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
