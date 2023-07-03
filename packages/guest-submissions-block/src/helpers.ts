/* (c) Copyright Frontify Ltd., all rights reserved. */

export const pluralize = (count: number, singular: string, plural: string) => (count === 1 ? singular : plural);
export const pluralizeFile = (count: number) => pluralize(count, 'file', 'files');
