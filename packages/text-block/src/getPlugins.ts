/* (c) Copyright Frontify Ltd., all rights reserved. */

import { columnBreakPlugins, defaultPlugins } from '@frontify/fondue';

//@TODO update fondue version & import columnBreakPlugins from '@frontify/fondue';
export const getPlugins = (columnNumber: number) => {
    if (columnNumber > 1) {
        return columnBreakPlugins;
    } else {
        return defaultPlugins;
    }
};
