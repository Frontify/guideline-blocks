/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock, type Asset, useAssetViewer } from '@frontify/app-bridge';
import { FOCUS_VISIBLE_STYLE } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';
import { type CSSProperties, type ReactNode } from 'react';

import { Alignment, type Link, type Settings, mapAlignmentClasses } from '../types';

import { getImageStyle, getImageWrapperStyle } from './helpers';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    isAssetViewerEnabled: boolean;
    isDownloadable: boolean;
};

type ImageWrapperProps = {
    image: Asset;
    appBridge: AppBridgeBlock;
    children: ReactNode;
    link: Link | null;
    style: CSSProperties;
    isEditing: boolean;
    isAssetViewerEnabled: boolean;
    alignment: Alignment;
    isDownloadable: boolean;
    setContainerRef: (element: HTMLElement | null) => void;
};

type ImageComponentProps = {
    image: Asset;
    alt: string;
    containerWidth: number | undefined;
    style: CSSProperties;
};

const ImageWrapper = ({
    image,
    appBridge,
    children,
    link,
    style,
    isEditing,
    isAssetViewerEnabled,
    alignment,
    setContainerRef,
    isDownloadable,
}: ImageWrapperProps) => {
    const { open } = useAssetViewer(appBridge);

    const sharedProps = {
        className: joinClassNames([
            'tw-flex tw-overflow-hidden tw-w-full',
            FOCUS_VISIBLE_STYLE,
            mapAlignmentClasses[alignment],
        ]),
        style,
        ref: setContainerRef,
    };

    if (!isEditing && link) {
        return (
            <a
                {...sharedProps}
                href={link.link.link}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : 'noreferrer'}
                data-test-id="image-block-link-wrapper"
            >
                {children}
            </a>
        );
    }

    if (!isEditing && isAssetViewerEnabled) {
        return (
            <button
                data-test-id="image-block-asset-viewer-wrapper"
                {...sharedProps}
                onClick={() => open(image, isDownloadable)}
            >
                {children}
            </button>
        );
    }

    return (
        <div {...sharedProps} data-test-id="image-block-default-wrapper">
            {children}
        </div>
    );
};

export const ImageComponent = ({ image, alt, containerWidth, style }: ImageComponentProps) => (
    <ResponsiveImage
        testId="image-block-image-component"
        image={image}
        containerWidth={containerWidth}
        alt={alt}
        style={{ ...style, maxWidth: image.width }}
    />
);

export const Image = ({
    image,
    appBridge,
    blockSettings,
    isEditing,
    isAssetViewerEnabled,
    isDownloadable,
}: ImageProps) => {
    const { containerWidth, setContainerRef } = useImageContainer();

    const imageWrapperStyle = getImageWrapperStyle(blockSettings);
    const imageStyle = getImageStyle(blockSettings);

    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link ? blockSettings?.linkObject : null;

    return (
        <div data-test-id="image-block-image" className="tw-flex tw-w-full tw-h-auto tw-relative tw-overflow-hidden">
            <ImageWrapper
                appBridge={appBridge}
                isAssetViewerEnabled={isAssetViewerEnabled}
                link={link}
                style={imageWrapperStyle}
                setContainerRef={setContainerRef}
                isEditing={isEditing}
                image={image}
                alignment={blockSettings.alignment}
                isDownloadable={isDownloadable}
            >
                <ImageComponent
                    style={imageStyle}
                    containerWidth={containerWidth}
                    image={image}
                    alt={blockSettings.altText ?? image.alternativeText ?? ''}
                />
            </ImageWrapper>
        </div>
    );
};
