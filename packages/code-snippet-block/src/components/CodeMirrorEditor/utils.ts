/* (c) Copyright Frontify Ltd., all rights reserved. */

import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { Extension } from '@codemirror/state';
import { Language, Theme } from '../../types';
import {
    base16Dark,
    base16Light,
    cobalt,
    defaultTheme,
    dracula,
    evaLight,
    gitHubDark,
    gitHubLight,
    materialDarker,
    materialLighter,
    materialPalenight,
    oneDark,
    oneLight,
} from './themes';

export const getTheme = (type: Theme): Extension => {
    const themeMapping: Record<Theme, Extension> = {
        cobalt,
        oneDark,
        dracula,
        oneLight,
        evaLight,
        gitHubDark,
        base16Dark,
        base16Light,
        gitHubLight,
        materialDarker,
        materialLighter,
        materialPalenight,
        default: defaultTheme,
    };

    return themeMapping[type] || themeMapping['default'];
};

export const getLanguage = (type: Language): Extension => {
    const langMapping: Record<Language, Extension> = {
        js: javascript(),
        html: html(),
        css: css(),
        php: php(),
        json: json(),
        jsx: javascript({ jsx: true }),
        ts: javascript({ typescript: true }),
        java: java(),
        markdown: markdown(),
    };

    return langMapping[type] || langMapping['html'];
};

export const addExtensionIf = (condition: boolean, ...extensions: Extension[]): Extension[] =>
    condition ? extensions : [];
