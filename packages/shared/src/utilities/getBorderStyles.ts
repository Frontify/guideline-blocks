/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { BorderStyle, borderStyleMap } from '../settings/types';
import { BORDER_COLOR_DEFAULT_VALUE } from '../settings/defaultValues';
import { toRgbaString } from './color';

export const getBorderStyles = (
    style = BorderStyle.Solid,
    borderWidth = '1px',
    color = BORDER_COLOR_DEFAULT_VALUE
): CSSProperties => {
    return {
        borderStyle: borderStyleMap[style],
        borderWidth,
        borderColor: toRgbaString(color),
    };
};
