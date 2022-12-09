/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonSize, Color, ItemDragState, OrderableListItem } from '@frontify/fondue';
import { DesignTokenName } from '@frontify/guideline-blocks-shared';
import { CSSProperties, MouseEvent, ReactElement } from 'react';

export type ChecklistItemProps = {
    item?: ChecklistContent;
    toggleCompleted?: (value: boolean) => void;
    isDragFocusVisible?: boolean;
    dragState?: ItemDragState;
    onTextModified?: (text: string) => void;
    mode: ChecklistItemMode;
    designTokens: DesignTokens;
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
    designTokens: DesignTokens;
};

export type CheckboxLabelProps = {
    htmlFor: string;
    disabled?: boolean;
    dateInMs?: number;
    children: string;
    designTokens: DesignTokens;
};

export type DesignTokens = Partial<Record<DesignTokenName, CSSProperties>>;

export type ChecklistButtonProps = {
    disabled?: boolean;
    onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
    icon: ReactElement;
    size?: ButtonSize;
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

export type Settings = {
    content: OrderableListItem<ChecklistContent>[];
    textColor: Color;
    checkboxColor: Color;
    completeTextColor: Color;
    completeCheckboxColor: Color;
    completedDecoration: ChecklistDecoration;
    highlightColor: Color;
    dateVisible: boolean;
    progressBarVisible: boolean;
    progressBarType: string;
    progressBarFillColor: Color;
    progressBarTrackColor: Color;
    strikethroughStyle: StrikethroughType;
    strikethroughWidth: string;
    strikethroughColor: Color;
};

export const DefaultValues: Settings = {
    content: [],
    textColor: { red: 45, green: 50, blue: 50, alpha: 1 },
    checkboxColor: { red: 45, green: 50, blue: 50, alpha: 1 },
    completeTextColor: { red: 45, green: 50, blue: 50, alpha: 1 },
    completeCheckboxColor: { red: 0, green: 200, blue: 165, alpha: 1 },
    completedDecoration: ChecklistDecoration.Checkbox,
    highlightColor: { red: 0, green: 200, blue: 165, alpha: 1 },
    dateVisible: true,
    progressBarVisible: true,
    progressBarType: ProgressBarType.Bar,
    progressBarFillColor: { red: 0, green: 200, blue: 165, alpha: 1 },
    progressBarTrackColor: { red: 250, green: 250, blue: 250, alpha: 1 },
    strikethroughStyle: StrikethroughType.Solid,
    strikethroughWidth: '1px',
    strikethroughColor: { red: 0, green: 200, blue: 165, alpha: 1 },
};
