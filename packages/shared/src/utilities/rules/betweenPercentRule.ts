/* (c) Copyright Frontify Ltd., all rights reserved. */

import { maximumNumericalOrPercentOrAutoRule, minimumNumericalOrPercentOrAutoRule } from '.';
import { Rule } from './types';

/**
 * Rule to validate value is between two percent values.
 *
 * @param {number} minimumValue Minimum value
 * @param {number} maximumValue Maximum value
 * @returns {Rule} Rule object with validator and error message.
 */
export const betweenPercentRule = (minimumValue: number, maximumValue: number): Rule<string> => ({
    errorMessage: `This value is a percentage in order to make it responsive - please use a value between ${minimumValue} and ${maximumValue}.`,
    validate: (value: string): boolean =>
        minimumNumericalOrPercentOrAutoRule(minimumValue, false).validate(value) &&
        maximumNumericalOrPercentOrAutoRule(maximumValue, false).validate(value),
});
