/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { getColumnBreakClasses, getTextStyleCssProperties, merge } from '@frontify/fondue';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';

export const ImageCaptionMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

export const createImageCaptionPlugin = createPluginFactory({
    key: TextStyles.ELEMENT_IMAGE_CAPTION,
    isElement: true,
    component: ImageCaptionMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageCaption' }],
    },
});
