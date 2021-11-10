/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from "./types";

export const betweenPixelValues = (minimumValue: number, maximumValue: number): Rule<string> => ({
    errorMessage: `Please use a value between ${minimumValue} and ${maximumValue}.`,
    validate: (value: string): boolean =>
        Number(value.replace(/px/, '')) >= minimumValue && Number(value.replace(/px/, '')) <= maximumValue,
});
