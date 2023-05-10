/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { getColumnBreakClasses, getTextStyleCssProperties, merge } from '@frontify/fondue';

export const ImageTitleMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

export const createImageTitlePlugin = createPluginFactory({
    key: TextStyles.ELEMENT_IMAGE_TITLE,
    isElement: true,
    component: ImageTitleMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageTitle' }],
    },
});
