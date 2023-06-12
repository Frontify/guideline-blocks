/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, mapAlignmentClasses } from '../types';
import {
    Attachments,
    DownloadButton,
    downloadAsset,
    isDownloadable,
    joinClassNames,
    useAttachments,
} from '@frontify/guideline-blocks-shared';
import { AppBridgeBlock, Asset, usePrivacySettings } from '@frontify/app-bridge';
import { ATTACHMENTS_ASSET_ID } from '../settings';
import { getImageStyle } from './helpers';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
};

export const ImageComponent = ({ image, blockSettings, isEditing }: ImageProps) => {
    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link && blockSettings?.linkObject;
    const imageStyle = getImageStyle(blockSettings, image.width);
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
                        style={imageStyle}
                    />
                </a>
            ) : (
                <img
                    data-test-id="image-block-img"
                    className="tw-flex"
                    loading="lazy"
                    src={image.genericUrl.replace('{width}', `${800 * window.devicePixelRatio}`)}
                    alt={image.fileName}
                    style={imageStyle}
                />
            )}
        </>
    );
};

export const Image = ({ image, appBridge, blockSettings, isEditing }: ImageProps) => {
    const { attachments, onAddAttachments, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachments(appBridge, ATTACHMENTS_ASSET_ID);

    const { assetDownloadEnabled } = usePrivacySettings(appBridge);

    return (
        <div
            data-test-id="image-block-img-wrapper"
            className={joinClassNames([
                'tw-relative tw-flex tw-h-auto tw-overflow-hidden',
                mapAlignmentClasses[blockSettings.alignment],
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
                        />
                    </div>
                </div>
                <ImageComponent
                    appBridge={appBridge}
                    blockSettings={blockSettings}
                    image={image}
                    isEditing={isEditing}
                />
            </div>
        </div>
    );
};
