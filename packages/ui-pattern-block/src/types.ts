/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BorderStyle, Color, Radius } from '@frontify/guideline-blocks-settings';
import {
    amethyst,
    aquaBlue,
    atomDark,
    cobalt2,
    cyberpunk,
    dracula,
    ecoLight,
    freeCodeCampDark,
    githubLight,
    gruvboxDark,
    gruvboxLight,
    levelUp,
    monokaiPro,
    neoCyan,
    nightOwl,
    sandpackDark,
} from '@codesandbox/sandpack-themes';
import { SandpackTheme as ReactSandpackTheme } from '@codesandbox/sandpack-react/types';

export type Settings = {
    // layout
    sandpackTemplate?: SandpackTemplate;
    alignment?: Alignment;
    hasCustomPadding: boolean;
    paddingChoice: Padding;
    paddingCustom: string;
    isCustomHeight: boolean;
    customHeightValue: string;
    heightChoice: Height;
    showResponsivePreview: boolean;
    showResetButton: boolean;
    showCode: boolean;
    collapseCode: boolean;
    showSandboxLink: boolean;

    // style
    hasBackground: boolean;
    backgroundColor: Color;
    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderWidth: string;
    borderColor: Color;
    hasRadius: boolean;
    radiusChoice: Radius;
    radiusValue?: number;
    sandpackTheme: SandpackTheme;
};

export enum SandpackTemplate {
    Angular = 'angular',
    React = 'react',
    Solid = 'solid',
    Svelte = 'svelte',
    Vanilla = 'vanilla',
    Vue = 'vue',
}

export enum SandpackTheme {
    Auto = 'Auto',
    Dark = 'Dark',
    Light = 'Light',
    Amethyst = 'Amethyst',
    AquaBlue = 'AquaBlue',
    AtomDark = 'AtomDark',
    Cobalt2 = 'Cobalt2',
    Cyberpunk = 'Cyberpunk',
    Dracula = 'Dracula',
    EcoLight = 'EcoLight',
    FreeCodeCampDark = 'FreeCodeCampDark',
    GithubLight = 'GithubLight',
    GruvboxDark = 'GruvboxDark',
    GruvboxLight = 'GruvboxLight',
    LevelUp = 'LevelUp',
    MonokaiPro = 'MonokaiPro',
    NeoCyan = 'NeoCyan',
    NightOwl = 'NightOwl',
    SandpackDark = 'SandpackDark',
}

export const sandpackThemeValues: Record<SandpackTheme, 'dark' | 'auto' | 'light' | ReactSandpackTheme> = {
    [SandpackTheme.Auto]: 'auto',
    [SandpackTheme.Dark]: 'dark',
    [SandpackTheme.Light]: 'light',
    [SandpackTheme.Amethyst]: amethyst,
    [SandpackTheme.AquaBlue]: aquaBlue,
    [SandpackTheme.AtomDark]: atomDark,
    [SandpackTheme.Cobalt2]: cobalt2,
    [SandpackTheme.Cyberpunk]: cyberpunk,
    [SandpackTheme.Dracula]: dracula,
    [SandpackTheme.EcoLight]: ecoLight,
    [SandpackTheme.FreeCodeCampDark]: freeCodeCampDark,
    [SandpackTheme.GithubLight]: githubLight,
    [SandpackTheme.GruvboxDark]: gruvboxDark,
    [SandpackTheme.GruvboxLight]: gruvboxLight,
    [SandpackTheme.LevelUp]: levelUp,
    [SandpackTheme.MonokaiPro]: monokaiPro,
    [SandpackTheme.NeoCyan]: neoCyan,
    [SandpackTheme.NightOwl]: nightOwl,
    [SandpackTheme.SandpackDark]: sandpackDark,
};

export enum Alignment {
    Center = 'Center',
    Left = 'Left',
}

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingValues: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '10px',
    [Padding.Medium]: '20px',
    [Padding.Large]: '50px',
};

export enum Height {
    Auto = 'Auto',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const heightVALUES: Record<Height, string> = {
    [Height.Auto]: 'auto',
    [Height.Small]: '120px',
    [Height.Medium]: '200px',
    [Height.Large]: '300px',
};