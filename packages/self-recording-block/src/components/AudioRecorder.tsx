/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';
import { bindMicrophoneToAudioElement } from '../utilities';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';

type AudioRecorderProps = {
    onRecordingEnd: (assetIds: number[]) => void;
    microphoneDeviceId?: string;
};

export const AudioRecorder = ({ onRecordingEnd, microphoneDeviceId }: AudioRecorderProps) => {
    const [state, setState] = useState<'idle' | 'recording' | 'paused' | 'uploading'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results, doneAll }] = useAssetUpload();

    useEffect(() => {
        if (results.length > 0 && doneAll) {
            onRecordingEnd(results.map((asset) => asset.id));
            setState('idle');
        }
    }, [doneAll, results, onRecordingEnd]);

    const onStartClick = () => {
        // const stream = new MediaStream();
        const stream = microphoneRef.current?.srcObject as MediaStream | null;

        if (!stream) {
            throw new Error('No stream');
        }

        console.log(stream);

        recorder.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        recorder.current.addEventListener('dataavailable', (event) => {
            console.log(event.data);
            allChunks.current.push(event.data);
        });

        recorder.current.addEventListener('stop', () => {
            setState('uploading');
            if (allChunks.current.length > 0) {
                const blob = new Blob(allChunks.current, { type: 'video/webm' });
                console.log(blob);
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
        const bindElements = async () => {
            if (microphoneRef.current) {
                await bindMicrophoneToAudioElement(microphoneRef.current, microphoneDeviceId);
            }
        };

        bindElements();
    }, [microphoneDeviceId]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            <audio ref={microphoneRef} className="tw-hidden" muted></audio>

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
        </div>
    );
};
