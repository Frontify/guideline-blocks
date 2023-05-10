/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';
import { getColumnBreakClasses, merge } from '@frontify/fondue';

export const QuoteMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <blockquote
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-quote-font-family)] tw-text-[color:var(--f-theme-settings-quote-color)] tw-text-[length:var(--f-theme-settings-quote-font-size)] tw-tracking-[var(--f-theme-settings-quote-letter-spacing)] tw-leading-[var(--f-theme-settings-quote-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-quote-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-quote-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-quote-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-quote-text-transform)' as any,
            }}
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
