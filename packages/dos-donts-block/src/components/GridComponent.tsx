/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getGridClassName = (keepSideBySide: boolean, columns: number | string) => {
    const columnIndex = parseInt(columns.toString()) - 1;

    if (keepSideBySide && columns.toString() === '2') {
        return ['tw-grid-cols-1', 'tw-grid-cols-2', 'tw-grid-cols-3', 'tw-grid-cols-4'][columnIndex];
    }

    return [
        'tw-grid-cols-1',
        '@sm:tw-grid-cols-2',
        '@md:tw-grid-cols-3 @sm:tw-grid-cols-2',
        '@md:tw-grid-cols-4 @sm:tw-grid-cols-3 @xs:tw-grid-cols-2',
    ][columnIndex];
};
