/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, RefObject, useEffect, useRef } from 'react';

import { CameraSize, VideoMode } from '../types';
import { bindFrameToCanvas, bindMicrophoneToAudioElement, drawAudioRipple } from '../utilities';

type AvatarCameraProps = {
    size: CameraSize;
    microphoneDeviceId?: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    rippleRef: RefObject<HTMLCanvasElement>;
    microphoneRef: RefObject<HTMLVideoElement>;
    onDevicePermissionDenied: () => void;
    imageUrl: string;
    videoOptions: {
        videoMode: VideoMode;
        backgroundAssetUrl?: string;
        maxWidth?: number;
    };
};

export const AvatarCamera = ({
    microphoneDeviceId,
    size,
    canvasRef,
    rippleRef,
    microphoneRef,
    onDevicePermissionDenied,
    videoOptions,
    imageUrl,
}: AvatarCameraProps): ReactElement => {
    const tmpCanvasElement = useRef(null);

    useEffect(() => {
        const audioElement = microphoneRef.current;
        const canvasAbortController = new AbortController();

        const bindElements = async () => {
            if (audioElement && canvasRef.current && tmpCanvasElement.current) {
                try {
                    const frame = await new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image(canvasRef.current?.width, canvasRef.current?.height);
                        img.crossOrigin = 'anonymous';
                        img.src = imageUrl;
                        img.addEventListener('load', () => resolve(img));
                    });

                    await bindMicrophoneToAudioElement(audioElement, microphoneDeviceId);
                    await bindFrameToCanvas(
                        frame,
                        canvasRef.current,
                        tmpCanvasElement.current,
                        size,
                        videoOptions,
                        canvasAbortController.signal
                    );

                    if (rippleRef.current) {
                        await drawAudioRipple(audioElement, rippleRef.current);
                    }
                } catch {
                    onDevicePermissionDenied();
                }
            }
        };

        bindElements();

        return () => {
            canvasAbortController.abort();
            for (const track of (audioElement?.srcObject as MediaStream).getTracks()) {
                track.stop();
            }
        };
    }, [
        size,
        microphoneDeviceId,
        canvasRef,
        rippleRef,
        onDevicePermissionDenied,
        microphoneRef,
        videoOptions,
        imageUrl,
    ]);

    return (
        <>
            <canvas ref={canvasRef} className="tw-transition-all"></canvas>
            <canvas ref={tmpCanvasElement} className="tw-hidden"></canvas>
            <audio ref={microphoneRef} className="tw-hidden" muted></audio>
        </>
    );
};
