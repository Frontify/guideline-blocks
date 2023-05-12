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

const ID = 'heading3';

export class Heading3Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new Heading3MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createHeading3Plugin()];
    }
}

class Heading3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading3MarkupElementNode) {
        super(id, node);
    }
}
const Heading3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h3>
    );
};

const createHeading3Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
