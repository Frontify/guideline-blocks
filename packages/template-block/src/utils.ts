/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';

//TODO: this is quick and dirty alternative for toRgbaString() function which causes the errors while building the block
//TODO: should be investigated in more depth
export const getRgbaString = (color: Color): string => {
    const redChannel = color.red ?? 0;
    const greenChannel = color.green ?? 0;
    const blueChannel = color.blue ?? 0;
    const alphaChannel = color.alpha ?? 1.0;

    return `rgba(${redChannel}, ${greenChannel}, ${blueChannel}, ${alphaChannel})`;
};
