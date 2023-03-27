/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { TextStyles } from '@frontify/fondue';
import { hasRichTextValue } from './hasRichTextValue';

export const convertToRteValue = (
    textStyle = 'p' as TextStyles,
    text = '',
    align?: 'center' | 'right' | 'left' | 'justify'
) => (hasRichTextValue(text) ? text : JSON.stringify([{ type: textStyle, children: [{ text }], align }]));
