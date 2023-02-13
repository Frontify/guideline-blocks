/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'tailwindcss/tailwind.css';

import { CAMERA_CONSTRAINTS, SCREEN_CONSTRAINTS } from './constants';
import { createDisplayCapture } from './utils';

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
    let screenGraphics: p5Types.Graphics;

    let shape: p5Types.Graphics;

    let screenRatio = 1;

    const [state, setState] = useState<'idle' | 'record'>('idle');

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        screenRatio = SCREEN_CONSTRAINTS.video.width / canvasParentRef.clientWidth;

        p5.createCanvas(canvasParentRef.clientWidth, SCREEN_CONSTRAINTS.video.height / screenRatio).parent(
            canvasParentRef
        );

        cameraCapture = p5.createCapture(CAMERA_CONSTRAINTS);
        cameraCapture.hide();

        cameraGraphics = p5.createGraphics(CAMERA_CONSTRAINTS.video.width, CAMERA_CONSTRAINTS.video.height);

        shape = p5.createGraphics(400, 400);
        shape.circle(200, 200, 200);

        screenCapture = createDisplayCapture(SCREEN_CONSTRAINTS, p5);
        screenCapture.hide();

        screenGraphics = p5.createGraphics(SCREEN_CONSTRAINTS.video.width, SCREEN_CONSTRAINTS.video.height);
    };

    const draw = (p5: p5Types) => {
        // Render screen
        screenGraphics.image(screenCapture, 0, 0, SCREEN_CONSTRAINTS.video.width, SCREEN_CONSTRAINTS.video.height);
        const screenFrame = screenGraphics.get();
        p5.image(screenFrame, 0, 0, p5.width, p5.height);

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
            {state === 'idle' && <button onClick={() => setState('record')}>Go to record</button>}
            {state === 'record' && <Sketch setup={setup} draw={draw} />}
        </>
    );
};
