/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MICROPHONE_CONSTRAINTS } from '../constants';

export const bindMicrophoneToAudioElement = async (audioElement: HTMLAudioElement, microphoneDeviceId?: string) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            audioElement.srcObject = await navigator.mediaDevices.getUserMedia({
                ...MICROPHONE_CONSTRAINTS,
                audio: { ...MICROPHONE_CONSTRAINTS, deviceId: microphoneDeviceId },
            });

            audioElement.addEventListener('loadedmetadata', () => {
                audioElement.play();
                resolve();
            });
        } catch (error) {
            reject('No permission to record the microphone.');
        }
    });
};
