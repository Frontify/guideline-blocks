/* (c) Copyright Frontify Ltd., all rights reserved. */

import { drawAudioSpectrum } from './drawAudioSpectrum';

export const bindAudioToCanvas = (audioElement: HTMLAudioElement, canvasElement: HTMLCanvasElement) => {
    const ctx = canvasElement.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get the canvas context.');
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    const stream = audioElement.srcObject as MediaStream | null;

    if (!stream) {
        throw new Error('No stream');
    }

    const audioContext = new AudioContext();
    const audioStream = audioContext.createMediaStreamSource(stream);
    const audioAnalyser = audioContext.createAnalyser();
    audioStream.connect(audioAnalyser);

    gradient.addColorStop(1, '#b0452a');
    gradient.addColorStop(0.75, '#b0452a');
    gradient.addColorStop(0.5, '#b0642a');
    gradient.addColorStop(0.25, '#b0642a');
    gradient.addColorStop(0, '#b07f2a');

    ctx.fillStyle = gradient;

    const step = () => {
        drawAudioSpectrum(audioAnalyser, ctx);
        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};
