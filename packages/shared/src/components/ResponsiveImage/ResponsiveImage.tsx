/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type CSSProperties, useCallback, useMemo, useState } from 'react';

import { type ImageFormat } from '../../types';
import { getDevicePixelRatio, getOptimisedImageUrl } from '../../utils/getOptimisedImageUrl';

export const PLACEHOLDER_SOURCE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

// Only the fields the component reads, so images that aren't block assets (like template previews) can use it too.
type ResponsiveImageSource = Pick<Asset, 'extension' | 'genericUrl' | 'height' | 'originUrl' | 'previewUrl' | 'width'>;

type ResponsiveImageProps = {
    image: ResponsiveImageSource;
    containerWidth: number | undefined;
    alt: string;
    format?: ImageFormat;
    quality?: number;
    className?: string;
    style?: CSSProperties;
    testId?: string;
};

const getSource = (image: ResponsiveImageSource, widthToRequest: number, format?: ImageFormat, quality?: number) => {
    // Gif images can have a loop count property
    // Which is lost during our image processing
    if (image.extension === 'gif') {
        return image.originUrl;
    }

    const source = image.previewUrl || image.genericUrl;

    if (image.extension === 'svg') {
        return source.replace('{width}', widthToRequest.toString());
    }

    return getOptimisedImageUrl(source, widthToRequest, { format, quality });
};

export const ResponsiveImage = ({
    image,
    containerWidth = 0,
    alt,
    format,
    className = '',
    style,
    quality,
    testId = 'responsive-image',
}: ResponsiveImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageWidth = image.width || containerWidth;
    const imageHeight = image.height ?? 0;
    const imageWidthToRequest = Math.min(containerWidth * getDevicePixelRatio(), imageWidth);

    const sourceWithConversions = getSource(image, imageWidthToRequest, format, quality);
    const hasMeasuredContainer = image.extension === 'gif' || containerWidth > 0;
    const sourceOptimised = hasMeasuredContainer ? sourceWithConversions : PLACEHOLDER_SOURCE;

    const dimensions = image.width && image.height ? { width: imageWidth, height: imageHeight } : {};

    const stylesToApply = useMemo(() => {
        return {
            ...style,
            aspectRatio: style?.aspectRatio === 'auto' ? `${imageWidth} / ${imageHeight}` : style?.aspectRatio,
        };
    }, [imageHeight, imageWidth, style]);

    const handleImageLoaded = useCallback(() => {
        setIsLoaded(true);
    }, [setIsLoaded]);

    return (
        <img
            data-test-id={testId}
            className={joinClassNames(['tw-flex tw-w-full', !isLoaded && 'tw-bg-container-secondary', className])}
            loading="lazy"
            decoding="async"
            onLoad={hasMeasuredContainer ? handleImageLoaded : undefined}
            src={sourceOptimised}
            style={stylesToApply}
            alt={alt}
            {...dimensions}
        />
    );
};
