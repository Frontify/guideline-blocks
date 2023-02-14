/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { Asset, useAssetUpload } from '@frontify/app-bridge';

import { cameraSizeToScaleMap } from '../constants';
import { CameraSize } from '../types';
import { bindCameraToVideoElement, drawVideoFrameScaled } from '../utilities';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    IconArrowRoundAntiClockwise16,
    IconPause16,
    IconPlay16,
    IconTrashBin16,
    LoadingCircle,
    LoadingCircleSize,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';

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
    asset,
    cameraDeviceId,
    microphoneDeviceId,
}: {
    //TODO: remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAssetIdsFromKey: any;
    size: CameraSize;
    asset?: Asset;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
}) => {
    const [state, setState] = useState<'idle' | 'recording' | 'paused' | 'uploading'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
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

    const onStartClick = () => {
        if (!canvasRef.current) {
            throw new Error('No `canvas` registered');
        }
        const stream = canvasRef.current.captureStream();
        const audio = (cameraRef.current?.srcObject as MediaStream | null)?.getAudioTracks();

        if (audio && audio.length > 0) {
            stream.addTrack(audio[0]);
        }

        recorder.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        recorder.current.addEventListener('dataavailable', (event) => {
            allChunks.current.push(event.data);
        });

        recorder.current.addEventListener('stop', () => {
            setState('uploading');
            if (allChunks.current.length > 0) {
                const blob = new Blob(allChunks.current, { type: 'video/webm' });
                uploadFiles(new File([blob], 'self-record.webm'));
            }
        });

        recorder.current.start();
        setState('recording');
    };

    const onStopClick = () => {
        recorder.current?.stop();
    };

    const onPauseClick = () => {
        recorder.current?.pause();
        setState('paused');
    };

    const onResumeClick = () => {
        recorder.current?.resume();
        setState('recording');
    };

    const onRestartClick = () => {
        recorder.current?.pause();
        allChunks.current = [];
        setState('idle');
    };

    const onDeleteClick = () => {
        updateAssetIdsFromKey('video', []);
    };

    useEffect(() => {
        const bindElements = async () => {
            if (cameraRef.current && canvasRef.current) {
                await bindCameraToVideoElement(cameraRef.current, cameraDeviceId, microphoneDeviceId);

                bindVideoToCanvas(cameraRef.current, canvasRef.current, cameraSizeToScaleMap[size]);
            }
        };

        bindElements();
    }, [size, cameraDeviceId, microphoneDeviceId]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            <canvas ref={canvasRef}></canvas>
            <video ref={cameraRef} autoPlay={true} className="tw-hidden" muted></video>

            <div className="tw-flex tw-gap-2 tw-px-2 tw-py-1 tw-mt-6 tw-bg-box-neutral tw-rounded-lg">
                {state === 'idle' ? (
                    <Tooltip
                        content="Start recording"
                        position={TooltipPosition.Top}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                rounding={ButtonRounding.Full}
                                emphasis={ButtonEmphasis.Weak}
                                icon={
                                    <div className="tw-min-h-[16px] tw-min-w-[16px] tw-h-4 tw-w-4 tw-rounded-full tw-cursor-pointer tw-bg-box-negative-strong hover:tw-bg-box-negative-strong-hover active:tw-bg-box-negative-strong-pressed" />
                                }
                                onClick={onStartClick}
                                aria-label="Start recording"
                            />
                        }
                    />
                ) : null}

                {state === 'uploading' ? (
                    <div className="tw-inline-flex tw-items-center tw-justify-center tw-px-2">
                        <LoadingCircle size={LoadingCircleSize.Small} />
                    </div>
                ) : null}

                {['recording', 'paused'].includes(state) ? (
                    <Tooltip
                        content="Stop recording"
                        position={TooltipPosition.Top}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                rounding={ButtonRounding.Full}
                                emphasis={ButtonEmphasis.Weak}
                                icon={
                                    <div className="tw-min-h-[16px] tw-min-w-[16px] tw-h-4 tw-w-4 tw-rounded tw-cursor-pointer tw-bg-button-icon group-hover:tw-bg-button-icon-hover group-active:tw-bg-button-icon-pressed" />
                                }
                                onClick={onStopClick}
                                aria-label="Stop recording"
                            />
                        }
                    />
                ) : null}

                <Tooltip
                    content="Restart recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    disabled={!['recording', 'paused'].includes(state) || state === 'uploading'}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconArrowRoundAntiClockwise16 />}
                            disabled={!['recording', 'paused'].includes(state) || state === 'uploading'}
                            onClick={onRestartClick}
                            aria-label="Restart recording"
                        />
                    }
                />

                {state === 'paused' ? (
                    <Tooltip
                        content="Resume recording"
                        position={TooltipPosition.Top}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                rounding={ButtonRounding.Full}
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconPlay16 />}
                                onClick={onResumeClick}
                                aria-label="Resume recording"
                            />
                        }
                    />
                ) : (
                    <Tooltip
                        content="Pause recording"
                        position={TooltipPosition.Top}
                        enterDelay={800}
                        disabled={['idle', 'paused', 'uploading'].includes(state)}
                        triggerElement={
                            <Button
                                rounding={ButtonRounding.Full}
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconPause16 />}
                                onClick={onPauseClick}
                                disabled={['idle', 'paused', 'uploading'].includes(state)}
                                aria-label="Pause recording"
                            />
                        }
                    />
                )}

                {asset !== undefined ? (
                    <Tooltip
                        content="Delete saved recording"
                        position={TooltipPosition.Top}
                        enterDelay={800}
                        disabled={state === 'uploading'}
                        triggerElement={
                            <Button
                                rounding={ButtonRounding.Full}
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconTrashBin16 />}
                                onClick={onDeleteClick}
                                disabled={state === 'uploading'}
                                aria-label="Delete saved recording"
                            />
                        }
                    />
                ) : null}
            </div>
        </div>
    );
};
