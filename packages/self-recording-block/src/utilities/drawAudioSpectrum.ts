/* (c) Copyright Frontify Ltd., all rights reserved. */

import { audioSpectrumSpecs } from '../constants';

export const drawAudioSpectrum = function (analyser: AnalyserNode, ctx: CanvasRenderingContext2D) {
    const meterNum = ctx.canvas.width / (audioSpectrumSpecs.barWidth + audioSpectrumSpecs.barGap);
    const frequency = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(frequency);

    const step = Math.round(frequency.length / meterNum);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < meterNum; i++) {
        ctx.fillRect(
            i * (audioSpectrumSpecs.barWidth + audioSpectrumSpecs.barGap),
            ctx.canvas.height - frequency[i * step] / 2,
            audioSpectrumSpecs.barWidth,
            ctx.canvas.height
        );
    }
};
