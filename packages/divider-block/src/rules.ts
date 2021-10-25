/* (c) Copyright Frontify Ltd., all rights reserved. */

type Rule<T> = {
    errorMessage: string;
    validate: (value: T) => boolean;
};

export const numericalPixelValueRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px'",
    validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
};

export const numericalPixelValueOrAutoRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px' or 'auto'",
    validate: (value: string) => value.match(/^(?:\d+)(?:px)?$|^auto$/g) !== null,
};

export const minimumNumericalPixelValueOrAuto = (minimumValue: number): Rule<string> => ({
    errorMessage: `Please use a value bigger or than ${minimumValue}`,
    validate: (value: string): boolean => value === 'auto' || Number(value.replace(/px/, '')) >= minimumValue,
});

export const maximumNumericalPixelValueOrAuto = (maximumValue: number): Rule<string> => ({
    errorMessage: `Please use a value smaller than ${maximumValue}`,
    validate: (value: string): boolean => value === 'auto' || Number(value.replace(/px/, '')) <= maximumValue,
});
