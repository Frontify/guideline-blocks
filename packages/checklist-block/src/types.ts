import { AppBridgeNative } from '@frontify/app-bridge';
import { Color, IconEnum } from '@frontify/arcade';
import { ReactElement } from 'react';

export type ChecklistButtonProps = {
    disabled?: boolean;
    onClick: (e: any) => void;
    icon: ReactElement;
};

export type Settings = {
    content: ChecklistContent[];
    paddingAdvanced: boolean;
    paddingBasic: ChecklistPadding;
    paddingCustom: string;
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

export enum ChecklistPadding {
    None = 'none',
    Small = 'sm',
    Medium = 'med',
    Large = 'lg',
}

export enum ProgressBarType {
    Percentage = 'Percentage',
    Bar = 'Bar',
    Fraction = 'Fraction',
}

export const DefaultValues = {
    content: [],
    paddingAdvanced: false,
    paddingBasic: ChecklistPadding.Medium,
    paddingCustom: '0px',
    incompleteTextColor: { hex: '#2D3232' },
    incompleteCheckboxColor: { hex: '#6C7070' },
    completeTextColor: { hex: '#FF375A' },
    completeCheckboxColor: { hex: '#FF375A' },
    completedDecoration: ChecklistDecoration.Strikethrough,
    highlightColor: { hex: '#BEE1D4' },
    dateVisible: true,
    progressBarVisible: true,
    progressBarType: ProgressBarType.Bar,
    progressBarFillColor: { hex: '#00C8A5' },
    progressBarTrackColor: { hex: '#DEF0E9' },
    strikethroughMultiInput: [StrikethroughType.Solid, '1px', { hex: '#FF375A' }],
};

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
    id: string;
    text: string;
    createdAt?: string;
    updatedAt?: string;
    completed: boolean;
    checkboxDisabled: boolean;
    toggleCompleted: () => void;
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
