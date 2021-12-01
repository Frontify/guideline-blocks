/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { appendUnit } from './appendUnit';

describe('appendUnit', () => {
    test('it should set correct value with "px" when entering a number', () => {
        const bundle: ApiBundle = {
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
        const bundle: ApiBundle = {
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
        const bundle: ApiBundle = {
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
});
