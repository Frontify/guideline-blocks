/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { hasRichTextValue } from './hasRichTextValue';

//test more cases
describe('Richtext has value', () => {
    // Check if richtext has value
    test('It should return true if Richtext has value', () => {
        const text = '[{"type":"p","children":[{"text":"with text"}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeTruthy();
    });
    test('It should return true if Richtext has value', () => {
        const text =
            '[{"type":"heading1","children":[{"text":"Hoi","bold":true,"underline":true}]},{"type":"heading1","children":[{"bold":true,"underline":true,"text":" "}]},{"type":"heading1","children":[{"text":"With Text"}]},{"type":"custom2","children":[{"text":""}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeTruthy();
    });
    test('If value has a space it should return true', () => {
        const text = '[{"type":"p","children":[{"text":" "}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeTruthy();
    });
    // Check if richtext has no value
    test('It should return false if RTE is empty', () => {
        const text = '[{"type":"p","children":[{"text":""}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeFalsy();
    });
    test('It should return false if RTE is empty 2.0', () => {
        const text = '[{"type":"heading1","children":[{"text":"","bold":true,"underline":true}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeFalsy();
    });
    test('It should return false if value is an invalid json', () => {
        const text = 'abcd';
        const result = hasRichTextValue(text);
        expect(result).toBeFalsy();
    });
    test('It should return false if RTE has only new lines', () => {
        const text =
            '[{"type":"quote","children":[{"text":""}]},{"type":"quote","children":[{"text":""}]},{"type":"quote","children":[{"text":""}]},{"type":"quote","children":[{"text":""}]},{"type":"quote","children":[{"text":""}]}]';
        const result = hasRichTextValue(text);
        expect(result).toBeFalsy();
    });
    test('empty value should return false', () => {
        const text = '';
        const result = hasRichTextValue(text);
        expect(result).toBeFalsy();
    });
    test('undefined text value should return false', () => {
        const result = hasRichTextValue(undefined);
        expect(result).toBeFalsy();
    });
});
