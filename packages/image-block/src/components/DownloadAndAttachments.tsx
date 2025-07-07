/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, DownloadButton, useAttachmentsContext } from '@frontify/guideline-blocks-settings';
import { announce } from '@react-aria/live-announcer';
import { getTotalImagePadding } from './helpers';
import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Settings } from '../types';
import { isImageDownloadable } from '../helpers/isImageDownloadable';
import { useCallback } from 'react';

type DownloadAndAttachmentsProps = {
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    image?: Asset;
    altText?: string;
    blockSettings: Settings;
    isAssetDownloadable: boolean;
};

export const DownloadAndAttachments = ({
    appBridge,
    isEditing,
    image,
    altText,
    blockSettings,
    isAssetDownloadable,
}: DownloadAndAttachmentsProps) => {
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();

    const isDownloadable = isImageDownloadable(isAssetDownloadable, image);

    const onDownloadHandler = useCallback(() => {
        if (!image) {
            return;
        }

        announce('File downloaded successfully');
        appBridge.dispatch({ name: 'downloadAsset', payload: image });
    }, [appBridge, image]);

    if (isEditing) {
        return null;
    }

    const imageAriaLabel = altText ? `Download ${altText}` : 'Download image';
    const paddingStyle = getTotalImagePadding(blockSettings);

    return (
        <div className="tw-absolute tw-top-2 tw-right-2 tw-z-50">
            <div className="tw-flex tw-gap-2" data-test-id="buttons-wrapper" style={paddingStyle}>
                {image && isDownloadable && (
                    <DownloadButton onDownload={onDownloadHandler} ariaLabel={imageAriaLabel} />
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
    );
};
