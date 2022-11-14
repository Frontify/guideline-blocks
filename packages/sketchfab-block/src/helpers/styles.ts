/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Color, toRgbaString } from '@frontify/guideline-blocks-settings';
import { CSSProperties } from 'react';
import { borderStyles } from '../types';

export const getIframeBorderStyles = (style: BorderStyle, width: string, rgba: Color): CSSProperties => ({
    borderStyle: borderStyles[style],
    borderWidth: width,
    borderColor: toRgbaString(rgba),
});
