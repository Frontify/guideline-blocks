/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings } from '../types';

export const provideDefaults = (defaultObject: Settings, overrider: Partial<Settings>): Settings => {
    const arrayReplacer = (property: string) => {
        return defaultObject[property].reduce((acc: unknown[], item: unknown, index: number) => {
            return [...acc, overrider[property]?.[index] || item];
        }, []);
    };

    const newObj = {
        ...defaultObject,
        ...overrider,
        paddingCustom: arrayReplacer('paddingCustom'),
        strikethroughMultiInput: arrayReplacer('strikethroughMultiInput'),
    };
    return newObj;
};
