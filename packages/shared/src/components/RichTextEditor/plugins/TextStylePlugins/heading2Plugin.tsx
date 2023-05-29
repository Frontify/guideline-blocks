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
const ID = 'textstyle-heading2-plugin';

export class Heading2Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = BlockStyles.heading2, ...props }: PluginProps = {}) {
        super(TextStyles.heading2, {
            label: 'Heading 2',
            markupElement: new Heading2MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createHeading2Plugin(this.styles)];
    }
}

class Heading2MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading2MarkupElementNode) {
        super(id, node);
    }
}

const Heading2MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <h2
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </h2>
    );
};

const createHeading2Plugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.heading2,
        isElement: true,
        component: Heading2MarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['h2', 'H2'] }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Heading2MarkupElementNode {...props} styles={styles} />,
    });
