/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';

type CopyButtonLabelProps = {
    isCopied: boolean;
};

export const CopyButtonLabel = ({ isCopied }: CopyButtonLabelProps) =>
    isCopied ? (
        <>
            <IconCheckMark size={16} /> Copied
        </>
    ) : (
        <>
            <IconClipboard size={16} /> Copy
        </>
    );
