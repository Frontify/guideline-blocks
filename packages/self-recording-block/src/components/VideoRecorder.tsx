/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { CameraSize, RecorderState, VideoMode, VideoShape } from '../types';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';
import { Camera } from './Camera';
import { Mask } from './Mask';

type VideoRecorderProps = {
    onRecordingEnd: (assetIds: number[]) => void;
    size: CameraSize;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
    videoOptions: { videoMode: VideoMode; backgroundAssetUrl?: string };
    shape: VideoShape;
};

export const VideoRecorder = ({
    onRecordingEnd,
    size,
    cameraDeviceId,
    microphoneDeviceId,
    videoOptions,
    shape,
}: VideoRecorderProps): ReactElement => {
    const [state, setState] = useState<RecorderState>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results, doneAll }] = useAssetUpload();

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
        console.log('delete');
    };

    useEffect(() => {
        if (results.length > 0 && doneAll) {
            onRecordingEnd(results.map((asset) => asset.id));
            setState('idle');
        }
    }, [doneAll, results, onRecordingEnd]);

    const onDevicePermissionDenied = () => {
        setState('permissions-error');
    };

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            {state !== 'permissions-error' ? (
                <>
                    <Mask shape={shape} size={size}>
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
                    <span>No permissions to record you</span>&nbsp;
                    <span className="tw-animate-spin">🥲</span>
                </div>
            )}
        </div>
    );
};
