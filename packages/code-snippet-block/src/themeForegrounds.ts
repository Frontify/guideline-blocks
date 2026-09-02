/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    defaultSettingsAbcdef,
    defaultSettingsAndroidstudio,
    defaultSettingsAtomone,
    defaultSettingsBbedit,
    defaultSettingsBespin,
    defaultSettingsDarcula,
    defaultSettingsDracula,
    defaultSettingsDuotoneDark,
    defaultSettingsDuotoneLight,
    defaultSettingsEclipse,
    defaultSettingsGithubDark,
    defaultSettingsGithubLight,
    defaultSettingsGruvboxDark,
    defaultSettingsOkaidia,
    defaultSettingsSublime,
    defaultSettingsXcodeDark,
    defaultSettingsXcodeLight,
} from '@uiw/codemirror-themes-all';

import { type Theme } from './types';

/**
 * CodeMirror's built-in light theme sets no foreground of its own, so the "Default theme" choice
 * falls back to the same black the browser would paint.
 */
const DEFAULT_THEME_FOREGROUND = '#000000';

/**
 * The foreground each colour scheme paints its code in. Taken from the theme packages themselves so
 * the values cannot drift away from what CodeMirror actually renders.
 */
export const themeForegrounds: Record<Theme, string> = {
    default: DEFAULT_THEME_FOREGROUND,
    abcdef: defaultSettingsAbcdef.foreground ?? DEFAULT_THEME_FOREGROUND,
    androidstudio: defaultSettingsAndroidstudio.foreground ?? DEFAULT_THEME_FOREGROUND,
    atomone: defaultSettingsAtomone.foreground ?? DEFAULT_THEME_FOREGROUND,
    bbedit: defaultSettingsBbedit.foreground ?? DEFAULT_THEME_FOREGROUND,
    bespin: defaultSettingsBespin.foreground ?? DEFAULT_THEME_FOREGROUND,
    darcula: defaultSettingsDarcula.foreground ?? DEFAULT_THEME_FOREGROUND,
    dracula: defaultSettingsDracula.foreground ?? DEFAULT_THEME_FOREGROUND,
    duotoneDark: defaultSettingsDuotoneDark.foreground ?? DEFAULT_THEME_FOREGROUND,
    duotoneLight: defaultSettingsDuotoneLight.foreground ?? DEFAULT_THEME_FOREGROUND,
    eclipse: defaultSettingsEclipse.foreground ?? DEFAULT_THEME_FOREGROUND,
    githubDark: defaultSettingsGithubDark.foreground ?? DEFAULT_THEME_FOREGROUND,
    githubLight: defaultSettingsGithubLight.foreground ?? DEFAULT_THEME_FOREGROUND,
    gruvboxDark: defaultSettingsGruvboxDark.foreground ?? DEFAULT_THEME_FOREGROUND,
    okaidia: defaultSettingsOkaidia.foreground ?? DEFAULT_THEME_FOREGROUND,
    sublime: defaultSettingsSublime.foreground ?? DEFAULT_THEME_FOREGROUND,
    xcodeDark: defaultSettingsXcodeDark.foreground ?? DEFAULT_THEME_FOREGROUND,
    xcodeLight: defaultSettingsXcodeLight.foreground ?? DEFAULT_THEME_FOREGROUND,
};
