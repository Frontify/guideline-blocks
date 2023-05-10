/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge, useRichTextEditorContext } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Heading1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={designTokens.heading1}
        >
            {children}
        </h1>
    );
};

export const createHeading1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING1,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
