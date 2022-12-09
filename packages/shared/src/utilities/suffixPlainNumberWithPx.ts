/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * If the passed string is a number, it will be suffixed with a "px".
 * Otherise the original value will be returned.
 *
 * @param {string} value to be converted
 * @returns {string} the value with a px suffix or the original value
 */
export const suffixPlainNumberWithPx = (value: string): string => {
    if (!value) {
        return '0px';
    }

    return /^\d+$/.test(value) ? `${value}px` : value;
};
