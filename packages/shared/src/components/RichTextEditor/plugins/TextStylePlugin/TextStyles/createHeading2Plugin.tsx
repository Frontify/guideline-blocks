/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

const Heading2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <h2
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-heading2-font-family)] tw-text-[color:var(--f-theme-settings-heading2-color)] tw-text-[length:var(--f-theme-settings-heading2-font-size)] tw-tracking-[var(--f-theme-settings-heading2-letter-spacing)] tw-leading-[var(--f-theme-settings-heading2-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-heading2-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-heading2-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-heading2-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-heading2-text-transform)' as any,
            }}
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
