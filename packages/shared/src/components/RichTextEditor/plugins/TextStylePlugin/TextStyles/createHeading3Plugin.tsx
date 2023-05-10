/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles, getTextStyleCssProperties } from './textStyles';

export const Heading3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h3>
    );
};

export const createHeading3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING3,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
