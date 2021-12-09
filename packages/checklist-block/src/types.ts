/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color, ItemDragState } from '@frontify/arcade';
import { ReactElement, MouseEvent } from 'react';
import { PropsWithChildren } from 'react';
import { colorToHexAlpha } from '../../callout-block/node_modules/@frontify/guideline-blocks-shared/src';

export type ChecklistProps = {
    appBridge: AppBridgeNative;
};

export type ChecklistItemProps = {
    item?: ChecklistContent;
    toggleCompleted?: (value: boolean) => void;
    isDragFocusVisible?: boolean;
    dragState?: ItemDragState;
    onTextModified?: (text: string) => void;
    mode: ChecklistItemMode;
    isFirst?: boolean;
    isLast?: boolean;
    onMoveItem?: (id: string, num: number) => void;
    onRemoveItem?: (id: string) => void;
};

export type CheckboxProps = {
    id: string;
    disabled?: boolean;
    checked: boolean;
    onChange?: (isChecked: boolean) => void;
    ariaLabel?: string;
    showLabel: boolean;
    label: string;
    dateCompleted?: number;
};

export type CheckboxLabelProps = PropsWithChildren<{
    htmlFor: string;
    disabled?: boolean;
    dateInMs?: number;
}>;

export const labelDecorationStylesMap = (
    style: StrikethroughType,
    thickness: string,
    color: Color,
    highlightColor: Color
): Record<ChecklistDecoration, DecorationStyle> => ({
    [ChecklistDecoration.Strikethrough]: {
        textDecoration: 'line-through',
        textDecorationStyle: StrikethroughStyleType[style],
        textDecorationThickness: thickness,
        textDecorationColor: colorToHexAlpha(color),
    },
    [ChecklistDecoration.Highlight]: {
        backgroundColor: colorToHexAlpha(highlightColor),
    },
    [ChecklistDecoration.Checkbox]: {},
});

export type ChecklistButtonProps = {
    disabled?: boolean;
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
    icon: ReactElement;
};

export type TextEditorProps = {
    value: string;
    onTextModified?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    resetOnSave: boolean;
};

export type ImperativeFocusHandle = {
    focus: () => void;
};

export type ProgressBarProps = {
    trackColor: string;
    fillColor: string;
    percentage: number;
};

export type ProgressHeaderProps = {
    value: string;
};

export type ChecklistContent = {
    text: string;
    id: string;
    updatedAt: number;
    completed: boolean;
};

export type UpdateableItem<T = Record<string, unknown>> = T & {
    id: string;
};

export enum ChecklistItemMode {
    Edit = 'Edit',
    View = 'View',
    Create = 'Create',
}

export enum ChecklistDecoration {
    Checkbox = 'Checkbox',
    Strikethrough = 'Strikethrough',
    Highlight = 'Highlight',
}
export enum StrikethroughType {
    Solid = 'Solid',
    Dashed = 'Dashed',
    Double = 'Double',
    Dotted = 'Dotted',
    Wavy = 'Wavy',
}

export const StrikethroughStyleType: Record<StrikethroughType, string> = {
    [StrikethroughType.Solid]: 'solid',
    [StrikethroughType.Dashed]: 'dashed',
    [StrikethroughType.Double]: 'double',
    [StrikethroughType.Dotted]: 'dotted',
    [StrikethroughType.Wavy]: 'wavy',
};

export enum ChecklistPadding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const PaddingClasses = {
    [ChecklistPadding.None]: 'tw-p-0',
    [ChecklistPadding.Small]: 'tw-p-1',
    [ChecklistPadding.Medium]: 'tw-p-2',
    [ChecklistPadding.Large]: 'tw-p-3',
};

export enum ProgressBarType {
    Percentage = 'Percentage',
    Bar = 'Bar',
    Fraction = 'Fraction',
}

export type StrikethroughStyle = {
    color?: string;
    width?: string;
    style?: string;
};

export type ChecklistItemStyle = {
    checkbox: string;
    color: string;
};

export type ToggleableStyle = {
    checked: string;
    unchecked: string;
};

export type DecorationStyle = {
    [key: string]: string;
};

export type StrikethroughMultiInputType = [StrikethroughType, string, Color];

export type Settings = {
    content: ChecklistContent[];
    paddingAdvanced: boolean;
    paddingBasic: ChecklistPadding;
    paddingCustom: string[];
    incompleteTextColor: Color;
    incompleteCheckboxColor: Color;
    completeTextColor: Color;
    completeCheckboxColor: Color;
    completedDecoration: ChecklistDecoration;
    highlightColor: Color;
    dateVisible: boolean;
    progressBarVisible: boolean;
    progressBarType: string;
    progressBarFillColor: Color;
    progressBarTrackColor: Color;
    strikethroughMultiInput: StrikethroughMultiInputType;
};

export const DefaultValues: Settings = {
    content: [],
    paddingAdvanced: false,
    paddingBasic: ChecklistPadding.Medium,
    paddingCustom: ['0px', '0px', '0px', '0px'],
    incompleteTextColor: { hex: '#2D3232', rgba: { r: 45, g: 50, b: 50, a: 1 } },
    incompleteCheckboxColor: { hex: '#6C7070', rgba: { r: 108, g: 112, b: 112, a: 1 } },
    completeTextColor: { hex: '#FF375A', rgba: { r: 255, g: 55, b: 90, a: 1 } },
    completeCheckboxColor: { hex: '#FF375A', rgba: { r: 255, g: 55, b: 90, a: 1 } },
    completedDecoration: ChecklistDecoration.Strikethrough,
    highlightColor: { hex: '#BEE1D4', rgba: { r: 190, g: 225, b: 212, a: 1 } },
    dateVisible: true,
    progressBarVisible: true,
    progressBarType: ProgressBarType.Bar,
    progressBarFillColor: { hex: '#00C8A5', rgba: { r: 0, g: 200, b: 165, a: 1 } },
    progressBarTrackColor: { hex: '#DEF0E9', rgba: { r: 222, g: 240, b: 233, a: 1 } },
    strikethroughMultiInput: [StrikethroughType.Solid, '1px', { hex: '#FF375A', rgba: { r: 255, g: 55, b: 90, a: 1 } }],
};
