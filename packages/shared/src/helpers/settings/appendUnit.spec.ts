/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';
import { appendUnit } from './appendUnit';

describe('appendUnit', () => {
    test('it should set correct value with "px" when entering a number', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: 20 };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should set correct value with "%" when entering a number', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: 40 };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id', '%');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '40%');
    });

    test('it should not call setBlockValue when entering a px-value', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: '20px' };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };
        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id');
        expect(setBlockValueSpy).not.toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should handle undefined', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: undefined };
            },
            setBlockValue: jest.fn(),
        };
        appendUnit(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).not.toHaveBeenCalled();
    });

    test('it should handle empty string', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: '' };
            },
            setBlockValue: jest.fn(),
        };
        appendUnit(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).not.toHaveBeenCalled();
    });
});
