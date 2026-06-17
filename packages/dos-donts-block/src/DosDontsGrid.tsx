/* (c) Copyright Frontify Ltd., all rights reserved. */

const DEFAULT_COLUMNS = 2;

export const getGridClassName = (keepSideBySide?: boolean, columns?: number | string) => {
    const columnValue = columns ?? DEFAULT_COLUMNS;
    const columnIndex = parseInt(columnValue.toString(), 10) - 1;

    if (keepSideBySide && columnValue.toString() === '2') {
        return ['tw-grid-cols-1', 'tw-grid-cols-2', 'tw-grid-cols-3', 'tw-grid-cols-4'][columnIndex];
    }

    return [
        'tw-grid-cols-1',
        '@sm:tw-grid-cols-2',
        '@md:tw-grid-cols-3 @sm:tw-grid-cols-2',
        '@md:tw-grid-cols-4 @sm:tw-grid-cols-3 @xs:tw-grid-cols-2',
    ][columnIndex];
};
