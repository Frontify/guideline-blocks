/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColorDummy } from '@frontify/app-bridge';
import { describe, expect, test } from 'vitest';
import { ColorSpaceInputValues } from '../types';
import { mapColorSpaces } from './mapColorSpaces';

describe('mapColorSpaces', () => {
    const data = [
        {
            colorSpaceId: 'hex',
            color: FrontifyColorDummy.red(),
            expected: {
                id: 'hex',
                label: 'HEX',
                value: '#ff0000',
                placeholder: '#hexhex',
            },
        },
        {
            colorSpaceId: 'rgb',
            color: FrontifyColorDummy.red(),
            expected: {
                id: 'rgb',
                label: 'RGB',
                value: '255/0/0',
                placeholder: 'r/g/b',
            },
        },
        {
            colorSpaceId: 'cmyk',
            color: FrontifyColorDummy.red(),
            expected: {
                id: 'cmyk',
                label: 'CMYK',
                value: '0/100/100/0',
                placeholder: 'c/m/y/k',
            },
        },
    ];

    test.each(data)('validates against expected values', ({ colorSpaceId, color, expected }) => {
        expect(mapColorSpaces(colorSpaceId as keyof ColorSpaceInputValues, color)).toStrictEqual(expected);
    });
});
