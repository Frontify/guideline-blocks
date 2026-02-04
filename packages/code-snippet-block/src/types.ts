/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, type RadiusExtendedSettings } from '@frontify/guideline-blocks-settings';

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
    | 'abcdef'
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

export const themeNameMap: Record<Theme, string> = {
    default: 'Default theme',
    abcdef: 'Abcdef',
    androidstudio: 'Android Studio',
    atomone: 'Atom One',
    bbedit: 'BBEdit',
    bespin: 'Bespin',
    darcula: 'Darcula',
    dracula: 'Dracula',
    duotoneDark: 'Duotone Dark',
    duotoneLight: 'Duotone Light',
    eclipse: 'Eclipse',
    githubDark: 'GitHub Dark',
    githubLight: 'GitHub Light',
    gruvboxDark: 'Gruvbox Dark',
    okaidia: 'Okaidia',
    sublime: 'Sublime',
    xcodeDark: 'Xcode Dark',
    xcodeLight: 'Xcode Light',
};

export enum CodeSnippetBorderStyle {
    Solid = 'Solid',
    Dotted = 'Dotted',
    Dashed = 'Dashed',
}

export type Settings = {
    theme?: Theme;
    content?: string;
    borderColor: Color | null;
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
