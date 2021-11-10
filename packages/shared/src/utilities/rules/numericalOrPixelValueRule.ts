/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from './types';

/**
 * Rule to validate value is a number or a number string with "px".
 */
export const numericalOrPixelValueRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px'",
    validate: (value: string) => value.match(/^(?:-?\d+)(?:px)?$/g) !== null,
};
