/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { type CSSProperties, useMemo } from 'react';
import { Asset } from '@frontify/app-bridge';
import { ImageFormat } from '../../types';
import { joinClassNames } from '@frontify/guideline-blocks-settings';

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
    const devicePixelRatio = Math.max(1, window?.devicePixelRatio ?? 1);
    const imageWidth = image.width ?? containerWidth;
    const imageHeight = image.height ?? 0;
    const imageWidthToRequest = Math.min(containerWidth * devicePixelRatio, imageWidth);

    const allowConversions = !['gif', 'svg'].includes(image.extension);

    // Gif images can have a loop count property
    // Which is lost during our image processing
    const sourceWithWidth =
        image.extension === 'gif'
            ? image.originUrl
            : image.genericUrl.replace('{width}', imageWidthToRequest.toString());

    const conversionParams = allowConversions ? `&format=${format}&quality=${quality}` : '';
    const sourceOptimised = `${sourceWithWidth}${conversionParams}`;

    const dimensions = image.width && image.height ? { width: imageWidth, height: imageHeight } : {};

    const stylesToApply = useMemo(() => {
        return {
            ...style,
            aspectRatio: style?.aspectRatio === 'auto' ? `${imageWidth} / ${imageHeight}` : style?.aspectRatio,
        };
    }, [imageHeight, imageWidth, style]);

    return (
        <img
            data-test-id={testId}
            className={joinClassNames(['tw-flex tw-bg-box-neutral tw-w-full', className])}
            loading="lazy"
            decoding="async"
            src={sourceOptimised}
            style={stylesToApply}
            alt={alt}
            {...dimensions}
        />
    );
};
