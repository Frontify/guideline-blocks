/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAssetUpload } from '@frontify/app-bridge';

import { Countdown, bindAudioToCanvas, bindMicrophoneToAudioElement } from '../utilities';
import { VideoRecorderToolbar } from './VideoRecorderToolbar';
import { CountdownState, RecorderState } from '../types';
import { COUNTDOWN_IN_SECONDS } from '../constants';
import { merge } from '@frontify/fondue';
import { BlankState } from './BlankState';

type AudioRecorderProps = {
    onRecordingEnd: (assetId: number) => Promise<void>;
    microphoneDeviceId?: string;
};

export const AudioRecorder = ({ onRecordingEnd, microphoneDeviceId }: AudioRecorderProps) => {
    const [state, setState] = useState<RecorderState>('initializing');
    const [countdownState, setCountdownState] = useState<CountdownState>({ count: COUNTDOWN_IN_SECONDS });
    const recorder = useRef<MediaRecorder | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const microphoneRef = useRef<HTMLAudioElement>(null);
    const allChunks = useRef<BlobPart[]>([]);
    const [uploadFiles, { results: uploadedAssets, doneAll }] = useAssetUpload();
    const countdown = new Countdown(COUNTDOWN_IN_SECONDS);

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

    const onStartRecordingClick = () => {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.start();

        countdown.init(startRecording, async (timeLeft): Promise<void> => {
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

    const beep = (oscillator: OscillatorNode, destination: AudioDestinationNode, duration: number) => {
        oscillator.connect(destination);
        return new Promise(() =>
            setTimeout(() => {
                oscillator.disconnect(destination);
            }, duration)
        );
    };

    const startRecording = useCallback(() => {
        const stream = microphoneRef.current?.srcObject as MediaStream | null;

        if (!stream) {
            throw new Error('No stream');
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

        if (state === 'idle') {
            bindElements();
        }
    }, [microphoneDeviceId, state]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            <>
                {state !== 'initializing' && state !== 'permissions-error' ? (
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
                                onStartRecordingClick={onStartRecordingClick}
                                onStopRecordingClick={onStopRecordingClick}
                                onPauseClick={onPauseClick}
                                onResumeClick={onResumeClick}
                                onDeleteClick={onDeleteClick}
                                onCancelClick={onCancelClick}
                            />
                        </div>
                    </>
                ) : null}

                {state === 'initializing' ? <BlankState onClick={() => setState('idle')} /> : null}

                {state === 'permissions-error' ? (
                    <span className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#FAFAFA]">
                        No permissions <br />
                        to record&nbsp;
                        <span className="tw-animate-spin">🥲</span>
                    </span>
                ) : null}
            </>
        </div>
    );
};
