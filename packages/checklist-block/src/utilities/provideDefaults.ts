import { Settings } from '../types';

export const provideDefaults = (defaultObject: Settings, overrider: Settings): Settings => {
    const newObj = {
        ...defaultObject,
        ...overrider,
        strikethroughMultiInput: defaultObject.strikethroughMultiInput.reduce((acc, item, index) => {
            return [...acc, overrider.strikethroughMultiInput[index] || item];
        }, []),
    };
    return newObj;
};
