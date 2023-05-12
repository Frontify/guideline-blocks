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

const ID = 'imageCaption';

export class ImageCaptionPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
            markupElement: new ImageCaptionMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createImageCaptionPlugin()];
    }
}

class ImageCaptionMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageCaptionMarkupElementNode) {
        super(id, node);
    }
}
const ImageCaptionMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

const createImageCaptionPlugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: ImageCaptionMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageCaption' }],
    },
});
