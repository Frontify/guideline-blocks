/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { getColumnBreakClasses, merge } from '@frontify/fondue';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';

export const ImageCaptionMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([
                align && alignmentClassnames[align],
                getColumnBreakClasses(element),
                'tw-font-[var(--f-theme-settings-image-caption-font-family)] tw-text-[color:var(--f-theme-settings-image-caption-color)] tw-text-[length:var(--f-theme-settings-image-caption-font-size)] tw-tracking-[var(--f-theme-settings-image-caption-letter-spacing)] tw-leading-[var(--f-theme-settings-image-caption-line-height)]',
            ])}
            style={{
                fontWeight: 'var(--f-theme-settings-image-caption-font-weight)' as any,
                fontStyle: 'var(--f-theme-settings-image-caption-font-style)' as any,
                textDecoration: 'var(--f-theme-settings-image-caption-text-decoration)' as any,
                textTransform: 'var(--f-theme-settings-image-caption-text-transform)' as any,
            }}
        >
            {children}
        </p>
    );
};

export const createImageCaptionPlugin = createPluginFactory({
    key: TextStyles.ELEMENT_IMAGE_CAPTION,
    isElement: true,
    component: ImageCaptionMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageCaption' }],
    },
});
