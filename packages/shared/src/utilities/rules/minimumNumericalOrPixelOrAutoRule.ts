/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPixelRule } from './numericalOrPixelRule';
import { Rule } from './types';

export const minimumNumericalOrPixelOrAutoRule = (minimumValue: number): Rule<string> => ({
    errorMessage: `Please use a value bigger or than ${minimumValue}`,
    validate: (value: string): boolean =>
        value === 'auto' || (numericalOrPixelRule.validate(value) && Number(value.replace(/px/, '')) >= minimumValue),
});
