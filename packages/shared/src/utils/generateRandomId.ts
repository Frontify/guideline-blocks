/* (c) Copyright Frontify Ltd., all rights reserved. */

export const generateRandomId = (): string => {
    return `id-${generateRandomNumberId()}`;
};

const generateRandomNumberId = (): number => {
    return Number(crypto.getRandomValues(new Uint32Array(1)).join(''));
};
