/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, RefObject, useEffect, useRef } from 'react';

import { cameraSizeToScaleMap } from '../constants';
import { CameraSize, VideoMode } from '../types';
import { bindCameraToVideoElement, bindVideoToCanvas } from '../utilities';

type CameraProps = {
    size: CameraSize;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<HTMLVideoElement>;
    onDevicePermissionDenied: () => void;
    videoOptions: {
        videoMode: VideoMode;
        backgroundAssetUrl?: string;
    };
};

export const Camera = ({
    cameraDeviceId,
    microphoneDeviceId,
    size,
    canvasRef,
    cameraRef,
    onDevicePermissionDenied,
    videoOptions,
}: CameraProps): ReactElement => {
    const tmpCanvasElement = useRef(null);
    useEffect(() => {
        const canvasAbortController = new AbortController();
        const bindElements = async () => {
            if (cameraRef.current && canvasRef.current && tmpCanvasElement.current) {
                try {
                    await bindCameraToVideoElement(cameraRef.current, cameraDeviceId, microphoneDeviceId);
                    await bindVideoToCanvas(
                        cameraRef.current,
                        canvasRef.current,
                        tmpCanvasElement.current,
                        cameraSizeToScaleMap[size],
                        videoOptions,
                        canvasAbortController.signal
                    );
                } catch {
                    onDevicePermissionDenied();
                }
            }
        };

        bindElements();

        return () => {
            canvasAbortController.abort();
        };
    }, [size, cameraDeviceId, microphoneDeviceId, canvasRef, onDevicePermissionDenied, cameraRef, videoOptions]);

    return (
        <>
            <canvas ref={canvasRef} className="tw-transition-all"></canvas>
            <canvas ref={tmpCanvasElement} className="tw-hidden"></canvas>
            <video ref={cameraRef} className="tw-hidden" muted></video>
        </>
    );
};
