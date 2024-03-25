/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Attachments, useAttachmentsContext } from '@frontify/guideline-blocks-settings';
import { AppBridgeBlock } from '@frontify/app-bridge';

type Props = {
    appBridge: AppBridgeBlock;
};

export const AttachmentsButton = ({ appBridge }: Props): ReactElement => {
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
