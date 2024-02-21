/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_SOURCE_SET = {
    '320': '(max-width: 320px) 280px',
    '480': '(max-width: 480px) 440px',
    '800': '(max-width: 800px) 800px',
    '1200': '(max-width: 1200px) 1200px',
    '1600': '(max-width: 1600px) 1600px',
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
    sourceSet = DEFAULT_SOURCE_SET,
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

    // Generate srcSet based on available widths in the sourceSet
    const srcSet = React.useMemo(
        () =>
            Object.keys(sourceSet)
                .map((width) => `${asset.previewUrl.replace('{width}', width)} ${width}w`)
                .join(', '),
        [sourceSet, asset.previewUrl]
    );

    const sizes = React.useMemo(() => Object.values(sourceSet).join(', '), [sourceSet]);

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
