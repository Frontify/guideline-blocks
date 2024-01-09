/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, useAttachmentsContext } from '@frontify/guideline-blocks-settings';
import { BlockAttachmentsProps } from '../types';

export const BlockAttachments = ({ appBridge }: BlockAttachmentsProps) => {
    const { attachments, onAddAttachments, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();

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
