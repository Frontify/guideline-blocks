/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSketchfabUrl } from './url';

export const SKETCHFAB_RULE_ERROR = 'Please enter a valid Sketchfab url';

export const minimumNumericalRule = (min: number) => ({
    errorMessage: `Value must be larger than ${min}`,
    validate: (value: string) => !Number.isNaN(Number(value)) && Number(value) >= min,
});

export const maximumNumericalRule = (max: number) => ({
    errorMessage: `Value must be smaller than or equal to ${max}`,
    validate: (value: string) => !Number.isNaN(Number(value)) && Number(value) <= max,
});

export const pitchRule = {
    errorMessage: 'Value must be between -π/2 and π/2',
    validate: (value: string) => !value || (!Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI / 2),
};

export const yawRule = {
    errorMessage: 'Value must be between -π and π',
    validate: (value: string) => !value || (!Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI),
};

export const sketchfabUrlRule = {
    errorMessage: SKETCHFAB_RULE_ERROR,
    validate: isSketchfabUrl,
};
