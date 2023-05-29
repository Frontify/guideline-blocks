/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import {
    MarkupElement,
    Plugin,
    PluginProps,
    TextStyleRenderElementProps,
    alignmentClassnames,
    getColumnBreakClasses,
    merge,
} from '@frontify/fondue';
import { BlockStyles, TextStyles } from '../styles';

const ID = 'textstyle-quote-plugin';

export class QuotePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = BlockStyles.quote, ...props }: PluginProps = {}) {
        super(TextStyles.quote, {
            label: 'Quote',
            markupElement: new QuoteMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createQuotePlugin(this.styles)];
    }
}

class QuoteMarkupElement extends MarkupElement {
    constructor(id = ID, node = QuoteMarkupElementNode) {
        super(id, node);
    }
}

export const QuoteMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <blockquote
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </blockquote>
    );
};

export const createQuotePlugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.quote,
        isElement: true,
        component: QuoteMarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <QuoteMarkupElementNode {...props} styles={styles} />,
    });
