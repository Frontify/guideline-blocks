/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { Countdown, bindAudioToCanvas, bindMicrophoneToAudioElement } from '../utilities';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';
import { CountdownState, RecorderState } from '../types';
import { COUNTDOWN_IN_SECONDS } from '../constants';
import { merge } from '@frontify/fondue';

type AudioRecorderProps = {
    onRecordingEnd: (assetIds: number[]) => void;
    microphoneDeviceId?: string;
};

export const AudioRecorder = ({ onRecordingEnd, microphoneDeviceId }: AudioRecorderProps) => {
    const [state, setState] = useState<RecorderState>('idle');
    const [countdownState, setCountdownState] = useState<CountdownState>({ count: COUNTDOWN_IN_SECONDS });
    const recorder = useRef<MediaRecorder | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results, doneAll }] = useAssetUpload();
    const countdown = new Countdown(COUNTDOWN_IN_SECONDS);

    useEffect(() => {
        if (results.length > 0 && doneAll) {
            onRecordingEnd(results.map((asset) => asset.id));
            setState('idle');
        }
    }, [doneAll, results, onRecordingEnd]);

    const onStartClick = () => {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.start();

        countdown.init(startRecording, async (timeLeft: number): Promise<void> => {
            if (timeLeft === COUNTDOWN_IN_SECONDS) {
                setState('countdown');
            }
            setCountdownState({ count: timeLeft });

            if (timeLeft === 0) {
                return;
            }

            await beep(oscillator, audioContext.destination, 150);
        });
    };

    function beep(oscillator: OscillatorNode, destination: AudioDestinationNode, duration: number) {
        oscillator.connect(destination);
        return new Promise(() =>
            setTimeout(() => {
                oscillator.disconnect(destination);
            }, duration)
        );
    }

    const startRecording = () => {
        const stream = microphoneRef.current?.srcObject as MediaStream | null;

        if (!stream) {
            throw new Error('No stream');
        }

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
            if (microphoneRef.current && canvasRef.current) {
                try {
                    await bindMicrophoneToAudioElement(microphoneRef.current, microphoneDeviceId);
                    bindAudioToCanvas(microphoneRef.current, canvasRef.current);
                } catch {
                    setState('permissions-error');
                }
            }
        };

        bindElements();
    }, [microphoneDeviceId]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            {state !== 'permissions-error' ? (
                <>
                    <div
                        className={merge([
                            state !== 'countdown' && 'tw-hidden',
                            'tw-absolute tw-w-full tw-h-full tw-text-center tw-text-white tw-bg-black/[.3] tw-text-7xl',
                        ])}
                    >
                        {countdownState.count}
                    </div>
                    <canvas ref={canvasRef}></canvas>
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
