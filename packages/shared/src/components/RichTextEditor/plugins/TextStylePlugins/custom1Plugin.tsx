/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import {
    MarkupElement,
    Plugin,
    PluginProps,
    TextStyles,
    alignmentClassnames,
    getColumnBreakClasses,
    getTextStyleCssProperties,
    merge,
} from '@frontify/fondue';

const ID = 'textstyle-custom1-plugin';

export class Custom1Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TextStyles.custom1, {
            label: 'Custom 1',
            markupElement: new Custom1MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createCustom1Plugin()];
    }
}

class Custom1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom1MarkupElementNode) {
        super(id, node);
    }
}

const Custom1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

const createCustom1Plugin = createPluginFactory({
    key: 'custom1',
    isElement: true,
    component: Custom1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: ID }],
    },
});
