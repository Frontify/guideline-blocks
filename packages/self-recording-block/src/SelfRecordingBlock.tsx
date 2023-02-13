/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useRef, useState } from 'react';
import { Button, ButtonEmphasis, ButtonSize, IconPlayCircle12 } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useFileUpload } from '@frontify/app-bridge';
import Sketch from 'react-p5';
import p5Types from 'p5';

import { CAMERA_CONSTRAINTS, SCREEN_CONSTRAINTS } from './constants';
import { createDisplayCapture } from './utils';
import { RecordingMode, Settings } from './types';

// const bindMicrophoneToAudioElement = async (audioElement: HTMLAudioElement) => {
//     const displayMediaOptions: MediaStreamConstraints = {
//         video: false,
//         audio: true,
//     };

//     try {
//         audioElement.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
//     } catch (error) {
//         console.error('No permission to record the camera.');
//     }
// };

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const [state, setState] = useState<'idle' | 'record'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const [uploadFiles] = useFileUpload();
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    let cameraCapture: p5Types.Element;
    let screenCapture: p5Types.Element;
    let cameraGraphics: p5Types.Graphics;
    let cameraCircleMaskGraphic: p5Types.Graphics;

    let canvas: HTMLCanvasElement;

    let screenRatio = 1;
    let cameraRatio = 1;

    const onStartRecord = () => {
        const stream = canvas.captureStream();
        recorder.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        const allChunks: BlobPart[] = [];

        recorder.current.addEventListener('dataavailable', (event) => {
            allChunks.push(event.data);
        });

        recorder.current.addEventListener('stop', () => {
            const blob = new Blob(allChunks, { type: 'video/webm' });
            uploadFiles(new File([blob], 'self-record.webm'));
        });

        recorder.current.start();
    };

    const onStopRecord = () => {
        recorder.current?.stop();
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        let p5canvas;
        if (blockSettings.recordingMode === RecordingMode.ScreenAndCamera) {
            screenRatio = SCREEN_CONSTRAINTS.video.width / canvasParentRef.clientWidth;
            p5canvas = p5.createCanvas(canvasParentRef.clientWidth, SCREEN_CONSTRAINTS.video.height / screenRatio);
        } else {
            screenRatio = CAMERA_CONSTRAINTS.video.width / canvasParentRef.clientWidth;
            p5canvas = p5.createCanvas(canvasParentRef.clientWidth, CAMERA_CONSTRAINTS.video.height / screenRatio);
        }
        p5canvas.parent(canvasParentRef);
        canvas = p5canvas.elt;

        cameraCapture = p5.createCapture(CAMERA_CONSTRAINTS);
        cameraCapture.hide();

        cameraRatio = CAMERA_CONSTRAINTS.video.width / 300;
        cameraGraphics = p5.createGraphics(CAMERA_CONSTRAINTS.video.width, CAMERA_CONSTRAINTS.video.height);

        cameraCircleMaskGraphic = p5.createGraphics(cameraGraphics.width, cameraGraphics.height);
        cameraCircleMaskGraphic.circle(cameraGraphics.width / 2, cameraGraphics.height / 2, (300 * cameraRatio) / 2);

        if (blockSettings.recordingMode === RecordingMode.ScreenAndCamera) {
            screenCapture = createDisplayCapture(SCREEN_CONSTRAINTS, p5);
            screenCapture.hide();
        }
    };

    const draw = (p5: p5Types) => {
        // Render screen
        if (blockSettings.recordingMode === RecordingMode.ScreenAndCamera) {
            p5.image(
                screenCapture,
                0,
                0,
                SCREEN_CONSTRAINTS.video.width / screenRatio,
                SCREEN_CONSTRAINTS.video.height / screenRatio
            );
        }

        // Apply mask on webcam
        cameraGraphics.image(cameraCapture, 0, 0, cameraGraphics.width, cameraGraphics.height);
        const cameraFrame = cameraGraphics.get();
        cameraFrame.mask(cameraCircleMaskGraphic.get());

        // Render masked webcam
        p5.imageMode(p5.CENTER);
        p5.image(
            cameraFrame,
            100,
            p5.height - 100,
            CAMERA_CONSTRAINTS.video.width / cameraRatio,
            CAMERA_CONSTRAINTS.video.height / cameraRatio
        );
        p5.imageMode(p5.CORNER);
    };

    return (
        <>
            {state === 'idle' && (
                <div className="tw-h-36 tw-flex tw-items-center tw-justify-center">
                    <Button
                        emphasis={ButtonEmphasis.Default}
                        size={ButtonSize.Small}
                        icon={<IconPlayCircle12 />}
                        onClick={() => setState('record')}
                    >
                        Add Recording
                    </Button>
                </div>
            )}

            {state === 'record' && (
                <div className="tw-flex tw-flex-col">
                    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore */}
                    <Sketch setup={setup} draw={draw} />
                    <div className="tw-flex tw-gap-4">
                        <button onClick={onStartRecord}>Record</button>
                        <button onClick={onStopRecord}>Stop</button>
                    </div>
                </div>
            )}
        </>
    );
};
