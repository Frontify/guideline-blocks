/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getSystemFont = (elementFont: string) => (elementFont === 'default' ? 'system-ui' : elementFont);

export const getFont = (elementFont: string, mainFontFamily?: string) => {
    const mainFont = elementFont === 'inherit' ? mainFontFamily : undefined;
    return mainFont ?? getSystemFont(elementFont);
};
