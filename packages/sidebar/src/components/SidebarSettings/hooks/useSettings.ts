/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState, useCallback } from 'react';
import { set } from 'lodash-es';
import { FileExtension } from '@frontify/app-bridge';
import { AssetInputProps, DropdownSize, MultiInputLayout, TextInputType, Color, IconEnum } from '@frontify/arcade';
import { applyDataToStructure, createPaths } from '../helpers/settings';
import { UpdateDataFunction } from '../hocs/withSettings';
import { ApiCondition } from './useCondition';
import { ApiOnChange } from './useOnChange';

type BaseBlock = {
    id: string;
    label?: string;
    info?: string;
    show?: ApiCondition;
    onChange?: ApiOnChange;
};

export enum BlockType {
    AssetInput = 'assetInput',
    Checklist = 'checklist',
    ColorInput = 'colorInput',
    Dropdown = 'dropdown',
    Input = 'input',
    MultiInput = 'multiInput',
    Slider = 'slider',
    Switch = 'switch',
    Targets = 'targets',
}

export type Choice = {
    label: string;
    icon?: IconEnum;
    value: string;
};

export type ChoicesType = {
    choices: Choice[];
    value?: string;
    defaultValue: string;
} & BaseBlock;

export type DropdownBlock = {
    type: BlockType.Dropdown;
    disabled?: boolean;
    placeholder?: string;
    size?: DropdownSize;
} & ChoicesType;

export type SliderBlock = {
    type: BlockType.Slider;
    helperText?: string;
} & ChoicesType;

export type InputBlock = {
    type: BlockType.Input;
    inputType?: TextInputType;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    clearable?: boolean;
    rules?: Rule<string>[];
} & BaseBlock;

export type MultiInputBlock = {
    type: BlockType.MultiInput;
    layout: MultiInputLayout;
    blocks: (Omit<InputBlock, 'value'> | Omit<ColorInputBlock, 'value'> | Omit<DropdownBlock, 'value'>)[];
    value?: (InputBlock['value'] | ColorInputBlock['value'] | DropdownBlock['value'])[];
    lastItemFullWidth?: boolean;
} & BaseBlock;

export type ColorInputBlock = {
    type: BlockType.ColorInput;
    value?: Color;
    defaultValue?: Color;
} & BaseBlock;

export type Rule<T> = {
    errorMessage: string;
    validate: (value: T) => boolean;
};

export type Checkbox = {
    id: string;
    label?: string;
};

export type ChecklistBlock = {
    type: BlockType.Checklist;
    choices: Checkbox[];
    value?: string[] | null;
    defaultValue: string[];
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock;

export type TargetsBlock = {
    type: BlockType.Targets;
    choices: Checkbox[];
    value?: string[] | null;
    defaultValue: string[];
} & BaseBlock;

export type AssetInputBlock = {
    type: BlockType.AssetInput;
    asset?: AssetInputProps['asset'];
    value?: number;
    allowedExtensions: FileExtension[];
} & BaseBlock;

export type Block =
    | AssetInputBlock
    | ChecklistBlock
    | ColorInputBlock
    | DropdownBlock
    | InputBlock
    | MultiInputBlock
    | SliderBlock
    | SwitchBlock
    | TargetsBlock;

export type SwitchBlock = {
    type: BlockType.Switch;
    switchLabel?: string;
    on?: Block[];
    off?: Block[];
    value?: boolean;
    defaultValue: boolean;
} & BaseBlock;

export type Target = {
    label: string;
    value: number;
    checked: boolean;
};

export type TargetBlock = Target & BaseBlock;

/**
 * Maps the block id to the section id
 */
export type PathMap = {
    [key: string]: string;
};

export enum SectionIds {
    Main = 'main',
    Content = 'content',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type Structure = {
    [SectionIds.Main]?: Block[];
    [SectionIds.Content]?: Block[];
    [SectionIds.Layout]?: Block[];
    [SectionIds.Style]?: Block[];
    [SectionIds.Security]?: Block[];
    [SectionIds.Targets]?: Block[];
};

export type Data = {
    [key: string]: Block['value'];
};

export const useSettings = (
    structure: Structure,
    data: Data
): [Structure, PathMap, UpdateDataFunction<Block['value']>] => {
    const [settings, setSettings] = useState<Structure>(structure);
    const pathMap = createPaths(structure);

    const updateData = useCallback<UpdateDataFunction<Block['value']>>(
        (key, value) => {
            setSettings({ ...set(settings, `${pathMap[key]}.value`, value) });
        },
        [settings, pathMap]
    );

    useEffect(() => {
        setSettings(applyDataToStructure(data, settings, pathMap));
    }, [data]);

    return [settings, pathMap, updateData];
};
