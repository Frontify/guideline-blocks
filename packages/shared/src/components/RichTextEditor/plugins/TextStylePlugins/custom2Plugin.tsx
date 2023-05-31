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

const ID = 'textstyle-custom2-plugin';

export class Custom2Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = BlockStyles.custom2, ...props }: PluginProps = {}) {
        super(TextStyles.custom2, {
            label: 'Custom 2',
            markupElement: new Custom2MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createCustom2Plugin(this.styles)];
    }
}

class Custom2MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom2MarkupElementNode) {
        super(id, node);
    }
}

const Custom2MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element), 'a-custom2'])}
        >
            <span style={styles}>{children}</span>
        </p>
    );
};

const createCustom2Plugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.custom2,
        isElement: true,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.custom2 }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Custom2MarkupElementNode {...props} styles={styles} />,
    });
