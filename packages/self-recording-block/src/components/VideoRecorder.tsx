/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { CameraSize, MaskShape, RecorderState, VideoMode } from '../types';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';
import { Camera } from './Camera';
import { Mask, MaskProps } from './Mask';

type VideoRecorderProps = {
    onRecordingEnd: (assetIds: number[]) => Promise<void>;
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
    const [state, setState] = useState<RecorderState>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results: uploadedAssets, doneAll }] = useAssetUpload();

    const onStartClick = useCallback(() => {
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
            if (allChunks.current.length > 0) {
                const blob = new Blob(allChunks.current, { type: 'video/webm' });
                uploadFiles(new File([blob], 'self-record.webm'));
            }
        });

        recorder.current.start();
        setState('recording');
    }, [uploadFiles]);

    const onStopClick = useCallback(() => {
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

    const onRestartClick = useCallback(() => {
        recorder.current?.pause();
        allChunks.current = [];
        setState('idle');
    }, []);

    const onDeleteClick = useCallback(() => {
        console.log('delete');
    }, []);

    const onDevicePermissionDenied = useCallback(() => {
        setState('permissions-error');
    }, []);

    useEffect(() => {
        const associateAssetWithBlock = async () => {
            await onRecordingEnd(uploadedAssets.map((asset) => asset.id));
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
        <div className="tw-flex tw-flex-col tw-items-center">
            {state !== 'permissions-error' ? (
                <>
                    <Mask shape={maskShape} size={size} border={maskBorder}>
                        <Camera
                            cameraDeviceId={cameraDeviceId}
                            microphoneDeviceId={microphoneDeviceId}
                            size={size}
                            canvasRef={canvasRef}
                            cameraRef={cameraRef}
                            onDevicePermissionDenied={onDevicePermissionDenied}
                            videoOptions={videoOptions}
                        />
                    </Mask>

                    <div className="tw-mt-6">
                        <VideoRecorderToolbar
                            state={state}
                            onDeleteClick={onDeleteClick}
                            onPauseClick={onPauseClick}
                            onRestartClick={onRestartClick}
                            onResumeClick={onResumeClick}
                            onStartClick={onStartClick}
                            onStopClick={onStopClick}
                        />
                    </div>
                </>
            ) : (
                <div className="tw-h-12 tw-flex tw-items-center tw-justify-center tw-select-none">
                    <span>No permissions to record</span>&nbsp;
                    <span className="tw-animate-spin">🥲</span>
                </div>
            )}
        </div>
    );
};
