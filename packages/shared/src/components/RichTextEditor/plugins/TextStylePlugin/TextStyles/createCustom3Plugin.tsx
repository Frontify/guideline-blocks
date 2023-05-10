/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Custom3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-custom3-font-family)] tw-text-[color:var(--f-theme-settings-custom3-color)] tw-text-[length:var(--f-theme-settings-custom3-font-size)] tw-tracking-[var(--f-theme-settings-custom3-letter-spacing)] tw-leading-[var(--f-theme-settings-custom3-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-custom3-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-custom3-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-custom3-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-custom3-text-transform)' as any,
            }}
        >
            {children}
        </p>
    );
};

export const createCustom3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM3,
    isElement: true,
    component: Custom3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom3' }],
    },
});
