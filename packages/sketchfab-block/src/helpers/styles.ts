/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, toRgbaString } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';
import { borderStyles } from '../types';

export const getIframeBorderStyles = (style: BorderStyle, width: string, rgba: Color): CSSProperties => ({
    borderStyle: borderStyles[style],
    borderWidth: width,
    borderColor: toRgbaString(rgba),
});
