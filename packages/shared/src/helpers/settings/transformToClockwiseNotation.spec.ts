/* (c) Copyright Frontify Ltd., all rights reserved. */

import { transformToClockwiseNotation } from './transformToClockwiseNotation';
import { MultiInputTuple } from './types';

describe('appendUnit', () => {
    test('it should order tuple in CSS clockwise notation', () => {
        const tuple: MultiInputTuple = ['10', '15', '25', '12'];

        const result = transformToClockwiseNotation(tuple);

        const expected = ['10', '25', '12', '15'];

        expect(result).toStrictEqual(expected);
    });
});
