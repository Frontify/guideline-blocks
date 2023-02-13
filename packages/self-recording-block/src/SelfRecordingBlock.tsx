/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useRef, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'tailwindcss/tailwind.css';

import { CAMERA_CONSTRAINTS, SCREEN_CONSTRAINTS } from './constants';
import { createDisplayCapture } from './utils';
import { useFileUpload } from '@frontify/app-bridge';

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

export const SelfRecordingBlock: FC<BlockProps> = () => {
    let cameraCapture: p5Types.Element;
    let screenCapture: p5Types.Element;
    let cameraGraphics: p5Types.Graphics;
    let shape: p5Types.Graphics;

    let canvas: HTMLCanvasElement;

    let screenRatio = 1;

    const [state, setState] = useState<'idle' | 'record'>('idle');
    const recorder = useRef<MediaRecorder | null>(null);
    const [uploadFiles] = useFileUpload();

    const onStartRecord = () => {
        const stream = canvas.captureStream();
        recorder.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        const allChunks: BlobPart[] = [];

        recorder.current.ondataavailable = function (event) {
            allChunks.push(event.data);
        };

        recorder.current.onstop = () => {
            const blob = new Blob(allChunks, { type: 'video/webm' });
            uploadFiles(new File([blob], 'self-record.webm'));
        };

        recorder.current.start();
    };

    const onStopRecord = () => {
        recorder.current?.stop();
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        screenRatio = SCREEN_CONSTRAINTS.video.width / canvasParentRef.clientWidth;

        const p5canvas = p5.createCanvas(canvasParentRef.clientWidth, SCREEN_CONSTRAINTS.video.height / screenRatio);
        p5canvas.parent(canvasParentRef);
        canvas = p5canvas.elt;

        cameraCapture = p5.createCapture(CAMERA_CONSTRAINTS);
        cameraCapture.hide();

        cameraGraphics = p5.createGraphics(CAMERA_CONSTRAINTS.video.width, CAMERA_CONSTRAINTS.video.height);

        shape = p5.createGraphics(400, 400);
        shape.circle(200, 200, 200);

        screenCapture = createDisplayCapture(SCREEN_CONSTRAINTS, p5);
        screenCapture.hide();
    };

    const draw = (p5: p5Types) => {
        // Render screen
        p5.image(screenCapture, 0, 0, p5.width, p5.height);

        // Apply mask on webcam
        p5.imageMode(p5.CENTER);
        cameraGraphics.image(cameraCapture, 0, 0, CAMERA_CONSTRAINTS.video.width, CAMERA_CONSTRAINTS.video.height);
        const cameraFrame = cameraGraphics.get();
        cameraFrame.mask(shape.get());

        // Render masked webcam
        p5.image(cameraFrame, 100, p5.height - 100, 200, 200);
        p5.imageMode(p5.CORNER);
    };

    return (
        <>
            {state === 'idle' && <button onClick={() => setState('record')}>Start recording!</button>}
            {state === 'record' && (
                <div className="tw-flex tw-flex-col">
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
