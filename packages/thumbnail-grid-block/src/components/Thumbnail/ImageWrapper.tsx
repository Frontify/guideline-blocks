/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement, ReactNode } from 'react';
import { ThumbnailStylesProps } from '../../types';
import { merge } from '@frontify/fondue';

type ImageWrapperProps = {
    children: ReactNode;
    thumbnailStyles: ThumbnailStylesProps;
    placeholderWrapper?: boolean;
};

export const ImageWrapper = ({ children, thumbnailStyles, placeholderWrapper }: ImageWrapperProps): ReactElement => {
    const { width, alignmentClassNames, imageIsAboveOrBelow } = thumbnailStyles;
    return (
        <div
            className={merge([placeholderWrapper && 'tw-min-w-fit', alignmentClassNames])} // placeholderWrapper && 'tw-min-w-fit' can be removed if placeholder width keeps same behaviour as image, as it does now
            style={{ width: imageIsAboveOrBelow ? 'auto' : width }}
            data-test-id="thumbnail-image-wrapper"
        >
            <div style={{ width: imageIsAboveOrBelow ? width : 'auto' }}>{children}</div>
        </div>
    );
};
