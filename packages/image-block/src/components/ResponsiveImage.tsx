/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

type ResponsiveImageProps = {
    image: Asset;
    containerWidth: number;
    altText?: string;
    allowWebp?: boolean;
    quality?: number;
};

export const ResponsiveImage = ({
    image,
    containerWidth,
    altText,
    allowWebp = true,
    quality = 100,
}: ResponsiveImageProps) => {
    const devicePixelRatio = Math.max(1, window?.devicePixelRatio ?? 1);
    const imageWidthToRequest = Math.min(containerWidth * devicePixelRatio, image.width);

    const allowOptimisation = !['gif', 'svg'].includes(image.extension);
    const allowWebpConversion = allowWebp && allowOptimisation;

    // Gif images can have a loop count property
    // Which is lost during our image processing
    const sourceWithWidth =
        image.extension === 'gif'
            ? image.originUrl
            : image.genericUrl.replace('{width}', imageWidthToRequest.toString());

    const webpParams = allowWebpConversion ? '&format=webp' : '';
    const qualityParams = allowOptimisation ? `&quality=${quality}` : '';
    const sourceOptimised = `${sourceWithWidth}${webpParams}${qualityParams}`;

    return (
        <img
            data-test-id="image-block-img"
            className="tw-flex tw-w-full"
            loading="lazy"
            src={sourceOptimised}
            width={image.width}
            height={image.height}
            style={{ maxWidth: image.width }}
            alt={altText}
        />
    );
};
