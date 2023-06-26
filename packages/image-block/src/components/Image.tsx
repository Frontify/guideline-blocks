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
import { useFocusRing } from '@react-aria/focus';
import { AppBridgeBlock, Asset, usePrivacySettings } from '@frontify/app-bridge';
import { ATTACHMENTS_ASSET_ID } from '../settings';
import { getImageStyle } from './helpers';
import { FOCUS_STYLE } from '@frontify/fondue';

type ImageProps = {
    image: Asset;
    blockSettings: Settings;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
};

export const ImageComponent = ({ image, blockSettings, isEditing, appBridge }: ImageProps) => {
    const link = blockSettings?.hasLink && blockSettings?.linkObject?.link && blockSettings?.linkObject;
    const imageStyle = getImageStyle(blockSettings, image.width);
    const { isFocused, focusProps } = useFocusRing();

    const Image = (
        <img
            data-test-id="image-block-img"
            className="tw-flex tw-w-full"
            loading="lazy"
            src={image.genericUrl.replace('{width}', `${800 * (window?.devicePixelRatio ?? 1)}`)}
            alt={blockSettings.altText || undefined}
            style={imageStyle}
        />
    );

    const props = {
        ...focusProps,
        className: joinClassNames(['tw-rounded', isFocused && FOCUS_STYLE]),
    };

    return (
        <>
            {isEditing ? (
                Image
            ) : (
                <>
                    {link ? (
                        <a
                            {...props}
                            href={link.link.link}
                            target={link.openInNewTab ? '_blank' : undefined}
                            rel={link.openInNewTab ? 'noopener noreferrer' : 'noreferrer'}
                        >
                            {Image}
                        </a>
                    ) : (
                        <button {...props} onClick={() => appBridge.openAssetViewer(image.token)}>
                            {Image}
                        </button>
                    )}
                </>
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
            className={joinClassNames(['tw-relative tw-flex tw-h-auto', mapAlignmentClasses[blockSettings.alignment]])}
        >
            <div className="tw-flex tw-items-start">
                <div className="tw-absolute tw-top-2 tw-right-2 tw-z-50">
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
