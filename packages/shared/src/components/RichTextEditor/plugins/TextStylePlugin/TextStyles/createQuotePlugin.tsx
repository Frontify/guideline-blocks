/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { alignmentClassnames } from './alignment';
import { TextStyles, getTextStyleCssProperties } from './textStyles';
import { getColumnBreakClasses, merge } from '@frontify/fondue';

export const QuoteMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <blockquote
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </blockquote>
    );
};

export const createQuotePlugin = createPluginFactory({
    key: TextStyles.ELEMENT_QUOTE,
    isElement: true,
    component: QuoteMarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
    },
});
