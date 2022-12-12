/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultPlugins, defaultPluginsWithColumns } from '@frontify/fondue';

export const getPlugins = (columnNumber: number) => {
    if (columnNumber > 1) {
        return defaultPluginsWithColumns;
    } else {
        return defaultPlugins;
    }
};
