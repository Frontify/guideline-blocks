import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';
import { ReactElement } from 'react';

export type ChecklistButtonProps = {
    disabled?: boolean;
    onClick: (e: any) => void;
};

export type Settings = {
    content: ChecklistContent[];
    padding: string;
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
    strikethroughMultiInput?: any;
};

export type ChecklistProps = {
    appBridge: AppBridgeNative;
};

export type ChecklistContent = {
    text: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    completed: boolean;
};

export enum ChecklistDecoration {
    Checkbox = 'Checkbox',
    Strikethrough = 'Strikethrough',
    Highlight = 'Highlight',
}

export enum StrikethroughType {
    Solid = 'solid',
    Dashed = 'dashed',
    Double = 'double',
    Dotted = 'dotted',
    Wavy = 'wavy',
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

export type ChecklistItemProps = {
    text: string;
    createdAt?: string;
    updatedAt?: string;
    completed: boolean;
    dateCompleted?: number;
    dateVisible: boolean;
    readonly: boolean;
    controlButtons: ReactElement;
    strikethroughStyle?: StrikethroughStyle;
    highlightColor: string;
    completedDecoration: ChecklistDecoration;
    completeStyle: ChecklistItemStyle;
    incompleteStyle: ChecklistItemStyle;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
};
