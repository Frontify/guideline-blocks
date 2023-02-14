/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CAMERA_CONSTRAINTS } from '../constants';

export const bindCameraToVideoElement = async (videoElement: HTMLVideoElement) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play();
                resolve();
            });
        } catch (error) {
            reject('No permission to record the camera.');
        }
    });
};
