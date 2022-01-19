/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPercentRule } from './numericalOrPercentRule';
import { Rule } from '@frontify/guideline-blocks-settings';

export const minimumNumericalOrPercentOrAutoRule = (minimumValue: number): Rule<string> => ({
    errorMessage: `Please use a value bigger or equal to ${minimumValue}`,
    validate: (value: string): boolean =>
        value === 'auto' || (numericalOrPercentRule.validate(value) && Number(value.replace(/%/, '')) >= minimumValue),
});
