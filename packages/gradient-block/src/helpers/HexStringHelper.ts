/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String, toHexString } from '@frontify/guideline-blocks-settings';
import { Color } from '@frontify/fondue';

export const toHex6or8String = (color: Color) => {
    const hasAlphaChannel = color.alpha !== undefined && color.alpha !== 1;
    const hexStringTransformer = hasAlphaChannel ? toHex8String : toHexString;
    return hexStringTransformer(color);
};
