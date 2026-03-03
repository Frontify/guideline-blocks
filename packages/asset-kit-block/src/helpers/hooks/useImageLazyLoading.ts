/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

export const useImageLazyLoading = ({ imageUrl }: { imageUrl: string }) => {
    const [blobImageSrc, setBlobImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        let isCancelled = false;

        const loadImage = async () => {
            const response = await fetch(imageUrl, { signal: abortController.signal });
            if (!response.ok) {
                return;
            }

            const imageBlob = await response.blob();
            const blobUrl = URL.createObjectURL(imageBlob);

            if (!isCancelled) {
                setBlobImageSrc((previousImageSrc) => {
                    if (previousImageSrc) {
                        URL.revokeObjectURL(previousImageSrc);
                    }
                    return blobUrl;
                });
            } else {
                URL.revokeObjectURL(blobUrl);
            }
        };

        loadImage().catch((error) => console.error('Failed to load image', error));

        return () => {
            isCancelled = true;
            abortController.abort();
        };
    }, [imageUrl]);

    useEffect(() => {
        return () => {
            if (blobImageSrc) {
                URL.revokeObjectURL(blobImageSrc);
            }
        };
    }, [blobImageSrc]);

    return {
        blobImageSrc,
    };
};
