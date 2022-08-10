/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { DropdownSize, IconEnum } from '@frontify/fondue';
import type { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import { appendUnit, numericalOrPixelRule, presetCustomValue } from '@frontify/guideline-blocks-shared';
import { LineType, LineWidth, QuoteSize, QuoteStyle, QuoteType, lineWidthMap, quoteSizeMap } from './types';

const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const LINE_WIDTH_CHOICE_ID = 'lineWidthChoice';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const QUOTE_STYLE_CHOICES = [
    { value: QuoteStyle.DoubleUp, icon: 'DoubleQuotesUp' as IconEnum.DoubleQuotesUp, label: 'Double Up' },
    { value: QuoteStyle.DoubleDown, icon: 'DoubleQuotesDown' as IconEnum.DoubleQuotesDown, label: 'Double Down' },
    { value: QuoteStyle.SingleUp, icon: 'SingleQuoteUp' as IconEnum.SingleQuoteUp, label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: 'SingleQuoteDown' as IconEnum.SingleQuoteDown, label: 'Single Down' },
    {
        value: QuoteStyle.DoubleChevronLeft,
        icon: 'DoubleChevronLeft' as IconEnum.DoubleChevronLeft,
        label: 'Double Chevron Left',
    },
    {
        value: QuoteStyle.DoubleChevronRight,
        icon: 'DoubleChevronRight' as IconEnum.DoubleChevronRight,
        label: 'Double Chevron Right',
    },
    {
        value: QuoteStyle.SingleChevronLeft,
        icon: 'SingleChevronLeft' as IconEnum.SingleChevronLeft,
        label: 'Single Chevron Left',
    },
    {
        value: QuoteStyle.SingleChevronRight,
        icon: 'SingleChevronRight' as IconEnum.SingleChevronRight,
        label: 'Single Chevron Right',
    },
    {
        value: QuoteStyle.HookBracketLeft,
        icon: 'HookBracketLeft' as IconEnum.HookBracketLeft,
        label: 'Hook Bracket Left',
    },
    {
        value: QuoteStyle.HookBracketRight,
        icon: 'HookBracketRight' as IconEnum.HookBracketRight,
        label: 'Hook Bracket Right',
    },
    { value: QuoteStyle.None, icon: 'None' as IconEnum.None, label: 'None' },
];

export const DEFAULT_COLOR_VALUE = { r: 179, g: 181, b: 181, a: 1, name: 'Light Grey' };
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
                    icon: 'Quote' as IconEnum.Quote,
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
            off: [],
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
            type: 'switch',
            label: 'Accent line',
            defaultValue: true,
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.Indentation),
        },
        {
            id: 'lineType',
            type: 'slider',
            label: 'Type',
            info: 'Determines how the line looks',
            defaultValue: LineType.Solid,
            show: showAccentLine,
            choices: [
                {
                    label: 'Solid',
                    value: LineType.Solid,
                },
                {
                    label: 'Dashed',
                    value: LineType.Dashed,
                },
                {
                    label: 'Dotted',
                    value: LineType.Dotted,
                },
            ],
        },
        {
            id: 'isCustomLineWidth',
            label: 'Width',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: 'Choose between small, medium, large or custom accent line width',
            show: showAccentLine,
            onChange: (bundle: Bundle): void =>
                presetCustomValue(bundle, LINE_WIDTH_CHOICE_ID, LINE_WIDTH_VALUE_ID, lineWidthMap),
            on: [
                {
                    id: LINE_WIDTH_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: Bundle): void => appendUnit(bundle, LINE_WIDTH_VALUE_ID),
                },
            ],
            off: [
                {
                    id: LINE_WIDTH_CHOICE_ID,
                    type: 'slider',
                    defaultValue: LineWidth.SmallWidth,
                    choices: [
                        {
                            label: 'S',
                            value: LineWidth.SmallWidth,
                        },
                        {
                            label: 'M',
                            value: LineWidth.MediumWidth,
                        },
                        {
                            label: 'L',
                            value: LineWidth.LargeWidth,
                        },
                    ],
                },
            ],
        },
        {
            id: 'accentLinecolor',
            label: 'Color',
            type: 'colorInput',
            defaultValue: DEFAULT_COLOR_VALUE,
            show: showAccentLine,
        },
    ],
};
