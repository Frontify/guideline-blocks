import { Color } from '@frontify/arcade';

export type ChecklistContent = {
    text: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    completed: boolean;
};

export const DefaultChecklistItem = {
    text: '',
    id: '',
    createdAt: 0,
    updatedAt: 0,
    completed: false,
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
    strikethroughMultiInput: any[];
};

export const DefaultValues = {
    content: [],
    paddingAdvanced: false,
    paddingBasic: ChecklistPadding.Medium,
    paddingCustom: ['0px', '0px', '0px', '0px'],
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
