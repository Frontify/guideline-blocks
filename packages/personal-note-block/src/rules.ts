/* (c) Copyright Frontify Ltd., all rights reserved. */

type Rule<T> = {
    errorMessage: string;
    validate: (value: T) => boolean;
};

export const numericalPixelValueRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px'",
    validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
};
