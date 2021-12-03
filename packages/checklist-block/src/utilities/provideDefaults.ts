/* eslint-disable @typescript-eslint/ban-ts-comment */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings } from '../types';

export const provideDefaults = (defaultObject: Settings, overrider: Partial<Settings>): Settings => {
    const arrayReplacer = (property: keyof Settings) => {
        //TODO: Fix this types
        //@ts-ignore
        return defaultObject[property].reduce((acc: any, item: any, index: number) => {
            //@ts-ignore
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
