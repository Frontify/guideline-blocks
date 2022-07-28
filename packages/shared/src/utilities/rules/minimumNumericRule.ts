/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from '@frontify/guideline-blocks-settings';

export const minimumNumericRule = (minimumValue: number): Rule<string> => ({
    errorMessage: `Please use a value bigger or equal ${minimumValue}`,
    validate: (value: string): boolean => {
        return Number(value.replace(/px|%$/, '')) >= minimumValue;
    },
});
