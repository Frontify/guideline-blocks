/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getParsedDependencies = (dependenciesString: string, defaultValue: unknown) => {
    try {
        return JSON.parse(dependenciesString);
    } catch {
        return defaultValue;
    }
};
