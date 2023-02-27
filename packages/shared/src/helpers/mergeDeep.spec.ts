/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { mergeDeep } from './mergeDeep';

describe('mergeDeep', () => {
    test('should overwrite value for same key', () => {
        expect(
            mergeDeep(
                {
                    heading1: {
                        fontFamily: 'inherit',
                    },
                    heading2: {
                        fontFamily: 'inherit',
                    },
                },
                {
                    heading1: {
                        fontFamily: 'Arial',
                        fontSize: '12px',
                    },
                    heading2: {
                        fontFamily: 'Verdana',
                    },
                }
            )
        ).toEqual({
            heading1: {
                fontFamily: 'Arial',
                fontSize: '12px',
            },
            heading2: {
                fontFamily: 'Verdana',
            },
        });
    });

    test('should overwrite value for same key on nested object', () => {
        expect(mergeDeep({ a: { a: 1 } }, { a: { a: 'overwritten', b: 2 } })).toEqual({
            a: { a: 'overwritten', b: 2 },
        });
    });

    test('should overwrite value for same key on nested object', () => {
        expect(
            mergeDeep(
                { image: 'pipapo', content: { text: 'hello!' } },
                { image: 'blubb', asdf: 'asdf', content: { text: 'hello?' } }
            )
        ).toEqual({
            image: 'blubb',
            asdf: 'asdf',
            content: { text: 'hello?' },
        });
    });

    test('should return object if two objects', () => {
        expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    test('should merge one level nested object', () => {
        expect(mergeDeep({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
    });

    test('should merge two level nested object', () => {
        expect(mergeDeep({ a: { b: { c: 2 } } }, { a: { d: 3 } })).toEqual({
            a: { b: { c: 2 }, d: 3 },
        });
    });
});
