/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { getColumnBreakClasses, merge } from '@frontify/fondue';

export const ImageTitleMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-image-title-font-family)] tw-text-[color:var(--f-theme-settings-image-title-color)] tw-text-[length:var(--f-theme-settings-image-title-font-size)] tw-tracking-[var(--f-theme-settings-image-title-letter-spacing)] tw-leading-[var(--f-theme-settings-image-title-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-image-title-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-image-title-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-image-title-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-image-title-text-transform)' as any,
            }}
        >
            {children}
        </p>
    );
};

export const createImageTitlePlugin = createPluginFactory({
    key: TextStyles.ELEMENT_IMAGE_TITLE,
    isElement: true,
    component: ImageTitleMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageTitle' }],
    },
});
