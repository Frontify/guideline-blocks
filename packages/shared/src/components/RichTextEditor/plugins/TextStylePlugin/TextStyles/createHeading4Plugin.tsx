/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Heading4MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <h4
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-heading4-font-family)] tw-text-[color:var(--f-theme-settings-heading4-color)] tw-text-[length:var(--f-theme-settings-heading4-font-size)] tw-tracking-[var(--f-theme-settings-heading4-letter-spacing)] tw-leading-[var(--f-theme-settings-heading4-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-heading4-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-heading4-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-heading4-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-heading4-text-transform)' as any,
            }}
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
