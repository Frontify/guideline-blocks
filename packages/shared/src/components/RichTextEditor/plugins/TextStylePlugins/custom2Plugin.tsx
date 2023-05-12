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

const ID = 'custom2';

export class Custom2Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new Custom2MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createCustom2Plugin()];
    }
}

class Custom2MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom2MarkupElementNode) {
        super(id, node);
    }
}

const Custom2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

const createCustom2Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Custom2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom2' }],
    },
});
