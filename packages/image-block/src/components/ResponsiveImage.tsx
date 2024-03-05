/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

type ResponsiveImageProps = {
    image: Asset;
    containerWidth: number;
    altText?: string;
};

export const ResponsiveImage = ({ image, containerWidth, altText }: ResponsiveImageProps) => {
    const devicePixelRatio = Math.max(1, window?.devicePixelRatio ?? 1);
    const imageWidthToRequest = Math.min(containerWidth * devicePixelRatio, image.width);

    // Gif images can have a loop count property
    // Which is lost during our image processing
    const src =
        image.extension === 'gif'
            ? image.originUrl
            : image.genericUrl.replace('{width}', imageWidthToRequest.toString());

    return (
        <img
            data-test-id="image-block-img"
            className="tw-flex tw-w-full"
            loading="lazy"
            src={src}
            width={image.width}
            height={image.height}
            style={{ maxWidth: image.width }}
            alt={altText}
        />
    );
};
