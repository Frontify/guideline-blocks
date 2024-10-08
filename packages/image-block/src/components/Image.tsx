/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock, type Asset, useAssetViewer } from '@frontify/app-bridge';
import { FOCUS_VISIBLE_STYLE } from '@frontify/fondue';
import { Security, joinClassNames } from '@frontify/guideline-blocks-settings';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';
import { type CSSProperties, type ReactNode } from 'react';

import { Alignment, type Link, type Settings, mapAlignmentClasses } from '../types';

import { getFrameInterpolationSetting, getImageStyle, getImageWrapperStyle, getPlaybackSettings } from './helpers';

import { DotLottieReact, Mode } from '@lottiefiles/dotlottie-react';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    globalAssetViewerEnabled: boolean;
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
    globalAssetViewerEnabled,
    isDownloadable,
}: ImageProps) => {
    const { containerWidth, setContainerRef } = useImageContainer();

    const imageWrapperStyle = getImageWrapperStyle(blockSettings);
    const imageStyle = getImageStyle(blockSettings);
    // const loop = getLoopSetting(blockSettings);
    const frameInterpolation = getFrameInterpolationSetting(blockSettings);
    const playbackSettings = getPlaybackSettings(blockSettings);
    console.log('playbackSettings', playbackSettings);
    console.log('playback hover', playbackSettings.playOnHover);
    const { assetViewerEnabled, security } = blockSettings;

    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;

    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link ? blockSettings?.linkObject : null;

    console.log('block settings in image', blockSettings);
    console.log('loop', blockSettings.loop);
    return (
        <div data-test-id="image-block-image" className="tw-flex tw-w-full tw-h-auto tw-relative">
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
                {/* <ImageComponent
                    style={imageStyle}
                    containerWidth={containerWidth}
                    image={image}
                    alt={blockSettings.altText ?? ''}
                /> */}
                <DotLottieReact
                    autoplay={playbackSettings.autoplay}
                    loop={blockSettings.loop}
                    src={image.originUrl}
                    speed={blockSettings.speed}
                    // data
                    mode={blockSettings.mode}
                    // backgroundColor=''
                    // segments
                    // renderConfig
                    playOnHover={playbackSettings.playOnHover}
                    // dotLottieRefCallback=
                    useFrameInterpolation={frameInterpolation}
                />
            </ImageWrapper>
        </div>
    );
};
