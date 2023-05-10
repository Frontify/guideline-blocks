/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles, getTextStyleCssProperties } from './textStyles';

export const Heading4MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    return (
        <h4
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h4>
    );
};

export const createHeading4Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING4,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
