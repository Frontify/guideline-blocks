/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, RefObject, useEffect } from 'react';

import { cameraSizeToScaleMap } from '../constants';
import { CameraSize } from '../types';
import { bindCameraToVideoElement, bindVideoToCanvas } from '../utilities';

type CameraProps = {
    size: CameraSize;
    cameraDeviceId?: string;
    microphoneDeviceId?: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<HTMLVideoElement>;
    onDevicePermissionDenied: () => void;
};

export const Camera = ({
    cameraDeviceId,
    microphoneDeviceId,
    size,
    canvasRef,
    cameraRef,
    onDevicePermissionDenied,
}: CameraProps): ReactElement => {
    useEffect(() => {
        const bindElements = async () => {
            if (cameraRef.current && canvasRef.current) {
                try {
                    await bindCameraToVideoElement(cameraRef.current, cameraDeviceId, microphoneDeviceId);
                    bindVideoToCanvas(cameraRef.current, canvasRef.current, cameraSizeToScaleMap[size]);
                } catch {
                    onDevicePermissionDenied();
                }
            }
        };

        bindElements();
    }, [size, cameraDeviceId, microphoneDeviceId, canvasRef, onDevicePermissionDenied, cameraRef]);

    return (
        <>
            <canvas ref={canvasRef}></canvas>
            <video ref={cameraRef} className="tw-hidden" muted></video>
        </>
    );
};
