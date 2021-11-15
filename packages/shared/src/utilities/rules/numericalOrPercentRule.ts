/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from './types';

export const numericalOrPercentRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without '%'",
    validate: (value: string) => value.match(/^-?(?:\d+)(?:%)?$/g) !== null,
};
