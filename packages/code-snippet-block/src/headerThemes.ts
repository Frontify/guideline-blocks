/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { type Theme } from './types';

type headerStyles = {
    backgroundColor: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
};

export const headerThemes: Record<Theme, headerStyles> = {
    default: { backgroundColor: '#f5f5f5', color: '#6c6c6c' },
    abcdef: { backgroundColor: '#0f0f0f', color: '#defdef' },
    androidstudio: { backgroundColor: '#282b2e', color: '#a9b7c6' },
    atomone: { backgroundColor: '#272C35', color: '#9d9b97' },
    bbedit: { backgroundColor: '#FFFFFF', color: '#000000' },
    bespin: { backgroundColor: '#28211c', color: '#9d9b97' },
    darcula: { backgroundColor: '#2B2B2B', color: '#f8f8f2' },
    dracula: { backgroundColor: '#282a36', color: '#f8f8f2' },
    duotoneDark: { backgroundColor: '#2a2734', color: '#6c6783' },
    duotoneLight: { backgroundColor: '#faf8f5', color: '#b29762' },
    eclipse: { backgroundColor: '#ffffff', color: '#000000' },
    githubDark: { backgroundColor: '#0d1117', color: '#c9d1d9' },
    githubLight: { backgroundColor: '#ffffff', color: '#24292e' },
    gruvboxDark: { backgroundColor: '#282828', color: '#ebdbb2' },
    okaidia: { backgroundColor: '#272822', color: '#ffffff' },
    sublime: { backgroundColor: '#303841', color: '#FFFFFF' },
    xcodeDark: { backgroundColor: '#292A30', color: '#CECFD0' },
    xcodeLight: { backgroundColor: '#ffffff', color: '#3D3D3D' },
};
