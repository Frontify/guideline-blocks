/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, mapAlignmentClasses } from '../types';
import {
    Attachments,
    DownloadButton,
    Security,
    isDownloadable,
    joinClassNames,
    useAttachmentsContext,
} from '@frontify/guideline-blocks-settings';
import { useFocusRing } from '@react-aria/focus';
import { AppBridgeBlock, Asset, useAssetViewer, usePrivacySettings } from '@frontify/app-bridge';
import { getImageWrapperStyle, getTotalImagePadding } from './helpers';
import { FOCUS_STYLE } from '@frontify/fondue';
import { useState } from 'react';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
};

export const ImageComponent = ({
    image,
    blockSettings,
    isEditing,
    appBridge,
    isAssetViewerEnabled,
    containerWidth,
}: ImageProps & { isAssetViewerEnabled: boolean; containerWidth: number }) => {
    const { open } = useAssetViewer(appBridge);
    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link && blockSettings?.linkObject;
    const { isFocused, focusProps } = useFocusRing();

    const devicePixelRatio = Math.max(1, window?.devicePixelRatio ?? 1);
    const imageWidthToRequest = Math.min(containerWidth * devicePixelRatio, image.width);
    // Gif images can have a loop count property
    // Which is lost during our image processing
    const src =
        image.extension === 'gif'
            ? image.originUrl
            : image.genericUrl.replace('{width}', imageWidthToRequest.toString());

    const Image = (
        <img
            data-test-id="image-block-img"
            className="tw-flex tw-w-full"
            loading="lazy"
            src={src}
            width={image.width}
            height={image.height}
            style={{ maxWidth: image.width }}
            alt={blockSettings.altText || undefined}
        />
    );

    const props = {
        ...focusProps,
        className: joinClassNames(['tw-rounded', isFocused && FOCUS_STYLE]),
    };

    if (isEditing) {
        return Image;
    }

    if (link) {
        return (
            <a
                {...props}
                href={link.link.link}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : 'noreferrer'}
            >
                {Image}
            </a>
        );
    }

    if (isAssetViewerEnabled) {
        return (
            <button data-test-id="image-block-asset-viewer-button" {...props} onClick={() => open(image)}>
                {Image}
            </button>
        );
    }

    return Image;
};

export const Image = ({ image, appBridge, blockSettings, isEditing }: ImageProps) => {
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();
    const imageWrapperStyle = getImageWrapperStyle(blockSettings);

    const { assetDownloadEnabled, assetViewerEnabled: globalAssetViewerEnabled } = usePrivacySettings(appBridge);
    const { assetViewerEnabled, security } = blockSettings;

    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;

    return (
        <div
            style={imageWrapperStyle}
            data-test-id="image-block-img-wrapper"
            ref={(el) => setContainerWidth(el?.offsetWidth)}
            className={`tw-flex tw-h-auto ${mapAlignmentClasses[blockSettings.alignment]}`}
        >
            <div className="tw-relative tw-flex">
                {containerWidth && (
                    <ImageComponent
                        containerWidth={containerWidth}
                        appBridge={appBridge}
                        blockSettings={blockSettings}
                        image={image}
                        isEditing={isEditing}
                        isAssetViewerEnabled={isAssetViewerEnabled}
                    />
                )}
                {!isEditing && (
                    <div className="tw-absolute tw-top-2 tw-right-2 tw-z-50">
                        <div
                            className="tw-flex tw-gap-2"
                            data-test-id="buttons-wrapper"
                            style={getTotalImagePadding(blockSettings)}
                        >
                            {isDownloadable(
                                blockSettings.security,
                                blockSettings.downloadable,
                                assetDownloadEnabled
                            ) && (
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
        </div>
    );
};
