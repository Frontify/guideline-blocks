import { IconEnum, InlineStyles, MultiInputLayout } from '@frontify/arcade';
import { ChecklistDecoration, StrikethroughType } from './types';

const showProgressStyles = (bundle: any): boolean => {
    return bundle.getBlock('progressBarVisible').value === true && bundle.getBlock('progressBarType').value === 'bar';
};

export default {
    main: [
        {
            id: 'completedDecoration',
            type: 'dropdown',
            defaultValue: ChecklistDecoration.Checkbox,
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
            id: 'paddingSwitch',
            label: 'Padding',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'paddingCustom',
                    type: 'input',
                    placeholder: '0px',
                },
            ],
            off: [
                {
                    id: 'paddingBasic',
                    type: 'slider',
                    defaultValue: 'padding-s',
                    choices: [
                        {
                            value: 'padding-none',
                            label: 'None',
                        },
                        {
                            value: 'padding-s',
                            label: 'S',
                        },
                        {
                            value: 'padding-m',
                            label: 'M',
                        },
                        {
                            value: 'padding-l',
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
            on: [
                {
                    id: 'progressBarType',
                    type: 'slider',
                    defaultValue: 'percentage',
                    choices: [
                        {
                            value: 'percentage',
                            label: 'Percentage',
                        },
                        {
                            value: 'fraction',
                            label: 'Fraction',
                        },
                        {
                            value: 'bar',
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
        },
    ],
    style: [
        {
            id: 'incompleteTextColor',
            type: 'colorInput',
            label: 'Incomplete Text',
        },
        {
            id: 'incompleteCheckboxColor',
            type: 'colorInput',
            label: 'Incomplete Checkbox',
        },
        {
            id: 'completeTextColor',
            type: 'colorInput',
            label: 'Complete Text',
        },
        {
            id: 'completeTextColor',
            type: 'colorInput',
            label: 'Complete Text',
        },
        {
            id: 'highlightColor',
            type: 'colorInput',
            label: 'Highlight',
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
                    defaultValue: 'solid',
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
                    defaultValue: '1px',
                },
                {
                    id: 'strikethroughColor',
                    type: 'colorInput',
                },
            ],
        },
        {
            id: 'progressBarFillColor',
            type: 'colorInput',
            label: 'Progress Bar Fill',
            show: showProgressStyles,
        },
        {
            id: 'progressBarTrackColor',
            type: 'colorInput',
            label: 'Progress Bar Track',
            show: showProgressStyles,
        },
    ],
};
