/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from '@frontify/guideline-blocks-settings';

export const aspectRatioFormatRule: Rule<string> = {
    errorMessage: 'Please use the proper format for the image aspect ratio x:y',
    validate: (value: string) => {
        if (value === 'none') {
            return true;
        }
        const values = value.split(':');

        if (values.filter(Boolean).length !== 2) {
            return false;
        }

        if (isNaN(Number(values[0])) || isNaN(Number(values[1]))) {
            return false;
        }

        return true;
    },
};

export const aspectRatioNumberRule: Rule<string> = {
    errorMessage: 'Please use values greater than 0',
    validate: (value: string) => {
        if (value === 'none') {
            return true;
        }

        const [width, height] = value.split(':').map(Number);

        return width > 0 && height > 0;
    },
};
