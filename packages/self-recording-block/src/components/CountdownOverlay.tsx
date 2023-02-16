/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useEffect, useState } from 'react';

type CountdownOverlayProps = {
    timeLimit: number;
    children: ReactNode;
    enabled: boolean;
    onCountdownFinished: () => void;
};

const beep = (oscillator: OscillatorNode, destination: AudioDestinationNode, duration: number) => {
    oscillator.connect(destination);
    setTimeout(() => {
        oscillator.disconnect(destination);
    }, duration);
};

export const CountdownOverlay = ({
    timeLimit,
    children,
    enabled,
    onCountdownFinished,
}: CountdownOverlayProps): ReactElement => {
    const [timeRemaining, setTimeRemaining] = useState<number>(timeLimit);

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.start();

    useEffect(() => {
        if (timeRemaining > 0 && enabled) {
            const intervalId = setInterval(() => {
                beep(oscillator, audioContext.destination, 150);
                setTimeRemaining((previousTime) => previousTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }

        if (timeRemaining === 0 && enabled) {
            onCountdownFinished();
            setTimeRemaining(timeLimit);
        }

        return;
    }, [timeRemaining, onCountdownFinished, enabled, oscillator, audioContext.destination, timeLimit]);

    return (
        <div>
            {enabled && timeRemaining > 0 && (
                <div className="tw-absolute tw-inset-0 tw-bg-black/[.4] tw-flex tw-items-center tw-justify-center">
                    <span className="tw-text-white tw-text-7xl">{timeRemaining}</span>
                </div>
            )}
            {children}
        </div>
    );
};
