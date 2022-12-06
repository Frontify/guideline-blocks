/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * parses the passed value to an integer if possible.
 * returns the original value if not possible.
 *
 * @param {string} value the value to be parsed
 * @returns {Number | string} the parsed value or the original value
 */
export const parseIntIfPossible = (value: string): number | string => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? value : parsed;
};
