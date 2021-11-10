/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from "./types";

export const numericalPixelValueRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px'",
    validate: (value: string) => value.match(/^(?:-?\d+)(?:px)?$/g) !== null,
};
