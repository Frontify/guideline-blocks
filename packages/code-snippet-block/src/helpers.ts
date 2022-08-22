/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isPxSuffixMissing = (value: string) => !value.includes('px'); // TODO: remove isPxSuffixMissing - use appendUnit after fix

export const appendPxSuffix = (value: string): `${string}px` => `${value}px`; // TODO: remove appendPxSuffix - use appendUnit after fix

// TODO: remove getValueInPx - use appendUnit after fix
export const getValueInPx = (value?: string) => {
    let result = value;
    if (value && isPxSuffixMissing(value)) {
        result = appendPxSuffix(value);
    }
    return result;
};
