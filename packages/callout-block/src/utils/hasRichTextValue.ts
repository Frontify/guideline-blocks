/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasRichTextValue = (string?: string) => {
    if (!string) {
        return false;
    }
    const json = JSON.parse(string);

    const hasText = (children: any) =>
        children.some((child: { text: string; children: any }) => {
            if (child.text) {
                return child.text !== '';
            }
            if (child.children) {
                return hasText(child.children);
            }
            return false;
        });
    return hasText(json);
};
