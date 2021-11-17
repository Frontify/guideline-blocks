import { Settings } from '../types';

export const provideDefaults = (defaultObject: Settings, overrider: Settings): Settings => ({
    ...defaultObject,
    ...overrider,
});
