/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Rule<T> = {
    errorMessage: string;
    validate: (value: T) => boolean;
};

export const numericalPixelValueRule: Rule<string> = {
    errorMessage: "Please use a numerical value with or without 'px'",
    validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
};

export const betweenPixelValue = (minimumValue: number, maximumValue: number): Rule<string> => ({
    errorMessage: `Please use a value between ${minimumValue} and ${maximumValue}.`,
    validate: (value: string): boolean =>
        Number(value.replace(/px/, '')) >= minimumValue && Number(value.replace(/px/, '')) <= maximumValue,
});
