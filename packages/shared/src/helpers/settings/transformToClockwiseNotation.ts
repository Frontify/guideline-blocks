/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputTuple } from './types';
/**
 * Transforms tuple of size 4 to CSS clockwise notation
 *
 * @param {MultiInputTuple} tuple multiInput settings block value
 * @returns {MultiInputTuple} tuple in CSS clockwise notation order
 */
export const transformToClockwiseNotation = (tuple: MultiInputTuple): MultiInputTuple => [
    tuple[0],
    tuple[2],
    tuple[3],
    tuple[1],
];
