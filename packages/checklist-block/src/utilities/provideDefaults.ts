import { Settings } from '../types';

export const provideDefaults = (defaultObject: Settings, overrider: Settings): Settings => {
    const arrayReplacer = (property: string) => {
        return defaultObject[property].reduce((acc, item, index) => {
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
