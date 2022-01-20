/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPercentRule } from './numericalOrPercentRule';
import { Rule } from '@frontify/guideline-blocks-settings';

export const minimumNumericalOrPercentRule = (minimumValue: number): Rule<string> => ({
    errorMessage: `Please use a value bigger or than ${minimumValue}`,
    validate: (value: string): boolean =>
        numericalOrPercentRule.validate(value) && Number(value.replace(/%/, '')) >= minimumValue,
});
