/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyles } from '@frontify/fondue';
import { hasRichTextValue } from './hasRichTextValue';

export const convertToRteValue = (
    text: string,
    textStyle: TextStyles,
    align?: 'center' | 'right' | 'left' | 'justify'
) => {
    return hasRichTextValue(text)
        ? text
        : JSON.stringify([{ type: textStyle, children: [{ text: text ?? '' }], align }]);
};
