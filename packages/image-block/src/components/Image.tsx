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
import { getImageStyle, getTotalImagePadding } from './helpers';
import { FOCUS_STYLE } from '@frontify/fondue';

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
}: ImageProps & { isAssetViewerEnabled: boolean }) => {
    const { open } = useAssetViewer(appBridge);
    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link && blockSettings?.linkObject;
    const imageStyle = getImageStyle(blockSettings, image.width);
    const { isFocused, focusProps } = useFocusRing();

    // Gif images can have a loop count property
    // Which is lost during our image processing
    const src =
        image.extension === 'gif'
            ? image.originUrl
            : image.genericUrl.replace('{width}', `${800 * Math.max(1, window?.devicePixelRatio ?? 1)}`);

    const Image = (
        <img
            data-test-id="image-block-img"
            className="tw-flex tw-w-full"
            loading="lazy"
            src={src}
            alt={blockSettings.altText || undefined}
            style={imageStyle}
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
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();

    const { assetDownloadEnabled, assetViewerEnabled: globalAssetViewerEnabled } = usePrivacySettings(appBridge);
    const { assetViewerEnabled, security } = blockSettings;

    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;

    return (
        <div
            data-test-id="image-block-img-wrapper"
            className={`tw-flex tw-h-auto ${mapAlignmentClasses[blockSettings.alignment]}`}
        >
            <div className="tw-relative ">
                <ImageComponent
                    appBridge={appBridge}
                    blockSettings={blockSettings}
                    image={image}
                    isEditing={isEditing}
                    isAssetViewerEnabled={isAssetViewerEnabled}
                />
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
