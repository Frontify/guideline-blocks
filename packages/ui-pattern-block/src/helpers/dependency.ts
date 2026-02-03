/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getParsedDependencies = (dependenciesString: string, defaultValue: unknown) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(dependenciesString);
    } catch {
        return defaultValue;
    }
};
