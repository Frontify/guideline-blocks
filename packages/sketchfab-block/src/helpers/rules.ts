/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isParseableSketchfabUrl } from './url';

export const SKETCHFAB_RULE_ERROR = 'Please enter a valid Sketchfab url';

export const pitchRule = {
    errorMessage: 'Value must be between -π/2 and π/2',
    validate: (value: string) =>
        Boolean(value) && !Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI / 2,
};

export const yawRule = {
    errorMessage: 'Value must be between -π and π',
    validate: (value: string) => Boolean(value) && !Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI,
};

export const sketchfabUrlRule = {
    errorMessage: SKETCHFAB_RULE_ERROR,
    validate: isParseableSketchfabUrl,
};
