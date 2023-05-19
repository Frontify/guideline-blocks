/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, useAttachments } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps } from '../types';
import { ATTACHMENTS_ASSET_ID } from '../settings';

export const BlockAttachments = ({ appBridge }: BlockAttachmentsProps) => {
    const { attachments, onAddAttachments, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachments(appBridge, ATTACHMENTS_ASSET_ID);

    return (
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
    );
};
