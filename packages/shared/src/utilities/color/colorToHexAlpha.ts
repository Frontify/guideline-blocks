/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/arcade';

export const colorToHexAlpha = ({ hex, alpha }: Color) => {
    if (alpha === undefined) {
        return `${hex}FF`;
    } else if (alpha === 0) {
        return `${hex}00`;
    } else {
        const hexAlpha = Math.floor(alpha * 255).toString(16);
        return hex + hexAlpha.toUpperCase();
    }
};
