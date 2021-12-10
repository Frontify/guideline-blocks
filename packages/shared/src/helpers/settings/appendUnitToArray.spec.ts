/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { appendUnitToArray } from './appendUnitToArray';

describe('appendUnitToArray', () => {
    test('it should set correct value with "px" when entering a number', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: [20, 40] };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');

        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', ['20px', '40px']);
    });

    test('it should set correct value with "%" when entering a number', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: [40, 20] };
            },
            setBlockValue: jest.fn(),
        };

        appendUnitToArray(bundle, 'my_setting_id', '%');

        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', ['40%', '20%']);
    });

    test('it should not call setBlockValue when entering a non-array', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: '20px' };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).not.toHaveBeenCalled();
    });

    test('it should not change the value when it already has unit', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: ['20px', '40px'] };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', ['20px', '40px']);
    });

    test('it should handle undefined', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: [undefined, '40px'] };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', [undefined, '40px']);
    });

    test('it should handle empty string', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: ['', '40px'] };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', ['', '40px']);
    });

    test('it should handle mixed values with and without units', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: ['20', '40px', 85] };
            },
            setBlockValue: jest.fn(),
        };
        appendUnitToArray(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).toHaveBeenCalledWith('my_setting_id', ['20px', '40px', '85px']);
    });
});
