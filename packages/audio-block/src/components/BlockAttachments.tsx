/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Attachments, useAttachmentsContext } from '@frontify/guideline-blocks-settings';
import { BlockAttachmentsProps } from '../types';

export const BlockAttachments = ({ appBridge }: BlockAttachmentsProps) => {
    const { attachments, onAttachmentsAdd, onAttachmentDelete, onAttachmentReplace, onAttachmentsSorted } =
        useAttachmentsContext();

    return (
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
    );
};
