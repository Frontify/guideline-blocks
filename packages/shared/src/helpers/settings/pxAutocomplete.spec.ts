/* (c) Copyright Frontify Ltd., all rights reserved. */

import { pxAutocomplete } from './pxAutocomplete';

describe('pxAutocomplete', () => {
    test('it should call setBlockValue with correct string with 20px', () => {
        const bundle = {
            getBlock(blockId: number) {
                return { value: 20 };
            },
            setBlockValue(blockId: number, value: string) {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 1);

        expect(setBlockValueSpy).toHaveBeenCalledWith(1, '20px');
    });

    test('it should not call setBlockValue', () => {
        const bundle = {
            getBlock(blockId: number) {
                return { value: '20px' };
            },
            setBlockValue(blockId: number, value: string) {},
        };
        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        pxAutocomplete(bundle, 1);
        expect(setBlockValueSpy).not.toHaveBeenCalledWith(1, '20px');
    });
});
