/* (c) Copyright Frontify Ltd., all rights reserved. */

export const copyToClipboard = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
};
