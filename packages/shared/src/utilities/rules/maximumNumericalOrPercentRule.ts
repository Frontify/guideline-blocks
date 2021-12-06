/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPercentRule } from './numericalOrPercentRule';
import { Rule } from './types';

export const maximumNumericalOrPercentRule = (maximumValue: number): Rule<string> => ({
    errorMessage: `Please use a value smaller than ${maximumValue}`,
    validate: (value: string): boolean =>
        numericalOrPercentRule.validate(value) && Number(value.replace(/%/, '')) <= maximumValue,
});
