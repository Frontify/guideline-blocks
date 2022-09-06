/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import type { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import { BorderStyle, appendUnit, numericalOrPixelRule, presetCustomValue } from '@frontify/guideline-blocks-shared';
import { LineType, QuoteSize, QuoteStyle, QuoteType, quoteSizeMap } from './types';

const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const QUOTE_STYLE_CHOICES = [
    // TODO: Readd correct icons as soon as they exist in Fondue
    { value: QuoteStyle.DoubleUp, icon: 'Icon' as IconEnum.Icon, label: 'Double Up' },
    { value: QuoteStyle.DoubleDown, icon: 'Icon' as IconEnum.Icon, label: 'Double Down' },
    { value: QuoteStyle.SingleUp, icon: 'Icon' as IconEnum.CaretUp, label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: 'Icon' as IconEnum.CaretDown, label: 'Single Down' },
    {
        value: QuoteStyle.DoubleChevronLeft,
        icon: 'CaretLeftDouble' as IconEnum.CaretLeftDouble,
        label: 'Double Chevron Left',
    },
    {
        value: QuoteStyle.DoubleChevronRight,
        icon: 'CaretRightDouble' as IconEnum.CaretRightDouble,
        label: 'Double Chevron Right',
    },
    {
        value: QuoteStyle.SingleChevronLeft,
        icon: 'CaretLeft' as IconEnum.CaretLeft,
        label: 'Single Chevron Left',
    },
    {
        value: QuoteStyle.SingleChevronRight,
        icon: 'CaretRight' as IconEnum.CaretRight,
        label: 'Single Chevron Right',
    },
    {
        value: QuoteStyle.HookBracketLeft,
        icon: 'Icon' as IconEnum.Icon,
        label: 'Hook Bracket Left',
    },
    {
        value: QuoteStyle.HookBracketRight,
        icon: 'Icon' as IconEnum.Icon,
        label: 'Hook Bracket Right',
    },
    { value: QuoteStyle.None, icon: 'Icon' as IconEnum.Icon, label: 'None' },
];

export const DEFAULT_COLOR_VALUE = { red: 179, green: 181, blue: 181, alpha: 1, name: 'Light Grey' };
export const DEFAULT_AUTHOR_NAME = 'John Doe';

const isSelected = (bundle: Bundle, choice: QuoteType): boolean => bundle.getBlock(QUOTE_TYPE_ID)?.value === choice;
const showAccentLine = (bundle: Bundle): boolean =>
    isSelected(bundle, QuoteType.Indentation) && bundle.getBlock(ACCENT_LINE_SWITCH_ID)?.value === true;

export const settings: BlockSettings = {
    main: [
        {
            id: QUOTE_TYPE_ID,
            type: 'dropdown',
            defaultValue: QuoteType.QuotationMarks,
            size: 'Large' as DropdownSize.Large,
            choices: [
                {
                    value: QuoteType.QuotationMarks,
                    icon: 'SpeechBubbleQuote' as IconEnum.SpeechBubbleQuote,
                    label: 'Quotation Marks',
                },
                {
                    value: QuoteType.Indentation,
                    icon: 'ListIndented' as IconEnum.ListIndented,
                    label: 'Indentation',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'quotationMarksContentSection',
            type: 'sectionHeading',
            label: 'Quotation marks',
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
            blocks: [
                {
                    id: 'quoteStyleLeft',
                    label: 'Left',
                    type: 'dropdown',
                    defaultValue: QuoteStyle.DoubleUp,
                    choices: QUOTE_STYLE_CHOICES,
                },
                {
                    id: 'quoteStyleRight',
                    label: 'Right',
                    type: 'dropdown',
                    defaultValue: QuoteStyle.DoubleUp,
                    choices: QUOTE_STYLE_CHOICES,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'showAuthor',
            type: 'switch',
            label: 'Show author',
            defaultValue: false,
            on: [
                {
                    id: 'authorName',
                    type: 'input',
                    placeholder: 'John Doe',
                },
            ],
        },
    ],
    style: [
        {
            id: 'quotationMarksStyleSection',
            type: 'sectionHeading',
            label: 'Quotation marks',
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
            blocks: [
                {
                    id: 'isCustomSize',
                    label: 'Size',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle: Bundle): void =>
                        presetCustomValue(bundle, SIZE_CHOICE_ID, SIZE_VALUE_ID, quoteSizeMap),
                    on: [
                        {
                            id: SIZE_VALUE_ID,
                            type: 'input',
                            placeholder: 'e.g. 20px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, SIZE_VALUE_ID),
                        },
                    ],
                    off: [
                        {
                            id: SIZE_CHOICE_ID,
                            type: 'slider',
                            defaultValue: QuoteSize.SmallSize,
                            choices: [
                                {
                                    label: 'S',
                                    value: QuoteSize.SmallSize,
                                },
                                {
                                    label: 'M',
                                    value: QuoteSize.MediumSize,
                                },
                                {
                                    label: 'L',
                                    value: QuoteSize.LargeSize,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'quotesColor',
                    label: 'Color',
                    type: 'colorInput',
                    defaultValue: DEFAULT_COLOR_VALUE,
                },
            ],
        },
        {
            id: ACCENT_LINE_SWITCH_ID,
            label: 'Accent line',
            type: 'switch',
            defaultValue: true,
            show: showAccentLine,
            on: [
                {
                    id: ACCENT_LINE_SWITCH_ID,
                    type: 'multiInput',
                    onChange: (bundle: Bundle): void => {
                        appendUnit(bundle, LINE_WIDTH_VALUE_ID);
                    },
                    layout: MultiInputLayout.Columns,
                    lastItemFullWidth: true,
                    blocks: [
                        {
                            id: 'lineType',
                            type: 'dropdown',
                            defaultValue: LineType.Solid,
                            choices: [
                                {
                                    value: LineType.Solid,
                                    label: BorderStyle.Solid,
                                },
                                {
                                    value: LineType.Dotted,
                                    label: BorderStyle.Dotted,
                                },
                                {
                                    value: LineType.Dashed,
                                    label: BorderStyle.Dashed,
                                },
                            ],
                        },
                        {
                            id: LINE_WIDTH_VALUE_ID,
                            type: 'input',
                            defaultValue: '2px',
                            rules: [numericalOrPixelRule],
                            placeholder: 'e.g. 3px',
                        },
                        {
                            id: 'accentLinecolor',
                            type: 'colorInput',
                            defaultValue: DEFAULT_COLOR_VALUE,
                        },
                    ],
                },
            ],
        },
    ],
};
