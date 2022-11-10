/* (c) Copyright Frontify Ltd., all rights reserved. */

export const hasRichTextValue = (string?: string) => {
    if (!string) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasText = (children: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children.some((child: { text: string; children: any }) => {
            if (child.text) {
                return child.text !== '';
            }
            if (child.children) {
                return hasText(child.children);
            }
            return false;
        });

    try {
        const json = JSON.parse(string);
        return hasText(json);
    } catch (error) {
        return false;
    }
};
