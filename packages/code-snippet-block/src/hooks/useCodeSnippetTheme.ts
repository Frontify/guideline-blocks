/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setAlpha } from '@frontify/guideline-blocks-settings';
import * as themes from '@uiw/codemirror-themes-all';
import { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { type CSSProperties, useMemo } from 'react';

import { headerThemes } from '../headerThemes';
import { type Theme } from '../types';

type CodeSnippetTheme = {
    editorTheme: ReactCodeMirrorProps['theme'];
    headerStyle: CSSProperties;
    headerButtonStyle: CSSProperties;
    headerSelectStyle: CSSProperties;
};

export const useCodeSnippetTheme = (theme: Theme): CodeSnippetTheme =>
    useMemo(() => {
        const headerStyle = headerThemes[theme];

        return {
            editorTheme: theme !== 'default' && Object.keys(themes).includes(theme) ? themes[theme] : 'light',
            headerStyle,
            headerButtonStyle: {
                ...headerStyle,
                color: theme === 'default' ? '#000000' : headerStyle.color,
            },
            headerSelectStyle: {
                '--base-color': headerStyle.backgroundColor,
                '--text-color': headerStyle.color,
                '--line-color-xx-strong': setAlpha(0.8, headerStyle.color),
            } as CSSProperties,
        };
    }, [theme]);
