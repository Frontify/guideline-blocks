/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge, useRichTextEditorContext } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Custom2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={designTokens.custom2}
        >
            {children}
        </p>
    );
};

export const createCustom2Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM2,
    isElement: true,
    component: Custom2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom2' }],
    },
});
