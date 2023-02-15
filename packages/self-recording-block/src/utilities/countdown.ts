/* (c) Copyright Frontify Ltd., all rights reserved. */

export class Countdown {
    timerId = 0;
    currentCount: number;

    constructor(countInSeconds: number) {
        if (countInSeconds < 0) {
            throw new Error('Timer needs to be >= 0 seconds.');
        }

        this.currentCount = countInSeconds;
    }

    init(done: () => void, step: (countInSecondsLeft: number) => void) {
        this.timerId = setInterval(() => {
            if (this.currentCount < 0) {
                done();
                this.stop();
            } else {
                // this.beep();
                step(this.currentCount);
                this.currentCount--;
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
    }
}
