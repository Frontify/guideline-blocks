/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type CSSProperties, useCallback, useMemo, useState } from 'react';

import { ImageFormat } from '../../types';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imageWidth = image.width ?? containerWidth;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imageHeight = image.height ?? 0;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            className={joinClassNames(['tw-flex tw-w-full', !isLoaded && 'tw-bg-box-neutral', className])}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoaded}
            src={sourceOptimised}
            style={stylesToApply}
            alt={alt}
            {...dimensions}
        />
    );
};
