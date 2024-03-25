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
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';

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

    const Image = (
        <ResponsiveImage
            testId="image-block-img"
            image={image}
            containerWidth={containerWidth}
            alt={blockSettings.altText ?? ''}
            style={{ maxWidth: image.width }}
        />
    );

    const props = {
        ...focusProps,
        className: joinClassNames([
            'tw-rounded tw-w-full tw-flex',
            isFocused && FOCUS_STYLE,
            mapAlignmentClasses[blockSettings.alignment],
        ]),
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
    const { containerWidth, setContainerRef } = useImageContainer();
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
            ref={setContainerRef}
            className="tw-flex tw-w-full tw-h-auto tw-overflow-hidden"
        >
            <div className={`tw-relative tw-w-full tw-flex ${mapAlignmentClasses[blockSettings.alignment]}`}>
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
