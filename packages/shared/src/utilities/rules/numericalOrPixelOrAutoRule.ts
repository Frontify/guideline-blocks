/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from '@frontify/guideline-blocks-settings';

export const numericalOrPixelOrAutoRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px' or 'auto'",
    validate: (value: string) => value.match(/^-?(?:\d+)(?:px)?$|^auto$/g) !== null,
};
