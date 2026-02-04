/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import { type ReactElement, type ReactNode } from 'react';

import { type ThumbnailStylesProps } from '../../types';

type ImageWrapperProps = {
    children: ReactNode;
    thumbnailStyles: ThumbnailStylesProps;
    placeholderWrapper?: boolean;
    setContainerRef: (container: HTMLElement | null) => void;
};

export const ImageWrapper = ({
    children,
    thumbnailStyles,
    placeholderWrapper,
    setContainerRef,
}: ImageWrapperProps): ReactElement => {
    const { width, alignmentClassNames, imageIsAboveOrBelow } = thumbnailStyles;

    return (
        <div
            className={merge([placeholderWrapper && 'tw-min-w-fit', alignmentClassNames])} // placeholderWrapper && 'tw-min-w-fit' can be removed if placeholder width keeps same behaviour as image, as it does now
            style={{ width: imageIsAboveOrBelow ? 'auto' : width }}
            data-test-id="thumbnail-image-wrapper"
        >
            <div className="tw-flex" style={{ width: imageIsAboveOrBelow ? width : 'auto' }} ref={setContainerRef}>
                {children}
            </div>
        </div>
    );
};
