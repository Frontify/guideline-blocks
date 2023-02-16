/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { CameraSize, MaskShape, RecorderState, VideoMode } from '../types';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';
import { Camera } from './Camera';
import { Mask, MaskProps } from './Mask';
import { BlankState } from './BlankState';
import { CountdownOverlay } from './CountdownOverlay';

type VideoRecorderProps = {
    onRecordingEnd: (assetId: number) => Promise<void>;
    size: CameraSize;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
    videoOptions: { videoMode: VideoMode; backgroundAssetUrl?: string };
    maskShape: MaskShape;
    maskBorder: MaskProps['border'];
};

export const VideoRecorder = ({
    onRecordingEnd,
    size,
    cameraDeviceId,
    microphoneDeviceId,
    videoOptions,
    maskShape,
    maskBorder,
}: VideoRecorderProps): ReactElement => {
    const [state, setState] = useState<RecorderState>('initializing');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results: uploadedAssets, doneAll }] = useAssetUpload();

    const startRecording = useCallback(() => {
        if (!canvasRef.current) {
            throw new Error('No `canvas` registered');
        }

        setState('recording');

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
            if (allChunks.current.length > 0) {
                const blob = new Blob(allChunks.current, { type: 'video/webm' });
                uploadFiles(new File([blob], 'self-record.webm'));
            }
        });

        recorder.current.start();
    }, [uploadFiles]);

    const onStartRecordingClick = useCallback(() => {
        setState('countdown');
    }, []);

    const onStopRecordingClick = useCallback(() => {
        recorder.current?.stop();
        setState('uploading');
    }, []);

    const onPauseClick = useCallback(() => {
        recorder.current?.pause();
        setState('paused');
    }, []);

    const onResumeClick = useCallback(() => {
        recorder.current?.resume();
        setState('recording');
    }, []);

    const onDeleteClick = useCallback(() => {
        recorder.current?.pause();
        allChunks.current = [];
        setState('idle');
    }, []);

    const onCancelClick = useCallback(() => {
        recorder.current?.pause();
        allChunks.current = [];
        setState('initializing');
    }, []);

    const onDevicePermissionDenied = useCallback(() => {
        setState('permissions-error');
    }, []);

    useEffect(() => {
        const associateAssetWithBlock = async () => {
            const assetId = uploadedAssets[0].id;
            await onRecordingEnd(assetId);
            setState('idle');
        };

        if (doneAll) {
            associateAssetWithBlock();
        }
        // TODO: This is a workaround for the upload going crazy
        // If we add `onRecordingEnd` to the deps the upload goes crazy
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadedAssets]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center" ref={parentRef}>
            <>
                <Mask shape={maskShape} size={size} border={maskBorder}>
                    {state !== 'initializing' && state !== 'permissions-error' ? (
                        <CountdownOverlay
                            timeLimit={3}
                            onCountdownFinished={startRecording}
                            enabled={state === 'countdown'}
                        >
                            <Camera
                                cameraDeviceId={cameraDeviceId}
                                microphoneDeviceId={microphoneDeviceId}
                                size={size}
                                canvasRef={canvasRef}
                                cameraRef={cameraRef}
                                onDevicePermissionDenied={onDevicePermissionDenied}
                                videoOptions={{ ...videoOptions, maxWidth: parentRef.current?.clientWidth }}
                            />
                        </CountdownOverlay>
                    ) : null}

                    {state === 'initializing' ? <BlankState onClick={() => setState('idle')} /> : null}

                    {state === 'permissions-error' ? (
                        <span className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#FAFAFA]">
                            No permissions <br />
                            to record&nbsp;
                            <span className="tw-animate-spin">🥲</span>
                        </span>
                    ) : null}
                </Mask>

                {state !== 'initializing' && state !== 'permissions-error' ? (
                    <div className="tw-mt-6">
                        <VideoRecorderToolbar
                            state={state}
                            onStartRecordingClick={onStartRecordingClick}
                            onStopRecordingClick={onStopRecordingClick}
                            onPauseClick={onPauseClick}
                            onResumeClick={onResumeClick}
                            onDeleteClick={onDeleteClick}
                            onCancelClick={onCancelClick}
                        />
                    </div>
                ) : null}
            </>
        </div>
    );
};
