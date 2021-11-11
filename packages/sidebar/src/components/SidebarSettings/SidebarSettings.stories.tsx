/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Breadcrumb, DropdownSize, MultiInputLayout, IconEnum } from '@frontify/arcade';
import { Meta, Story } from '@storybook/react';
import { SidebarSettings as SidebarSettingsComponent, SidebarSettingsProps } from './SidebarSettings';
import { ApiBundle } from './hooks/useApiBundle';
import {
    AssetInputBlock,
    BlockType,
    ChecklistBlock,
    DropdownBlock,
    InputBlock,
    MultiInputBlock,
    SliderBlock,
    SwitchBlock,
} from './hooks/useSettings';
import {
    maximumNumericalPixelValueOrAuto,
    minimumNumericalPixelValueOrAuto,
    numericalPixelValueOrAutoRule,
} from './rules/pixelRules';
import { FileExtensionSets } from '@frontify/app-bridge';

const assetInputSetting: AssetInputBlock = {
    id: 'asset-input',
    type: BlockType.AssetInput,
    label: 'Asset Input',
    allowedExtensions: FileExtensionSets.images,
};

const colorInputSetting = {
    id: 'color-input',
    type: BlockType.ColorInput,
    label: 'Color Input',
};

const inputSetting: InputBlock = {
    id: 'input',
    type: BlockType.Input,
    label: 'Normal Input',
    placeholder: 'Input',
};

const inputSettingWithValidation: InputBlock = {
    id: 'inputWithValidation',
    type: BlockType.Input,
    label: 'Input with validation',
    info: "The value should be a number or 'auto'.",
    placeholder: '24px',
    defaultValue: 'auto',
    rules: [numericalPixelValueOrAutoRule, minimumNumericalPixelValueOrAuto(0), maximumNumericalPixelValueOrAuto(200)],
    onChange: (bundle: ApiBundle): void => {
        const columnGap = Number(bundle.getBlock('inputWithValidation')?.value);
        if (!isNaN(columnGap)) {
            bundle.setBlockValue('inputWithValidation', `${columnGap}px`);
        }
    },
};

const multiBlockSetting: MultiInputBlock = {
    id: 'multi-blocks-input',
    type: BlockType.MultiInput,
    label: 'Multi Blocks Input',
    layout: MultiInputLayout.Spider,
    blocks: [
        {
            id: 'top-input',
            type: BlockType.Input,
            defaultValue: 'Top',
        },
        {
            id: 'left-input',
            type: BlockType.Input,
            defaultValue: 'Left',
        },
        {
            id: 'right-input',
            type: BlockType.Input,
            defaultValue: 'Right',
        },
        {
            id: 'bottom-input',
            type: BlockType.Input,
            defaultValue: 'Bottom',
        },
    ],
    lastItemFullWidth: true,
};

const multiBlockInputsSetting: MultiInputBlock = {
    id: 'multi-input',
    type: BlockType.MultiInput,
    label: 'Multi Input',
    layout: MultiInputLayout.Spider,
    blocks: [
        {
            id: 'top-input',
            type: BlockType.Input,
            defaultValue: 'Top',
        },
        {
            id: 'left-input',
            type: BlockType.Input,
            defaultValue: 'Left',
        },
        {
            id: 'right-input',
            type: BlockType.Input,
            defaultValue: 'Right',
        },
        {
            id: 'bottom-input',
            type: BlockType.Input,
            defaultValue: 'Bottom',
        },
    ],
    lastItemFullWidth: true,
};

const checklistSettings: ChecklistBlock = {
    id: 'checklist',
    type: BlockType.Checklist,
    label: 'Checklist',
    choices: [
        { id: 'never', label: 'Never' },
        { id: 'gonna', label: 'Gonna' },
        { id: 'give', label: 'Give' },
        { id: 'you', label: 'You' },
        { id: 'up', label: 'Up' },
    ],
    defaultValue: [],
    showClearAndSelectAllButtons: true,
};

const dropdownSetting: DropdownBlock = {
    id: 'dropdown',
    type: BlockType.Dropdown,
    defaultValue: 'text',
    disabled: true,
    choices: [
        {
            value: 'storybook-demo',
            label: 'Storybook Demo',
            icon: IconEnum.Storybook,
        },
    ],
    size: DropdownSize.Large,
};

const sliderSetting: SliderBlock = {
    id: 'slider',
    label: 'Slider',
    type: BlockType.Slider,
    defaultValue: 'auto',
    choices: [
        {
            value: 'auto',
            label: 'auto',
        },
        {
            value: '10px',
            label: 'S',
        },
        {
            value: '20px',
            label: 'M',
        },
        {
            value: '30px',
            label: 'L',
        },
    ],
};

const switchSetting: SwitchBlock = {
    id: 'switch',
    type: BlockType.Switch,
    defaultValue: false,
    label: 'Switch',
};

const advancedSwitchSetting: SwitchBlock = {
    id: 'isCustomSwitch',
    label: 'Advanced Switch',
    type: BlockType.Switch,
    switchLabel: 'Custom',
    defaultValue: false,
    on: [
        {
            id: 'switch_custom',
            type: BlockType.Input,
            defaultValue: 'auto',
            rules: [
                numericalPixelValueOrAutoRule,
                minimumNumericalPixelValueOrAuto(0),
                maximumNumericalPixelValueOrAuto(200),
            ],
            onChange: (bundle: ApiBundle): void => {
                const columnGap = Number(bundle.getBlock('switch_custom')?.value);
                if (!isNaN(columnGap)) {
                    bundle.setBlockValue('switch_custom', `${columnGap}px`);
                }
            },
        },
    ],
    off: [
        {
            id: 'switch_simple',
            type: BlockType.Slider,
            defaultValue: 'auto',
            choices: [
                {
                    value: 'auto',
                    label: 'Auto',
                },
                {
                    value: '4px',
                    label: 'S',
                },
                {
                    value: '8px',
                    label: 'M',
                },
                {
                    value: '12px',
                    label: 'L',
                },
            ],
        },
    ],
};

export default {
    title: 'Sidebar Settings',
    component: SidebarSettingsComponent,
    args: {
        breadcrumbs: [{ label: 'Element1' }, { label: 'Element 2' }, { label: 'Element 3' }] as Breadcrumb[],
        settings: {},
        targets: [],
        targetsEnabled: false,
        settingsStructure: {
            assetInput: [assetInputSetting],
            colorInput: [colorInputSetting],
            checklist: [checklistSettings],
            dropdown: [
                { ...dropdownSetting, size: DropdownSize.Small },
                { ...dropdownSetting, size: DropdownSize.Large },
                { ...dropdownSetting, size: DropdownSize.Large, disabled: true },
            ],
            input: [inputSetting, inputSettingWithValidation],
            multiInput: [multiBlockSetting, multiBlockInputsSetting],
            slider: [sliderSetting],
            switch: [switchSetting, advancedSwitchSetting],
        },
    },
    argTypes: {
        onClosed: { action: 'onClosed' },
        onValueChanged: { action: 'onValueChanged' },
    },
} as Meta;

export const Sidebar: Story<SidebarSettingsProps> = (args: SidebarSettingsProps) => (
    <SidebarSettingsComponent {...args} />
);
