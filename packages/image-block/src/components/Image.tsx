/* eslint-disable react-hooks/exhaustive-deps */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock, type Asset, useAssetViewer } from '@frontify/app-bridge';
import { FOCUS_VISIBLE_STYLE } from '@frontify/fondue';
import { Security, joinClassNames } from '@frontify/guideline-blocks-settings';
import { useImageContainer } from '@frontify/guideline-blocks-shared';
import { type CSSProperties, type ReactNode } from 'react';

import { Alignment, type Link, type Settings, mapAlignmentClasses } from '../types';

import {
    getFrameInterpolationSetting,
    getImageWrapperStyle,
    // getPlaybackSettings
} from './helpers';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type ImageSource = Asset | string;

type ImageProps = {
    key: number;
    imageSource: ImageSource;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    globalAssetViewerEnabled: boolean;
    isDownloadable: boolean;
};

type ImageWrapperProps = {
    imageSource?: ImageSource;
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

const ImageWrapper = ({
    imageSource,
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

    if (!isEditing && isAssetViewerEnabled && typeof imageSource !== 'string') {
        return (
            <button
                data-test-id="image-block-asset-viewer-wrapper"
                {...sharedProps}
                onClick={() => imageSource && open(imageSource, isDownloadable)}
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

export const Image = ({
    key,
    imageSource,
    appBridge,
    blockSettings,
    isEditing,
    globalAssetViewerEnabled,
    isDownloadable,
}: ImageProps) => {
    const { setContainerRef } = useImageContainer();

    const imageWrapperStyle = getImageWrapperStyle(blockSettings);
    const frameInterpolation = getFrameInterpolationSetting(blockSettings);

    // for use with checklist in settings
    // const playbackSettings = getPlaybackSettings(blockSettings);

    const { assetViewerEnabled, security } = blockSettings;

    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;

    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link ? blockSettings?.linkObject : null;

    return (
        <div data-test-id="image-block-image" className="tw-flex tw-w-full tw-h-auto tw-relative">
            <ImageWrapper
                key={key}
                appBridge={appBridge}
                isAssetViewerEnabled={isAssetViewerEnabled}
                link={link}
                style={imageWrapperStyle}
                setContainerRef={setContainerRef}
                isEditing={isEditing}
                imageSource={imageSource}
                alignment={blockSettings.alignment}
                isDownloadable={isDownloadable}
            >
                <DotLottieReact
                    key={key}
                    autoplay={blockSettings.autoplay}
                    loop={blockSettings.loop}
                    src={typeof imageSource === 'string' ? imageSource : imageSource.originUrl}
                    speed={blockSettings.speed}
                    mode={blockSettings.mode}
                    playOnHover={blockSettings.hover}
                    useFrameInterpolation={frameInterpolation}
                />
            </ImageWrapper>
        </div>
    );
};
