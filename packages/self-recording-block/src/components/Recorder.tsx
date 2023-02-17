/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { CameraSize, MaskShape, RecorderState, RecordingMode, VideoMode } from '../types';
import { RecorderToolbar } from './RecorderToolbar';
import { Camera } from './Camera';
import { Mask, MaskProps } from './Mask';
import { BlankState } from './BlankState';
import { CountdownOverlay } from './CountdownOverlay';
import { AvatarCamera } from './AvatarCamera';

type RecorderProps = {
    recordingMode: RecordingMode;
    onRecordingEnd: (assetId: number) => Promise<void>;
    size: CameraSize;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
    videoOptions: { videoMode: VideoMode; backgroundAssetUrl?: string };
    maskShape: MaskShape;
    maskBorder: MaskProps['border'];
    avatarImageUrl: string;
};

export const Recorder = ({
    recordingMode,
    onRecordingEnd,
    size,
    cameraDeviceId,
    microphoneDeviceId,
    videoOptions,
    maskShape,
    maskBorder,
    avatarImageUrl,
}: RecorderProps): ReactElement => {
    const [state, setState] = useState<RecorderState>('initializing');
    const recorder = useRef<MediaRecorder | null>(null);
    const mediaRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rippleRef = useRef<HTMLCanvasElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results: uploadedAssets, doneAll }] = useAssetUpload();

    const startRecording = useCallback(() => {
        if (!canvasRef.current) {
            throw new Error('No `canvas` registered');
        }

        setState('recording');

        const stream = canvasRef.current.captureStream();
        const audio = (mediaRef.current?.srcObject as MediaStream | null)?.getAudioTracks();

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
        <div className="tw-flex tw-flex-col tw-items-center tw-font-sans" ref={parentRef}>
            <>
                <canvas ref={rippleRef} style={{ bottom: '12%' }} className="tw-absolute tw-z-50"></canvas>
                <Mask shape={maskShape} size={size} border={maskBorder}>
                    {state !== 'initializing' && state !== 'permissions-error' ? (
                        <CountdownOverlay
                            timeLimit={3}
                            onCountdownFinished={startRecording}
                            enabled={state === 'countdown'}
                        >
                            {recordingMode === RecordingMode.CameraAndAudio ? (
                                <Camera
                                    cameraDeviceId={cameraDeviceId}
                                    microphoneDeviceId={microphoneDeviceId}
                                    size={size}
                                    canvasRef={canvasRef}
                                    cameraRef={mediaRef}
                                    onDevicePermissionDenied={onDevicePermissionDenied}
                                    videoOptions={videoOptions}
                                />
                            ) : (
                                <AvatarCamera
                                    microphoneDeviceId={microphoneDeviceId}
                                    size={size}
                                    canvasRef={canvasRef}
                                    rippleRef={rippleRef}
                                    microphoneRef={mediaRef}
                                    onDevicePermissionDenied={onDevicePermissionDenied}
                                    videoOptions={videoOptions}
                                    imageUrl={avatarImageUrl}
                                />
                            )}
                        </CountdownOverlay>
                    ) : null}

                    {state === 'initializing' ? <BlankState onClick={() => setState('idle')} /> : null}

                    {state === 'permissions-error' ? (
                        <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#FAFAFA]">
                            <span className="tw-text-center">
                                Please give us permission
                                <br /> to record&nbsp;
                                <span className="tw-animate-spin">🥲</span>
                            </span>
                        </div>
                    ) : null}
                </Mask>

                {state !== 'initializing' && state !== 'permissions-error' ? (
                    <div className="tw-mt-6">
                        <RecorderToolbar
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
