/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FontType } from './types';

export const useFonts = (appBridge: any): FontType[] => {
    return [
        { id: 1, name: 'Space Grotesk Frontify', fontFamily: 'Space Grotesk Frontify', numberOfStyles: 1 },
        { id: 1, name: 'Comic Sans MS', fontFamily: 'Comic Sans MS', numberOfStyles: 14 },
        { id: 1, name: 'Times New Roman', fontFamily: 'Times New Roman', numberOfStyles: 6 },
    ];
};
