/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle, ApiField } from '@frontify/guideline-blocks-settings';
import { presetCustomArrayValue } from './presetCustomArrayValue';

const exampleMap: Record<string, string> = {
    small: '10px',
    medium: '20px',
    large: '30px',
};

describe('presetCustomValue', () => {
    test('it should set predefined value of array to custom size input', () => {
        const SLIDER_ID = 'sliderId';
        const INPUT_ID = 'inputId';

        const bundle: ApiBundle = {
            getBlock(id): ApiField | null {
                if (id === SLIDER_ID) {
                    return { value: 'large' };
                } else if (id === INPUT_ID) {
                    return { value: null };
                }
                return null;
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        presetCustomArrayValue(bundle, SLIDER_ID, INPUT_ID, exampleMap, 4);

        expect(setBlockValueSpy).toHaveBeenCalledWith(INPUT_ID, ['30px', '30px', '30px', '30px']);
    });

    test('it should not call setBlockValue if a custom array is defined and all are not equal', () => {
        const SLIDER_ID = 'sliderId';
        const INPUT_ID = 'inputId';

        const bundle: ApiBundle = {
            getBlock(id): ApiField | null {
                if (id === SLIDER_ID) {
                    return { value: 'small' };
                } else if (id === INPUT_ID) {
                    return { value: ['30px', '30px', '', '30px'] };
                }
                return null;
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = jest.spyOn(bundle, 'setBlockValue');
        presetCustomArrayValue(bundle, SLIDER_ID, INPUT_ID, exampleMap, 4);

        expect(setBlockValueSpy).not.toHaveBeenCalled();
    });
});
