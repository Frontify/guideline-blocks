/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BlockSettings } from '@frontify/guideline-blocks-settings';

export const settings: BlockSettings = {
    main: [
        {
            type: 'switch',
            defaultValue: false,
            id: 'withFontFileFormat',
            label: 'Font File Format',
            info: 'Show the labels for which font file formats are included in the font kit',
        },
        {
            type: 'switch',
            id: 'withFontStyles',
            defaultValue: false,
            label: 'Font Styles',
            info: 'Show the label for the number of font styles of each font type',
        },
        {
            type: 'switch',
            id: 'withExampleText',
            defaultValue: false,
            label: 'Example Text',
            info: 'Show example text for each font included in the font kit ',
            on: [
                {
                    id: 'exampleText',
                    type: 'input',
                    defaultValue: 'Aa Bb Cc',
                    rules: [
                        {
                            errorMessage: 'Can not be empty',
                            validate: (value: string) => +value.length > 0,
                        },
                    ],
                },
            ],
            off: [],
        },
    ],
};
