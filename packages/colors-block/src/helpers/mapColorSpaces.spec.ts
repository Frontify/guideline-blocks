/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorDummy } from '@frontify/app-bridge';
import { describe, expect, test } from 'vitest';
import { ColorSpaceLabels, ColorSpaceValues } from '../types';
import { mapColorSpaces } from './mapColorSpaces';

describe('mapColorSpaces', () => {
    const data = [
        {
            colorSpaceId: 'hex',
            color: ColorDummy.red(),
            expected: {
                id: 'hex',
                label: ColorSpaceLabels.Hex,
                value: '#ff0000',
                placeholder: '#hexhex',
            },
        },
        {
            colorSpaceId: 'rgb',
            color: ColorDummy.red(),
            expected: {
                id: 'rgb',
                label: ColorSpaceLabels.Rgb,
                value: '255/0/0',
                placeholder: 'r/g/b',
            },
        },
        {
            colorSpaceId: 'cmyk',
            color: ColorDummy.red(),
            expected: {
                id: 'cmyk',
                label: ColorSpaceLabels.Cmyk,
                value: '0/100/100/0',
                placeholder: 'c/m/y/k',
            },
        },
    ];

    test.each(data)('validates against expected values', ({ colorSpaceId, color, expected }) => {
        expect(mapColorSpaces(colorSpaceId as keyof ColorSpaceValues, color)).toStrictEqual(expected);
    });
});
