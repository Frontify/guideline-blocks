/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, DropdownSize } from '@frontify/arcade';
import { Bundle, BlockSettings } from '@frontify/guideline-blocks-settings';
import { appendUnit, numericalOrPixelRule, presetCustomValue } from '@frontify/guideline-blocks-shared';
import { LineType, LineWidth, lineWidthMap, QuoteSize, quoteSizeMap, QuoteStyle, QuoteType } from './types';

const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const LINE_WIDTH_CHOICE_ID = 'lineWidthChoice';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const QUOTE_STYLE_CHOICES = [
    { value: QuoteStyle.DoubleUp, icon: IconEnum.DoubleQuotesUp, label: 'Double Up' },
    { value: QuoteStyle.DoubleDown, icon: IconEnum.DoubleQuotesDown, label: 'Double Down' },
    { value: QuoteStyle.SingleUp, icon: IconEnum.SingleQuoteUp, label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: IconEnum.SingleQuoteDown, label: 'Single Down' },
    { value: QuoteStyle.DoubleChevronLeft, icon: IconEnum.DoubleChevronLeft, label: 'Double Chevron Left' },
    { value: QuoteStyle.DoubleChevronRight, icon: IconEnum.DoubleChevronRight, label: 'Double Chevron Right' },
    { value: QuoteStyle.SingleChevronLeft, icon: IconEnum.SingleChevronLeft, label: 'Single Chevron Left' },
    { value: QuoteStyle.SingleChevronRight, icon: IconEnum.SingleChevronRight, label: 'Single Chevron Right' },
    { value: QuoteStyle.HookBracketLeft, icon: IconEnum.HookBracketLeft, label: 'Hook Bracket Left' },
    { value: QuoteStyle.HookBracketRight, icon: IconEnum.HookBracketRight, label: 'Hook Bracket Right' },
    { value: QuoteStyle.None, icon: IconEnum.None, label: 'None' },
];

export const DEFAULT_COLOR_VALUE = { rgba: { r: 179, g: 181, b: 181, a: 1 }, name: 'Light Grey', hex: '#B3B5B5' };
export const DEFAULT_AUTHOR_NAME = 'John Doe';

const isSelected = (bundle: Bundle, choice: QuoteType): boolean => bundle.getBlock(QUOTE_TYPE_ID)?.value === choice;
const showAccentLine = (bundle: Bundle): boolean =>
    isSelected(bundle, QuoteType.Indentation) && bundle.getBlock(ACCENT_LINE_SWITCH_ID)?.value === true;

const settings: BlockSettings = {
    main: [
        {
            id: QUOTE_TYPE_ID,
            type: 'dropdown',
            defaultValue: QuoteType.QuotationMarks,
            size: DropdownSize.Large,
            choices: [
                {
                    value: QuoteType.QuotationMarks,
                    icon: IconEnum.Quote,
                    label: 'Quotation Marks',
                },
                {
                    value: QuoteType.Indentation,
                    icon: IconEnum.ListIndented,
                    label: 'Indentation',
                },
            ],
        },
    ],
    content: [
        {
            id: 'quoteStyleLeft',
            label: 'Left',
            type: 'dropdown',
            defaultValue: QuoteStyle.DoubleUp,
            choices: QUOTE_STYLE_CHOICES,
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: 'quoteStyleRight',
            label: 'Right',
            type: 'dropdown',
            defaultValue: QuoteStyle.DoubleUp,
            choices: QUOTE_STYLE_CHOICES,
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
        },
    ],
    layout: [
        {
            id: 'showAuthor',
            type: 'switch',
            label: 'Author',
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
            id: 'isCustomSize',
            label: 'Size',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            onChange: (bundle: Bundle): void => presetCustomValue(bundle, SIZE_CHOICE_ID, SIZE_VALUE_ID, quoteSizeMap),
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
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
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
            info: 'Choose between a solid, dashed and dotted accent line',
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
        {
            id: 'quotesColor',
            label: 'Color',
            type: 'colorInput',
            defaultValue: DEFAULT_COLOR_VALUE,
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
        },
    ],
};

// eslint-disable-next-line import/no-default-export
export default settings;
