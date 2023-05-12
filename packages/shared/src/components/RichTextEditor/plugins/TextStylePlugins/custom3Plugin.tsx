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

const ID = 'custom3';

export class Custom3Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new Custom3MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createCustom3Plugin()];
    }
}

class Custom3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom3MarkupElementNode) {
        super(id, node);
    }
}

const Custom3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </p>
    );
};

const createCustom3Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Custom3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom3' }],
    },
});
