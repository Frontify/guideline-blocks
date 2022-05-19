/* (c) Copyright Frontify Ltd., all rights reserved. */

export const minimumNumericalRule = (min: number) => ({
    errorMessage: `Value must be larger than ${min}`,
    validate: (value: string) => !Number.isNaN(Number(value)) && Number(value) >= min,
});
