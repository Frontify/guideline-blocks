/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { RadiusExtendedSettings } from '@frontify/guideline-blocks-shared';

export type Language =
    | 'coffeescript'
    | 'css'
    | 'sass'
    | 'html'
    | 'java'
    | 'javascript'
    | 'json'
    | 'jsx'
    | 'kotlin'
    | 'livescript'
    | 'markdown'
    | 'php'
    | 'shell'
    | 'sql'
    | 'swift'
    | 'typescript'
    | 'tsx'
    | 'xml'
    | 'yaml'
    | 'python'
    | 'go'
    | 'c'
    | 'cpp'
    | 'csharp'
    | 'plain';

export const languageNameMap: Record<Language, string> = {
    coffeescript: 'CoffeeScript',
    css: 'CSS',
    sass: 'Sass',
    c: 'C',
    cpp: 'C++',
    csharp: 'C#',
    go: 'Go',
    html: 'HTML',
    java: 'Java',
    javascript: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    kotlin: 'Kotlin',
    livescript: 'LiveScript',
    markdown: 'Markdown',
    plain: 'Plain text',
    python: 'Python',
    php: 'PHP',
    shell: 'Shell',
    sql: 'SQL',
    swift: 'Swift',
    typescript: 'TypeScript',
    tsx: 'TSX',
    xml: 'XML',
    yaml: 'Yaml',
};

export type Theme =
    | 'default'
    | 'androidstudio'
    | 'atomone'
    | 'bbedit'
    | 'bespin'
    | 'darcula'
    | 'dracula'
    | 'duotoneDark'
    | 'duotoneLight'
    | 'eclipse'
    | 'githubDark'
    | 'githubLight'
    | 'gruvboxDark'
    | 'okaidia'
    | 'sublime'
    | 'xcodeDark'
    | 'xcodeLight';

export enum CodeSnippetBorderStyle {
    Solid = 'Solid',
    Dotted = 'Dotted',
    Dashed = 'Dashed',
}

export type Settings = {
    theme?: Theme;
    content?: string;
    borderColor: Color;
    language?: Language;
    hasBorder?: boolean;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    borderStyle: CodeSnippetBorderStyle;
    borderWidth: string;
} & RadiusExtendedSettings;

export const borderStyles: Record<CodeSnippetBorderStyle, string> = {
    [CodeSnippetBorderStyle.Solid]: 'solid',
    [CodeSnippetBorderStyle.Dotted]: 'dotted',
    [CodeSnippetBorderStyle.Dashed]: 'dashed',
};

export type CodeSnippetProps = {
    appBridge: AppBridgeBlock;
};
