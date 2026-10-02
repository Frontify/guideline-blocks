/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type CSSProperties, useCallback, useMemo, useState } from 'react';

import { ImageFormat } from '../../types';

export const PLACEHOLDER_SOURCE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

type ResponsiveImageProps = {
    image: Asset;
    containerWidth: number | undefined;
    alt: string;
    format?: ImageFormat;
    quality?: number;
    className?: string;
    style?: CSSProperties;
    testId?: string;
};

export const ResponsiveImage = ({
    image,
    containerWidth = 0,
    alt,
    format = ImageFormat.WEBP,
    className = '',
    style,
    quality = 100,
    testId = 'responsive-image',
}: ResponsiveImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const devicePixelRatio = Math.max(1, window?.devicePixelRatio ?? 1);
    // oxlint-disable-next-line typescript/no-unsafe-assignment
    const imageWidth = image.width ?? containerWidth;
    // oxlint-disable-next-line typescript/no-unsafe-assignment
    const imageHeight = image.height ?? 0;
    // oxlint-disable-next-line typescript/no-unsafe-argument
    const imageWidthToRequest = Math.min(containerWidth * devicePixelRatio, imageWidth);

    const allowConversions = !['gif', 'svg'].includes(image.extension);

    const source = image.previewUrl || image.genericUrl;

    // Gif images can have a loop count property
    // Which is lost during our image processing
    const sourceWithWidth =
        image.extension === 'gif' ? image.originUrl : source.replace('{width}', imageWidthToRequest.toString());

    const conversionParams = allowConversions ? `&format=${format}&quality=${quality}` : '';
    // Until the container is measured, use a placeholder without intrinsic size: the width/height attributes
    // still reserve the final box, so swapping in the real source neither shifts the layout nor requests a
    // zero-width image. A missing src would not work, as browsers collapse an <img alt=""> without a source.
    const hasMeasuredContainer = image.extension === 'gif' || containerWidth > 0;
    const sourceOptimised = hasMeasuredContainer ? `${sourceWithWidth}${conversionParams}` : PLACEHOLDER_SOURCE;

    // oxlint-disable-next-line typescript/no-unsafe-assignment
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
