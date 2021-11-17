/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { pxAutocomplete } from './pxAutocomplete';

describe('pxAutocomplete', () => {
    test('it should call setBlockValue with correct string with 20px', () => {
        const bundle = {
            getBlock(settingId: string) {
                return { value: 20 };
            },
            setBlockValue(settingId: string, value: string) {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 'my_setting_id');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should not call setBlockValue', () => {
        const bundle = {
            getBlock(settingId: string) {
                return { value: '20px' };
            },
            setBlockValue(settingId: string, value: string) {},
        };
        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 'my_setting_id');
        expect(setBlockValueSpy).not.toHaveBeenCalledWith('my_setting_id', '20px');
    });
});
