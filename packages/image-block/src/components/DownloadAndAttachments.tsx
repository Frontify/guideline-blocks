/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Attachments,
    DownloadButton,
    isDownloadable,
    useAttachmentsContext,
} from '@frontify/guideline-blocks-settings';
import { getTotalImagePadding } from './helpers';
import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Settings } from '../types';

type DownloadAndAttachmentsProps = {
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    image?: Asset;
    blockSettings: Settings;
    assetDownloadEnabled: boolean;
};

export const DownloadAndAttachments = ({
    appBridge,
    isEditing,
    image,
    blockSettings,
    assetDownloadEnabled,
}: DownloadAndAttachmentsProps) => {
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();

    return !isEditing ? (
        <div className="tw-absolute tw-top-2 tw-right-2 tw-z-50">
            <div
                className="tw-flex tw-gap-2"
                data-test-id="buttons-wrapper"
                style={getTotalImagePadding(blockSettings)}
            >
                {image?.isDownloadProtected === false &&
                    isDownloadable(blockSettings.security, blockSettings.downloadable, assetDownloadEnabled) && (
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
    ) : null;
};
