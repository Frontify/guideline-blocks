/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DEFAULT_COLUMN_NUMBER, GRID_CLASSES } from './constant';

export const getGridClasses = (columnNumber: number): string => {
    if (columnNumber in GRID_CLASSES) {
        return GRID_CLASSES[columnNumber];
    }

    console.warn(
        `The number of columns (current value: ${columnNumber}) is not correct, fallback to default value (${DEFAULT_COLUMN_NUMBER}).`
    );

    return GRID_CLASSES[DEFAULT_COLUMN_NUMBER];
};
