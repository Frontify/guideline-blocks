/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Link, type Settings, mapAlignmentClasses } from '../types';
import {
    Attachments,
    DownloadButton,
    Security,
    isDownloadable,
    joinClassNames,
    useAttachmentsContext,
} from '@frontify/guideline-blocks-settings';
import { AppBridgeBlock, Asset, useAssetViewer, usePrivacySettings } from '@frontify/app-bridge';
import { getImageWrapperStyle, getTotalImagePadding } from './helpers';
import { FOCUS_VISIBLE_STYLE } from '@frontify/fondue';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';
import { CSSProperties, ReactNode } from 'react';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
};

type ImageWrapperProps = {
    image: Asset;
    appBridge: AppBridgeBlock;
    children: ReactNode;
    link: Link | null;
    style: CSSProperties;
    isEditing: boolean;
    isAssetViewerEnabled: boolean;
};

type ImageComponentProps = {
    image: Asset;
    alt: string;
    containerWidth: number;
};

const ImageWrapper = ({
    image,
    appBridge,
    children,
    link,
    style,
    isEditing,
    isAssetViewerEnabled,
}: ImageWrapperProps) => {
    const { open } = useAssetViewer(appBridge);

    const sharedProps = {
        className: joinClassNames(['tw-block tw-overflow-hidden', FOCUS_VISIBLE_STYLE]),
        style,
    };

    if (isEditing || (!link && !isAssetViewerEnabled)) {
        return (
            <div {...sharedProps} data-test-id="image-block-default-wrapper">
                {children}
            </div>
        );
    }

    if (link) {
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

    if (isAssetViewerEnabled) {
        return (
            <button data-test-id="image-block-asset-viewer-wrapper" {...sharedProps} onClick={() => open(image)}>
                {children}
            </button>
        );
    }

    return null;
};

export const ImageComponent = ({ image, alt, containerWidth }: ImageComponentProps) => (
    <ResponsiveImage
        testId="image-block-image-component"
        image={image}
        containerWidth={containerWidth}
        alt={alt}
        style={{ maxWidth: image.width }}
    />
);

export const Image = ({ image, appBridge, blockSettings, isEditing }: ImageProps) => {
    const { containerWidth, setContainerRef } = useImageContainer();
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();
    const imageWrapperStyle = getImageWrapperStyle(blockSettings);
    const { assetDownloadEnabled, assetViewerEnabled: globalAssetViewerEnabled } = usePrivacySettings(appBridge);
    const { assetViewerEnabled, security } = blockSettings;

    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;

    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link ? blockSettings?.linkObject : null;

    return (
        <div
            data-test-id="image-block-image"
            ref={setContainerRef}
            className={joinClassNames([
                'tw-flex tw-w-full tw-h-auto tw-relative',
                mapAlignmentClasses[blockSettings.alignment],
            ])}
        >
            {containerWidth && (
                <ImageWrapper
                    appBridge={appBridge}
                    isAssetViewerEnabled={isAssetViewerEnabled}
                    link={link}
                    style={imageWrapperStyle}
                    isEditing={isEditing}
                    image={image}
                >
                    <ImageComponent containerWidth={containerWidth} image={image} alt={blockSettings.altText ?? ''} />
                </ImageWrapper>
            )}
            {!isEditing && (
                <div className="tw-absolute tw-top-2 tw-right-2 tw-z-50">
                    <div
                        className="tw-flex tw-gap-2"
                        data-test-id="buttons-wrapper"
                        style={getTotalImagePadding(blockSettings)}
                    >
                        {isDownloadable(blockSettings.security, blockSettings.downloadable, assetDownloadEnabled) && (
                            <DownloadButton
                                onDownload={() => appBridge.dispatch({ name: 'downloadAsset', payload: image })}
                            />
                        )}

                        <Attachments
                            onUpload={onAttachmentsAdd}
                            onDelete={onAttachmentDelete}
                            onReplaceWithBrowse={onAttachmentReplace}
                            onReplaceWithUpload={onAttachmentReplace}
                            onSorted={onAttachmentsSorted}
                            onBrowse={onAttachmentsAdd}
                            items={attachments}
                            appBridge={appBridge}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
