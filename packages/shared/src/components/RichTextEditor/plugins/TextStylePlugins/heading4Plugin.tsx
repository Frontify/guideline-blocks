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

const ID = 'heading4';

export class Heading4Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new Heading4MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createHeading4Plugin()];
    }
}

class Heading4MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading4MarkupElementNode) {
        super(id, node);
    }
}

const Heading4MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    return (
        <h4
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h4>
    );
};

const createHeading4Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
