/* (c) Copyright Frontify Ltd., all rights reserved. */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import {
    MarkupElement,
    Plugin,
    PluginProps,
    alignmentClassnames,
    getColumnBreakClasses,
    getTextStyleCssProperties,
    merge,
} from '@frontify/fondue';

const ID = 'quote';

export class QuotePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new QuoteMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createQuotePlugin()];
    }
}

class QuoteMarkupElement extends MarkupElement {
    constructor(id = ID, node = QuoteMarkupElementNode) {
        super(id, node);
    }
}

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
    key: ID,
    isElement: true,
    component: QuoteMarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
    },
});
