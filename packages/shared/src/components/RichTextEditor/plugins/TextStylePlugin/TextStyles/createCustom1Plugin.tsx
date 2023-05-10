/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';

import { alignmentClassnames } from './alignment';
import { TextStyles, getTextStyleCssProperties } from './textStyles';

export const Custom1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
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

export const createCustom1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM1,
    isElement: true,
    component: Custom1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom1' }],
    },
});
