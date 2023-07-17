/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
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

const ID = 'textstyle-heading1-plugin';
export class Heading1Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = BlockStyles.heading1, ...props }: PluginProps = {}) {
        super(TextStyles.heading1, {
            label: 'Heading 1',
            markupElement: new Heading1MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createHeading1Plugin(this.styles)];
    }
}

class Heading1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading1MarkupElementNode) {
        super(id, node);
    }
}

const Heading1MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element), 'a-h1'])}
        >
            <span style={styles}>{children}</span>
        </h1>
    );
};

const createHeading1Plugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.heading1,
        isElement: true,
        component: Heading1MarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['h1', 'H1'] }],
        },
    })({
        component: (props: PlateRenderElementProps) => <Heading1MarkupElementNode {...props} styles={styles} />,
    });
