/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import {
    Alignment,
    Height,
    Padding,
    SandpackTemplate,
    SandpackTheme,
    TemplateDependencies,
    TemplateFiles,
} from '../types';

export const BACKGROUND_COLOR_DEFAULT_VALUE = {
    red: 241,
    green: 241,
    blue: 241,
    alpha: 1,
};

export const BORDER_COLOR_DEFAULT_VALUE = {
    red: 8,
    green: 8,
    blue: 8,
    alpha: 0.15,
};

export const BORDER_WIDTH_DEFAULT_VALUE = '1px';

export const DEFAULT_BLOCK_SETTINGS = {
    sandpackTemplate: SandpackTemplate.Vanilla,
    sandpackTheme: SandpackTheme.GithubLight,
    files: {} as TemplateFiles,
    alignment: Alignment.Left,
    dependencies: {} as TemplateDependencies,
    paddingChoice: Padding.None,
    paddingCustom: '0px',
    hasCustomPadding: false,
    heightChoice: Height.Auto,
    customHeightValue: '60px',
    isCustomHeight: false,
    showResetButton: true,
    showSandboxLink: true,
    showResponsivePreview: true,
    showCode: true,
    isCodeEditable: false,
    showNpmDependencies: true,
    showExternalDependencies: true,
    shouldCollapseCodeByDefault: false,
    shouldCollapseDependenciesByDefault: true,
    backgroundColor: BACKGROUND_COLOR_DEFAULT_VALUE,
    hasBackground: false,
    borderColor: BORDER_COLOR_DEFAULT_VALUE,
    borderStyle: BorderStyle.Solid,
    borderWidth: BORDER_WIDTH_DEFAULT_VALUE,
    hasBorder: true,
    hasRadius: false,
    radiusChoice: Radius.Medium,
    radiusValue: 4,
    description: undefined,
    title: undefined,
};
