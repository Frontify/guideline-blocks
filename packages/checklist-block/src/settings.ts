import { IconEnum, InlineStyles, MultiInputLayout } from '@frontify/arcade';
import { ChecklistDecoration, ChecklistPadding, DefaultValues, ProgressBarType, StrikethroughType } from './types';

const showProgressStyles = (bundle: any): boolean => {
    return (
        bundle.getBlock('progressBarVisible').value === true &&
        bundle.getBlock('progressBarType').value === ProgressBarType.Bar
    );
};

export default {
    main: [
        {
            id: 'completedDecoration',
            type: 'dropdown',
            defaultValue: DefaultValues.completedDecoration,
            size: 'large',
            disabled: false,
            choices: [
                {
                    value: ChecklistDecoration.Checkbox,
                    icon: IconEnum.Symbols,
                    label: 'Checkbox',
                },
                {
                    value: ChecklistDecoration.Strikethrough,
                    icon: InlineStyles.Strikethrough,
                    label: 'Strikethrough',
                },
                {
                    value: ChecklistDecoration.Highlight,
                    icon: IconEnum.Symbols,
                    label: 'Highlight',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'paddingAdvanced',
            label: 'Padding',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'paddingCustom',
                    type: 'input',
                    defaultValue: DefaultValues.paddingCustom,
                    placeholder: '0px',
                },
            ],
            off: [
                {
                    id: 'paddingBasic',
                    type: 'slider',
                    defaultValue: DefaultValues.paddingBasic,
                    choices: [
                        {
                            value: ChecklistPadding.None,
                            label: 'None',
                        },
                        {
                            value: ChecklistPadding.Small,
                            label: 'S',
                        },
                        {
                            value: ChecklistPadding.Medium,
                            label: 'M',
                        },
                        {
                            value: ChecklistPadding.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
        {
            id: 'progressBarVisible',
            label: 'Progress Indicator',
            type: 'switch',
            defaultValue: DefaultValues.progressBarVisible,
            on: [
                {
                    id: 'progressBarType',
                    type: 'slider',
                    defaultValue: DefaultValues.progressBarType,
                    choices: [
                        {
                            value: ProgressBarType.Percentage,
                            label: 'Percentage',
                        },
                        {
                            value: ProgressBarType.Fraction,
                            label: 'Fraction',
                        },
                        {
                            value: ProgressBarType.Bar,
                            label: 'Bar',
                        },
                    ],
                },
            ],
            off: [],
        },
        {
            id: 'dateVisible',
            label: 'Date completed',
            type: 'switch',
            defaultValue: DefaultValues.dateVisible,
        },
    ],
    style: [
        {
            id: 'incompleteTextColor',
            type: 'colorInput',
            label: 'Incomplete Text',
            defaultValue: DefaultValues.incompleteTextColor,
        },
        {
            id: 'incompleteCheckboxColor',
            type: 'colorInput',
            label: 'Incomplete Checkbox',
            defaultValue: DefaultValues.incompleteCheckboxColor,
        },
        {
            id: 'completeTextColor',
            type: 'colorInput',
            label: 'Complete Text',
            defaultValue: DefaultValues.completeTextColor,
        },
        {
            id: 'completeCheckboxColor',
            type: 'colorInput',
            label: 'Complete Checkbox',
            defaultValue: DefaultValues.completeCheckboxColor,
        },
        {
            id: 'highlightColor',
            type: 'colorInput',
            label: 'Highlight',
            defaultValue: DefaultValues.highlightColor,
            show: (bundle: any) => bundle.getBlock('completedDecoration').value === ChecklistDecoration.Highlight,
        },
        {
            id: 'strikethroughMultiInput',
            type: 'multiInput',
            label: 'Line',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle: any) => bundle.getBlock('completedDecoration').value === ChecklistDecoration.Strikethrough,
            blocks: [
                {
                    id: 'strikethroughStyle',
                    type: 'dropdown',
                    defaultValue: DefaultValues.strikethroughMultiInput[0],
                    choices: [
                        {
                            label: 'Solid',
                            value: StrikethroughType.Solid,
                        },
                        {
                            label: 'Dashed',
                            value: StrikethroughType.Dashed,
                        },
                        {
                            label: 'Double',
                            value: StrikethroughType.Double,
                        },
                        {
                            label: 'Dotted',
                            value: StrikethroughType.Dotted,
                        },
                        {
                            label: 'Wavy',
                            value: StrikethroughType.Wavy,
                        },
                    ],
                },
                {
                    id: 'strikethroughWidth',
                    type: 'input',
                    defaultValue: DefaultValues.strikethroughMultiInput[1],
                },
                {
                    id: 'strikethroughColor',
                    type: 'colorInput',
                    defaultValue: DefaultValues.strikethroughMultiInput[2],
                },
            ],
        },
        {
            id: 'progressBarFillColor',
            type: 'colorInput',
            label: 'Progress Bar Fill',
            show: showProgressStyles,
            defaultValue: DefaultValues.progressBarFillColor,
        },
        {
            id: 'progressBarTrackColor',
            type: 'colorInput',
            label: 'Progress Bar Track',
            show: showProgressStyles,
            defaultValue: DefaultValues.progressBarTrackColor,
        },
    ],
};
