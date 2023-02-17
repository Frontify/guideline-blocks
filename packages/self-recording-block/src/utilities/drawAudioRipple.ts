/* (c) Copyright Frontify Ltd., all rights reserved. */

export const drawAudioRipple = async (audioElement: HTMLAudioElement, rippleElement: HTMLCanvasElement) => {
    const ctx = rippleElement.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get the canvas context.');
    }

    const stream = audioElement.srcObject as MediaStream | null;

    if (!stream) {
        throw new Error('No stream');
    }

    const audioContext = new AudioContext();
    const audioStream = audioContext.createMediaStreamSource(stream);
    const audioAnalyser = audioContext.createAnalyser();
    audioStream.connect(audioAnalyser);

    let direction = 1;

    const step = async () => {
        direction = animateRipple(audioAnalyser, ctx, direction, 5, 20);
        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

const animateRipple = (
    analyser: AnalyserNode,
    ctx: CanvasRenderingContext2D,
    direction: number,
    minRadius: number,
    maxRadius: number
): number => {
    const frequency = new Uint8Array(analyser.frequencyBinCount);
    analyser.fftSize = 32;
    analyser.getByteFrequencyData(frequency);

    const calc = frequency.filter((value, index) => (index % 4 === 0 ? value : false));
    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();

    for (let index = 0; index < calc.length; index++) {
        const minRadiusOrCalc = calc[index] < minRadius ? minRadius : calc[index];
        const radius = calc[index] > maxRadius ? maxRadius : minRadiusOrCalc;

        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius + direction, 0, 2 * Math.PI);
        ctx.fillStyle = '#efefef';
        ctx.stroke();
        ctx.strokeStyle = '#fefefe';
        ctx.closePath();
        ctx.fill();

        direction = radius === maxRadius ? 1 : direction;
        direction = radius === minRadius ? -1 : direction;
    }

    return direction;
};
