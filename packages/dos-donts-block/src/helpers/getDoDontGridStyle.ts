/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GUTTER_VALUES, type Settings } from '../types';

import { getGridClassName } from './Grid';

export const getDoDontGridStyle = (blockSettings: Settings) => {
    const {
        columns,
        keepSideBySide,
        isCustomColumnGutter,
        customColumnGutterValue,
        columnGutterChoice,
        isCustomRowGutter,
        customRowGutterValue,
        rowGutterChoice,
    } = blockSettings;

    const columnGap = isCustomColumnGutter ? customColumnGutterValue : GUTTER_VALUES[columnGutterChoice];
    const rowGap = isCustomRowGutter ? customRowGutterValue : GUTTER_VALUES[rowGutterChoice];

    return {
        columnGap,
        rowGap,
        gridClassName: getGridClassName(keepSideBySide, columns),
    };
};
