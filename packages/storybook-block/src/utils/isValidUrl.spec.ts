/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { isValidStorybookUrl } from './isValidStorybookUrl';

describe('isValidStorybookUrl', () => {
    test('It should be valid with a storybook url', () => {
        const result = isValidStorybookUrl(
            'https://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu'
        );
        expect(result).toBeTruthy();
    });
    test('It should be valid if empty', () => {
        const result = isValidStorybookUrl('');
        expect(result).toBeTruthy();
    });
    test('It should be valid if it contains a path param', () => {
        const result = isValidStorybookUrl('?path=my_path');
        expect(result).toBeTruthy();
    });
    test("It should be invalid if it doens't contain an url parameter", () => {
        const result = isValidStorybookUrl('https://fondue-components.frontify.com/');
        expect(result).toBeFalsy();
    });
    test("It should be invalid if it doesn't include path", () => {
        const result = isValidStorybookUrl('?anything=foo');
        expect(result).toBeFalsy();
    });
    test('It should be invalid if none matches', () => {
        const result = isValidStorybookUrl('www.google.ch');
        expect(result).toBeFalsy();
    });
});
