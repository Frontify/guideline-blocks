/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, useAttachments } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps } from '../types';
import { ATTACHMENTS_SETTING_ID } from '../settings';

export const BlockAttachments = ({ appBridge }: BlockAttachmentsProps) => {
    const {
        sortedAttachments: attachments,
        onAddAttachments,
        onAttachmentDelete,
        onAttachmentReplace,
        onAttachmentsSorted,
    } = useAttachments(appBridge, ATTACHMENTS_SETTING_ID, ATTACHMENTS_SETTING_ID);

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
