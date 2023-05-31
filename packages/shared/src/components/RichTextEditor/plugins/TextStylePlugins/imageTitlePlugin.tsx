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

const ID = 'textstyle-imageTitle-plugin';

export class ImageTitlePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = BlockStyles.imageTitle, ...props }: PluginProps = {}) {
        super(TextStyles.imageTitle, {
            label: 'Image Title',
            markupElement: new ImageTitleMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createImageTitlePlugin(this.styles)];
    }
}

class ImageTitleMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageTitleMarkupElementNode) {
        super(id, node);
    }
}
const ImageTitleMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element), 'a-image-title'])}
        >
            <span style={styles}>{children}</span>
        </p>
    );
};

const createImageTitlePlugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.imageTitle,
        isElement: true,
        component: ImageTitleMarkupElementNode,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.imageTitle }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <ImageTitleMarkupElementNode {...props} styles={styles} />,
    });
