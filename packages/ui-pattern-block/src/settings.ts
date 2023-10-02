/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    appendUnit,
    defineSettings,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { Alignment, Height, Padding, SandpackTemplate, SandpackTheme, paddingValues } from './types';

const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';

export const settings = defineSettings({
    main: [
        {
            id: 'sandpackTemplate',
            type: 'dropdown',
            defaultValue: SandpackTemplate.Vanilla,
            size: 'large',
            choices: [
                {
                    value: SandpackTemplate.Angular,
                    label: 'Angular',
                },
                {
                    value: SandpackTemplate.React,
                    label: 'React',
                },
                {
                    value: SandpackTemplate.Solid,
                    label: 'Solid',
                },
                {
                    value: SandpackTemplate.Svelte,
                    label: 'Svelte',
                },
                {
                    value: SandpackTemplate.Vanilla,
                    label: 'Vanilla',
                },
                {
                    value: SandpackTemplate.Vue,
                    label: 'Vue',
                },
            ],
        },
    ],
    layout: [
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
                    info: 'The spacing around the image.',
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
            id: 'uiPatternSnippets',
            type: 'sectionHeading',
            label: 'Snippets',
            blocks: [
                {
                    id: 'showCode',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Show code',
                },
                {
                    id: 'collapseCode',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Collapse code by default',
                },
            ],
        },
        {
            id: 'uiPatternLinks',
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
    ],
    style: [
        {
            id: 'uiPreviewSection',
            type: 'sectionHeading',
            blocks: [getBackgroundSettings(), getBorderSettings(), getBorderRadiusSettings()],
        },
        {
            id: 'uiSnippetSection',
            type: 'sectionHeading',
            label: 'Snippet',
            blocks: [
                {
                    id: 'sandpackTheme',
                    type: 'dropdown',
                    defaultValue: SandpackTheme.Auto,
                    size: 'small',
                    label: 'Color scheme',
                    choices: [
                        {
                            value: SandpackTheme.Auto,
                        },
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
            ],
        },
    ],
});
