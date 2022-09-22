/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColorDummy } from '@frontify/app-bridge';
import { describe, expect, test } from 'vitest';
import { getRgbaColorValue } from './getRgbaColorValue';

describe('getRgbaColorValue', () => {
    const data = [
        {
            color: FrontifyColorDummy.red(),
            expected: 'rgba(255, 0, 0, 1)',
        },
        {
            color: FrontifyColorDummy.green(),
            expected: 'rgba(0, 255, 0, 1)',
        },
        {
            color: FrontifyColorDummy.yellow(),
            expected: 'rgba(255, 255, 0, 1)',
        },
    ];

    test.each(data)('validates against expected values', ({ color, expected }) => {
        expect(getRgbaColorValue(color)).toStrictEqual(expected);
    });
});
