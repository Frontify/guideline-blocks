/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { BorderStyle, toRgbaString } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';
import { borderStyles } from '../types';

export const getIframeStyles = (
    style: BorderStyle,
    width: string,
    rgba: Color,
    borderRadius: string
): CSSProperties => ({
    borderStyle: borderStyles[style],
    borderWidth: width,
    borderColor: toRgbaString(rgba),
    borderRadius,
});
