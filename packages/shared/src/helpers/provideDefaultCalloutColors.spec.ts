/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { defaultCalloutColors, provideDefaultCalloutColors } from './provideDefaultCalloutColors';

describe('provideDefaultCalloutColors', () => {
    test('it should return default colors', () => {
        const result = provideDefaultCalloutColors({});
        expect(result).toEqual({
            callout: {
                info: defaultCalloutColors.info,
                note: defaultCalloutColors.note,
                tip: defaultCalloutColors.tip,
                warning: defaultCalloutColors.warning,
            },
        });
    });
    test('it should keep color where set', () => {
        const result = provideDefaultCalloutColors({
            callout: {
                info: '#000000',
                tip: '#222222',
            },
        });
        expect(result).toEqual({
            callout: {
                info: '#000000',
                note: defaultCalloutColors.note,
                tip: '#222222',
                warning: defaultCalloutColors.warning,
            },
        });
    });
});
