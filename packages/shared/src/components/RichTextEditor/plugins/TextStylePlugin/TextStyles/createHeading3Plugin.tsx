/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge, useRichTextEditorContext } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Heading3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={designTokens.heading3}
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
