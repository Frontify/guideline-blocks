/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getParsedDependencies = (dependenciesString: string, defaultValue: unknown) => {
    try {
        // oxlint-disable-next-line typescript/no-unsafe-return
        return JSON.parse(dependenciesString);
    } catch {
        return defaultValue;
    }
};
