/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyles } from '@frontify/fondue';
import { hasRichTextValue } from './hasRichTextValue';

export const convertToRteValue = (
    textStyle: TextStyles,
    text?: string,
    align?: 'center' | 'right' | 'left' | 'justify'
) => {
    return hasRichTextValue(text)
        ? text ?? ''
        : JSON.stringify([
              { type: textStyle || TextStyles.ELEMENT_PARAGRAPH, children: [{ text: text || '' }], align },
          ]);
};
