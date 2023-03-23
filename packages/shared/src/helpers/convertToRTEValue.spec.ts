/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { TextStyles } from '@frontify/fondue';
import { describe, expect, test } from 'vitest';
import { convertToRTEValue } from './convertToRTEValue';

describe('String converted to Richtext value', () => {
    test('It should return RTE value with corret textStyle', () => {
        const text = 'with text';
        const result = convertToRTEValue(text, 'p' as TextStyles);
        expect(result).toBe('[{"type":"p","children":[{"text":"with text"}]}]');
    });

    test('It should return RTE value with corret textStyle', () => {
        const text = 'Heading 1';
        const result = convertToRTEValue(text, 'heading1' as TextStyles);
        expect(result).toBe('[{"type":"heading1","children":[{"text":"Heading 1"}]}]');
    });

    test('It should return RTE value with corret textStyle and alignment', () => {
        const text = 'text';
        const result = convertToRTEValue(text, 'p' as TextStyles, 'center');
        expect(result).toBe('[{"type":"p","children":[{"text":"text"}],"align":"center"}]');
    });

    test('It value is RTE value, it returns the RTE Value', () => {
        const text =
            '[{"type":"heading1","children":[{"text":"Hoi","bold":true,"underline":true}]},{"type":"heading1","children":[{"bold":true,"underline":true,"text":" "}]},{"type":"heading1","children":[{"text":"With Text"}]},{"type":"custom2","children":[{"text":""}]}]';
        const result = convertToRTEValue(text, 'p' as TextStyles);
        expect(result).toBe(text);
    });
});
