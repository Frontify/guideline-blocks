/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import React, { useEffect, useRef, useState } from 'react';

const defaultSrcSet = {
    '320': '280px',
    '480': '440px',
    '800': '800px',
    '1200': '1200px',
    '1600': '1600px',
    '2000': '2000px',
};

type LazyImageProps = {
    asset: Asset;
    testId?: string;
    sourceSet?: Record<string, string>;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
};

export const LazyImage = ({
    asset,
    sourceSet = defaultSrcSet,
    alt,
    className,
    style,
    testId = 'lazy-image',
}: LazyImageProps) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentImgRef = imgRef.current;
        if (!currentImgRef) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: '100px' }
        );

        observer.observe(currentImgRef);

        return () => {
            observer.unobserve(currentImgRef);
        };
    }, []);

    const { srcSet, sizes } = React.useMemo(() => {
        const srcSetEntries = Object.entries(sourceSet).map(
            ([width, _]) => `${asset.previewUrl.replace('{width}', width)} ${width}w`
        );
        const sizesEntries = Object.values(sourceSet).join(', ');

        return {
            srcSet: srcSetEntries.join(', '),
            sizes: sizesEntries,
        };
    }, [sourceSet, asset.previewUrl]);

    return (
        <img
            ref={imgRef}
            data-test-id={testId}
            style={style}
            className={className}
            src={isVisible ? asset.previewUrl.replace('{width}', '100') : undefined}
            srcSet={isVisible ? srcSet : undefined}
            sizes={sizes}
            alt={alt ?? asset.title}
        />
    );
};
