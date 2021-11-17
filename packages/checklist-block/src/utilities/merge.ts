/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Cleans and joins an array of inputs with possible undefined or boolean values.
 *
 * @param classNames Array of class names
 * @returns Clean string to be used for class name
 */
export const merge = (classNames: (string | undefined | boolean)[]): string => classNames.filter(Boolean).join(' ');
