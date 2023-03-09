/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, downloadAsset, useAttachments } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps } from '../types';
import { ATTACHMENTS_SETTING_ID } from '../settings';

export const BlockAttachments = ({ assetToDownload, appBridge }: BlockAttachmentsProps) => {
    const {
        sortedAttachments: attachments,
        onAddAttachments,
        onAttachmentDelete,
        onAttachmentReplace,
        onAttachmentsSorted,
    } = useAttachments(appBridge, ATTACHMENTS_SETTING_ID, ATTACHMENTS_SETTING_ID);

    return (
        <div>
            <Attachments
                onUploadAttachments={onAddAttachments}
                onAttachmentDelete={onAttachmentDelete}
                onAttachmentReplaceWithBrowse={onAttachmentReplace}
                onAttachmentReplaceWithUpload={onAttachmentReplace}
                onAttachmentsSorted={onAttachmentsSorted}
                onBrowseAttachments={onAddAttachments}
                attachmentItems={attachments}
                appBridge={appBridge}
                onDownload={() => downloadAsset(assetToDownload)}
            />
        </div>
    );
};
