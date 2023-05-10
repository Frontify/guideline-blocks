/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Custom2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-custom2-font-family)] tw-text-[color:var(--f-theme-settings-custom2-color)] tw-text-[length:var(--f-theme-settings-custom2-font-size)] tw-tracking-[var(--f-theme-settings-custom2-letter-spacing)] tw-leading-[var(--f-theme-settings-custom2-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-custom2-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-custom2-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-custom2-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-custom2-text-transform)' as any,
            }}
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
