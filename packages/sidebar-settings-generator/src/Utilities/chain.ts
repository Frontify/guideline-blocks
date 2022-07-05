/* (c) Copyright Frontify Ltd., all rights reserved. */

export const chain =
    <T extends any[]>(...callbacks: (((...args: T) => void) | undefined | false | null)[]) =>
    (...args: T) => {
        for (const callback of callbacks) {
            if (typeof callback === 'function') {
                callback(...args);
            }
        }
    };
