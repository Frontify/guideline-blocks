/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

const IMAGE_LOAD_TRIGGER_MARGIN_PX = 100;

export const useImageLazyLoading = ({
    imageUrl,
    imageWrapperRef,
}: {
    imageUrl: string;
    imageWrapperRef?: React.RefObject<HTMLDivElement>;
}) => {
    const [blobImageSrc, setBlobImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        let isCancelled = false;
        let hasStartedLoading = false;

        const loadImage = async () => {
            if (hasStartedLoading) {
                return;
            }
            hasStartedLoading = true;

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

        const triggerImageLoad = () => {
            loadImage().catch((error) => console.error('Failed to load image', error));
        };

        const observedElement = imageWrapperRef?.current;
        const noBrowserSupport = typeof IntersectionObserver === 'undefined';

        if (!observedElement || noBrowserSupport) {
            triggerImageLoad();
            return () => {
                isCancelled = true;
                abortController.abort();
            };
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                const isIntersecting = entries.some((entry) => entry.isIntersecting);
                if (!isIntersecting) {
                    return;
                }

                currentObserver.disconnect();
                triggerImageLoad();
            },
            {
                root: null,
                rootMargin: `${IMAGE_LOAD_TRIGGER_MARGIN_PX}px`,
                threshold: 0,
            }
        );

        observer.observe(observedElement);

        return () => {
            observer.disconnect();
            isCancelled = true;
            abortController.abort();
        };
    }, [imageUrl, imageWrapperRef]);

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
