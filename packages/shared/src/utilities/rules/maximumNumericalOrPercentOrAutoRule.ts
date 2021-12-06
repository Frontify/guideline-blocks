/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPercentRule } from './numericalOrPercentRule';
import { Rule } from './types';

export const maximumNumericalOrPercentOrAutoRule = (maximumValue: number, includeAuto = true): Rule<string> => ({
    errorMessage: `Please use a value smaller than ${maximumValue}`,
    validate: (value: string): boolean =>
        (value === 'auto' && includeAuto) ||
        (numericalOrPercentRule.validate(value) && Number(value.replace(/%/, '')) <= maximumValue),
});
