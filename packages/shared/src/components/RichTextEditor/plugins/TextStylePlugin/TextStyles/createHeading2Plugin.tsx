/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge, useRichTextEditorContext } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

const Heading2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h2
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={designTokens.heading2}
        >
            {children}
        </h2>
    );
};

export const createHeading2Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING2,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
