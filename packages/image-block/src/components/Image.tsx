/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CaptionPosition,
    CornerRadius,
    Settings,
    mapAlignmentClasses,
    paddingValues,
    radiusValues,
    rationValues,
} from '../types';
import {
    Attachments,
    DownloadButton,
    downloadAsset,
    isDownloadable,
    joinClassNames,
    toRgbaString,
    useAttachments,
} from '@frontify/guideline-blocks-shared';
import { AppBridgeBlock, Asset, usePrivacySettings } from '@frontify/app-bridge';
import { ATTACHMENTS_ASSET_ID } from '../settings';
import { DesignTokens } from '@frontify/fondue';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    designTokens: DesignTokens;
};

export const ImageComponent = ({ image, blockSettings, isEditing }: ImageProps) => {
    const link = blockSettings.hasLink ? blockSettings.linkObject : undefined;
    return (
        <>
            {link && !isEditing ? (
                <a
                    className="tw-w-full"
                    href={link.link.link}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : 'noreferrer'}
                >
                    <img
                        data-test-id="image-block-img"
                        className="tw-flex"
                        loading="lazy"
                        src={image.genericUrl.replace('{width}', `${800 * window.devicePixelRatio}`)}
                        alt={image.fileName}
                        style={{
                            width: image.width,
                        }}
                    />
                </a>
            ) : (
                <img
                    data-test-id="image-block-img"
                    className="tw-flex"
                    loading="lazy"
                    src={image.genericUrl.replace('{width}', `${800 * window.devicePixelRatio}`)}
                    alt={image.fileName}
                    style={{
                        width: image.width,
                    }}
                />
            )}
        </>
    );
};

export const Image = ({ image, appBridge, blockSettings, isEditing, designTokens }: ImageProps) => {
    const { attachments, onAddAttachments, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachments(appBridge, ATTACHMENTS_ASSET_ID);

    const { assetDownloadEnabled } = usePrivacySettings(appBridge);

    const borderRadius = blockSettings.hasRadius_cornerRadius
        ? blockSettings.radiusValue_cornerRadius
        : radiusValues[blockSettings.radiusChoice_cornerRadius];
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle} ${toRgbaString(blockSettings.borderColor)}`
        : undefined;

    const padding = blockSettings.hasCustomPadding
        ? blockSettings.paddingCustom
        : paddingValues[blockSettings.paddingChoice];
    return (
        <div
            style={{
                padding,
                border,
                borderRadius: borderRadius ?? radiusValues[CornerRadius.None],
                backgroundColor: blockSettings.hasBackground ? toRgbaString(blockSettings.backgroundColor) : undefined,
            }}
            data-test-id="image-block-img-wrapper"
            className={joinClassNames([
                'tw-relative tw-flex tw-h-auto tw-overflow-hidden',
                mapAlignmentClasses[blockSettings.alignment],
                blockSettings.positioning === CaptionPosition.Above ||
                blockSettings.positioning === CaptionPosition.Below
                    ? 'tw-w-full'
                    : rationValues[blockSettings.ratio],
            ])}
        >
            <div className="tw-relative">
                <div className="tw-absolute tw-top-2 tw-right-2">
                    <div className="tw-flex tw-gap-2">
                        {isDownloadable(blockSettings.security, blockSettings.downloadable, assetDownloadEnabled) && (
                            <DownloadButton onDownload={() => downloadAsset(image)} />
                        )}

                        <Attachments
                            onUpload={onAddAttachments}
                            onDelete={onAttachmentDelete}
                            onReplaceWithBrowse={onAttachmentReplace}
                            onReplaceWithUpload={onAttachmentReplace}
                            onSorted={onAttachmentsSorted}
                            onBrowse={onAddAttachments}
                            items={attachments}
                            appBridge={appBridge}
                            designTokens={designTokens}
                        />
                    </div>
                </div>
                <ImageComponent
                    appBridge={appBridge}
                    blockSettings={blockSettings}
                    image={image}
                    isEditing={isEditing}
                    designTokens={designTokens}
                />
            </div>
        </div>
    );
};
