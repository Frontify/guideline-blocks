/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

import { pxAutocomplete } from './pxAutocomplete';

describe('pxAutocomplete', () => {
    test('it should set correct value with "px" when entering a number', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: 20 };
            },
            setBlockValue(): void {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 'my_setting_id');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should not call setBlockValue when entering a px-value', () => {
        const bundle: ApiBundle = {
            getBlock() {
                return { value: '20px' };
            },
            setBlockValue(): void {},
        };
        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 'my_setting_id');
        expect(setBlockValueSpy).not.toHaveBeenCalledWith('my_setting_id', '20px');
    });
});
