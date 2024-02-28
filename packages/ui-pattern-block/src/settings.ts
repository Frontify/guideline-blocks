/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    Radius,
    appendUnit,
    defineSettings,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import {
    Alignment,
    Height,
    Padding,
    Preprocessor,
    SandpackTemplate,
    SandpackTheme,
    TextAlignment,
    heightValues,
    paddingValues,
} from './types';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './helpers';

const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';

const BORDER_SETTING = getBorderSettings({ defaultColor: BORDER_COLOR_DEFAULT_VALUE, defaultValue: true });

export const settings = defineSettings({
    main: [
        {
            id: 'sandpackTemplate',
            type: 'dropdown',
            defaultValue: SandpackTemplate.Vanilla,
            size: 'large',
            choices: [
                {
                    value: SandpackTemplate.Vanilla,
                    label: 'Vanilla',
                },
                {
                    value: SandpackTemplate.React,
                    label: 'React',
                },
                {
                    value: SandpackTemplate.Angular,
                    label: 'Angular',
                },
                {
                    value: SandpackTemplate.Svelte,
                    label: 'Svelte',
                },

                {
                    value: SandpackTemplate.Vue,
                    label: 'Vue',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'preprocessor',
            type: 'segmentedControls',
            label: 'CSS preprocessor',
            defaultValue: Preprocessor.None,
            show: (bundle) => bundle.getBlock('sandpackTemplate')?.value?.toString() === SandpackTemplate.Vanilla,
            choices: [
                {
                    value: Preprocessor.None,
                },
                {
                    value: Preprocessor.SCSS,
                },
                {
                    value: Preprocessor.LESS,
                },
            ],
        },
        {
            id: 'uiPatternBasicsPreview',
            type: 'sectionHeading',
            label: 'Preview',
            blocks: [
                {
                    id: 'showResponsivePreview',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Show responsive preview',
                },
                {
                    id: 'showResetButton',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Show reset button',
                },
            ],
        },
        {
            id: 'uiPatternBasicsLinks',
            type: 'sectionHeading',
            label: 'Links',
            blocks: [
                {
                    id: 'showSandboxLink',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Show sandbox link',
                },
            ],
        },
        {
            id: 'uiPatternBasicsSnippet',
            type: 'sectionHeading',
            label: 'Snippet',
            blocks: [
                {
                    id: 'showCode',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Show code',
                },
                {
                    id: 'isCodeEditable',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Editable',
                    show: (bundle) => !!bundle.getBlock('showCode')?.value,
                },
                {
                    id: 'shouldCollapseCodeByDefault',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Collapse by default',
                    show: (bundle) => !!bundle.getBlock('showCode')?.value,
                },
            ],
        },
        {
            id: 'uiPatternDependencies',
            type: 'sectionHeading',
            label: 'Dependencies',
            blocks: [
                {
                    id: 'showNpmDependencies',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Show NPM dependencies',
                },
                {
                    id: 'showExternalDependencies',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Show external dependencies',
                },
                {
                    id: 'shouldCollapseDependenciesByDefault',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Collapse by default',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'uiPatternLabels',
            type: 'sectionHeading',
            label: 'Labels',
            blocks: [
                {
                    id: 'labelPosition',
                    type: 'segmentedControls',
                    label: 'Alignment',
                    defaultValue: TextAlignment.Top,
                    choices: [
                        {
                            value: TextAlignment.Bottom,
                            icon: IconEnum.MediaObjectTextBottom,
                        },
                        {
                            value: TextAlignment.Top,
                            icon: IconEnum.MediaObjectTextTop,
                        },
                    ],
                },
            ],
        },
        {
            id: 'uiPatternLayout',
            type: 'sectionHeading',
            label: 'Preview',
            blocks: [
                {
                    id: 'alignment',
                    type: 'segmentedControls',
                    label: 'Alignment',
                    defaultValue: Alignment.Left,
                    choices: [
                        {
                            value: Alignment.Left,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: Alignment.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                    ],
                },
                {
                    id: 'hasCustomPadding',
                    type: 'switch',
                    defaultValue: false,
                    switchLabel: 'Custom',
                    label: 'Padding',
                    info: 'The spacing around the preview.',
                    onChange: (bundle) =>
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_CUSTOM_ID, paddingValues),
                    on: [
                        {
                            id: PADDING_CUSTOM_ID,
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => appendUnit(bundle, PADDING_CUSTOM_ID),
                        },
                    ],
                    off: [
                        {
                            id: PADDING_CHOICE_ID,
                            type: 'segmentedControls',
                            defaultValue: Padding.None,
                            choices: [
                                {
                                    value: Padding.None,
                                    label: 'None',
                                },
                                {
                                    value: Padding.Small,
                                    label: 'S',
                                },
                                {
                                    value: Padding.Medium,
                                    label: 'M',
                                },
                                {
                                    value: Padding.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'isCustomHeight',
                    label: 'Height',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => presetCustomValue(bundle, 'heightChoice', 'customHeightValue', heightValues),

                    on: [
                        {
                            id: 'customHeightValue',
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            defaultValue: '60px',
                            placeholder: '60px',
                            onChange: (bundle) => appendUnit(bundle, 'customHeightValue'),
                        },
                    ],
                    off: [
                        {
                            id: 'heightChoice',
                            type: 'segmentedControls',
                            defaultValue: Height.Auto,
                            choices: [
                                {
                                    value: Height.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: Height.Small,
                                    label: 'S',
                                },
                                {
                                    value: Height.Medium,
                                    label: 'M',
                                },
                                {
                                    value: Height.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'uiPreviewSection',
            type: 'sectionHeading',
            blocks: [
                {
                    id: 'sandpackTheme',
                    type: 'dropdown',
                    defaultValue: SandpackTheme.GithubLight,
                    size: 'small',
                    label: 'Snippet color scheme',
                    choices: [
                        {
                            value: SandpackTheme.Dark,
                        },
                        {
                            value: SandpackTheme.Light,
                        },
                        {
                            value: SandpackTheme.Amethyst,
                        },
                        {
                            value: SandpackTheme.AquaBlue,
                        },
                        {
                            value: SandpackTheme.AtomDark,
                        },
                        {
                            value: SandpackTheme.Cobalt2,
                        },
                        {
                            value: SandpackTheme.Cyberpunk,
                        },
                        {
                            value: SandpackTheme.Dracula,
                        },
                        {
                            value: SandpackTheme.EcoLight,
                        },
                        {
                            value: SandpackTheme.FreeCodeCampDark,
                        },
                        {
                            value: SandpackTheme.GithubLight,
                        },
                        {
                            value: SandpackTheme.GruvboxDark,
                        },
                        {
                            value: SandpackTheme.GruvboxLight,
                        },
                        {
                            value: SandpackTheme.LevelUp,
                        },
                        {
                            value: SandpackTheme.MonokaiPro,
                        },
                        {
                            value: SandpackTheme.NeoCyan,
                        },
                        {
                            value: SandpackTheme.NightOwl,
                        },
                        {
                            value: SandpackTheme.SandpackDark,
                        },
                    ],
                },
                getBackgroundSettings({ defaultColor: BACKGROUND_COLOR_DEFAULT_VALUE, label: 'Pattern background' }),
                BORDER_SETTING,
                getBorderRadiusSettings({ defaultRadius: Radius.Medium, dependentSettingId: BORDER_SETTING.id }),
            ],
        },
    ],
});
