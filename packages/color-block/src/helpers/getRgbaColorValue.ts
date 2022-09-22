/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColor } from '@frontify/app-bridge';

export const getRgbaColorValue = (color: FrontifyColor) => {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${(color.alpha && color.alpha / 255) || 1})`;
};
