/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { DropdownSize, IconEnum, MultiInputLayout, SwitchSize } from '@frontify/fondue';
import type { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import { appendUnit, minimumNumericalOrPixelOrAutoRule, numericalOrPixelRule } from '@frontify/guideline-blocks-shared';
import { ChecklistDecoration, DefaultValues, ProgressBarType, StrikethroughType } from './types';

const COMPLETED_DECORATION = 'completedDecoration';
const STRIKETHROUGH_WIDTH = 'strikethroughWidth';
const PROGRESS_BAR_VISIBLE = 'progressBarVisible';
const PROGRESS_BAR_TYPE = 'progressBarType';

const showProgressStyles = (bundle: Bundle): boolean =>
    !!bundle.getBlock(PROGRESS_BAR_VISIBLE)?.value && bundle.getBlock(PROGRESS_BAR_TYPE)?.value === ProgressBarType.Bar;

export const settings: BlockSettings = {
    main: [
        {
            id: COMPLETED_DECORATION,
            type: 'dropdown',
            defaultValue: DefaultValues.completedDecoration,
            size: 'Large' as DropdownSize.Large,
            choices: [
                {
                    value: ChecklistDecoration.Checkbox,
                    icon: 'ListCheck' as IconEnum.ListCheck,
                    label: 'Checkbox',
                },
                {
                    value: ChecklistDecoration.Strikethrough,
                    icon: 'TextFormatStrikethrough' as IconEnum.TextFormatStrikethrough,
                    label: 'Strikethrough',
                },
                {
                    value: ChecklistDecoration.Highlight,
                    icon: 'Highlighter' as IconEnum.Highlighter,
                    label: 'Highlight',
                },
            ],
        },
    ],
    layout: [
        {
            id: PROGRESS_BAR_VISIBLE,
            label: 'Progress Indicator',
            type: 'switch',
            size: 'Small' as SwitchSize.Small,
            defaultValue: DefaultValues.progressBarVisible,
            info: 'Change the type of progress indicator for your checklist',
            on: [
                {
                    id: PROGRESS_BAR_TYPE,
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
            size: 'Small' as SwitchSize.Small,
            info: 'Show the completion date for each checklist item',
            defaultValue: DefaultValues.dateVisible,
        },
    ],
    style: [
        {
            id: 'incompleteSection',
            type: 'sectionHeading',
            label: 'Incomplete',
            blocks: [
                {
                    id: 'incompleteTextColor',
                    type: 'colorInput',
                    label: 'Text',
                    defaultValue: DefaultValues.incompleteTextColor,
                },
                {
                    id: 'incompleteCheckboxColor',
                    type: 'colorInput',
                    label: 'Checkbox',
                    defaultValue: DefaultValues.incompleteCheckboxColor,
                },
            ],
        },
        {
            id: 'completeSection',
            type: 'sectionHeading',
            label: 'Complete',
            blocks: [
                {
                    id: 'completeTextColor',
                    type: 'colorInput',
                    label: 'Text',
                    defaultValue: DefaultValues.completeTextColor,
                },
                {
                    id: 'completeCheckboxColor',
                    type: 'colorInput',
                    label: 'Checkbox',
                    defaultValue: DefaultValues.completeCheckboxColor,
                },
                {
                    id: 'highlightColor',
                    type: 'colorInput',
                    label: 'Highlight',
                    defaultValue: DefaultValues.highlightColor,
                    show: (bundle: Bundle) =>
                        bundle.getBlock(COMPLETED_DECORATION)?.value === ChecklistDecoration.Highlight,
                },
                {
                    id: 'strikethroughMultiInput',
                    type: 'multiInput',
                    label: 'Line',
                    layout: 'Columns' as MultiInputLayout.Columns,
                    lastItemFullWidth: true,
                    show: (bundle: Bundle) =>
                        bundle.getBlock(COMPLETED_DECORATION)?.value === ChecklistDecoration.Strikethrough,
                    blocks: [
                        {
                            id: 'strikethroughStyle',
                            type: 'dropdown',
                            defaultValue: DefaultValues.strikethroughStyle,
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
                            id: STRIKETHROUGH_WIDTH,
                            type: 'input',
                            defaultValue: DefaultValues.strikethroughWidth,
                            onChange: (bundle: Bundle): void => appendUnit(bundle, STRIKETHROUGH_WIDTH),
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(1)],
                        },
                        {
                            id: 'strikethroughColor',
                            type: 'colorInput',
                            defaultValue: DefaultValues.strikethroughColor,
                        },
                    ],
                },
            ],
        },
        {
            id: 'progressIndicatorSection',
            type: 'sectionHeading',
            label: 'Progress indicator',
            show: showProgressStyles,
            blocks: [
                {
                    id: 'progressBarFillColor',
                    type: 'colorInput',
                    label: 'Complete',
                    defaultValue: DefaultValues.progressBarFillColor,
                },
                {
                    id: 'progressBarTrackColor',
                    type: 'colorInput',
                    label: 'Track',
                    defaultValue: DefaultValues.progressBarTrackColor,
                },
            ],
        },
    ],
};
