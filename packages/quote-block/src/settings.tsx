/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    BorderStyle,
    type Bundle,
    type Choice,
    FileExtension,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { IconDoubleQuotesDown } from './foundation/IconDoubleQuotesDown';
import { IconDoubleQuotesUp } from './foundation/IconDoubleQuotesUp';
import { IconHookBracketLeft } from './foundation/IconHookBracketLeft';
import { IconHookBracketRight } from './foundation/IconHookBracketRight';
import { IconSingleQuoteDown } from './foundation/IconSingleQuoteDown';
import { IconSingleQuoteUp } from './foundation/IconSingleQuoteUp';
import {
    LineType,
    QuotationMarksAnchoring,
    QuoteSize,
    QuoteStyle,
    QuoteType,
    TextAlignment,
    quoteSizeMap,
} from './types';

export const CUSTOM_QUOTE_STYLE_LEFT_ID = 'customQuoteStyleLeft';
export const CUSTOM_QUOTE_STYLE_RIGHT_ID = 'customQuoteStyleRight';
const IS_CUSTOM_QUOTE_STYLE_LEFT_ID = 'isCustomQuoteStyleLeft';
const IS_CUSTOM_QUOTE_STYLE_RIGHT_ID = 'isCustomQuoteStyleRight';
const QUOTE_STYLE_LEFT_ID = 'quoteStyleLeft';
const QUOTE_STYLE_RIGHT_ID = 'quoteStyleRight';
const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const style = { width: '20px', height: '20px' };
const QUOTE_STYLE_CHOICES = [
    {
        value: QuoteStyle.DoubleUp,
        icon: <IconDoubleQuotesUp style={style} />,
        label: 'Double Up',
    },
    {
        value: QuoteStyle.DoubleDown,
        icon: <IconDoubleQuotesDown style={style} />,
        label: 'Double Down',
    },
    { value: QuoteStyle.SingleUp, icon: <IconSingleQuoteUp style={style} />, label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: <IconSingleQuoteDown style={style} />, label: 'Single Down' },
    {
        value: QuoteStyle.DoubleChevronLeft,
        icon: 'CaretLeftDouble20',
        label: 'Double Chevron Left',
    },
    {
        value: QuoteStyle.DoubleChevronRight,
        icon: 'CaretRightDouble20',
        label: 'Double Chevron Right',
    },
    {
        value: QuoteStyle.SingleChevronLeft,
        icon: 'CaretLeft20',
        label: 'Single Chevron Left',
    },
    {
        value: QuoteStyle.SingleChevronRight,
        icon: 'CaretRight20',
        label: 'Single Chevron Right',
    },
    {
        value: QuoteStyle.HookBracketLeft,
        icon: <IconHookBracketLeft style={style} />, // TODO: replace icon as soon as available in fondue (https://app.clickup.com/t/2y3u4nk)
        label: 'Hook Bracket Left',
    },
    {
        value: QuoteStyle.HookBracketRight,
        icon: <IconHookBracketRight style={style} />, // TODO: replace icon as soon as available in fondue (https://app.clickup.com/t/2y3u4nk)
        label: 'Hook Bracket Right',
    },
    { value: QuoteStyle.None, icon: 'StrikethroughBox20', label: 'None' },
] as Choice[];

export const DEFAULT_COLOR_VALUE = { red: 179, green: 181, blue: 181, alpha: 1, name: 'Light Grey' };

const isSelected = (bundle: Bundle, choice: QuoteType): boolean => bundle.getBlock(QUOTE_TYPE_ID)?.value === choice;

export const settings = defineSettings({
    main: [
        {
            id: QUOTE_TYPE_ID,
            type: 'dropdown',
            defaultValue: QuoteType.QuotationMarks,
            size: 'large',
            choices: [
                {
                    value: QuoteType.QuotationMarks,
                    icon: 'SpeechBubbleQuote',
                    label: 'Quotation Marks',
                },
                {
                    value: QuoteType.Indentation,
                    icon: 'ListIndented',
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
            show: (bundle) => isSelected(bundle, QuoteType.QuotationMarks),
            blocks: [
                {
                    id: IS_CUSTOM_QUOTE_STYLE_LEFT_ID,
                    type: 'switch',
                    label: 'Left',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    on: [
                        {
                            id: CUSTOM_QUOTE_STYLE_LEFT_ID,
                            type: 'assetInput',
                            size: 'small',
                            extensions: [FileExtension.Svg],
                            objectTypes: [AssetChooserObjectType.ImageVideo],
                            hideSize: true,
                            hideExtension: true,
                        },
                    ],
                    off: [
                        {
                            id: QUOTE_STYLE_LEFT_ID,
                            type: 'dropdown',
                            defaultValue: QuoteStyle.DoubleUp,
                            choices: QUOTE_STYLE_CHOICES,
                        },
                    ],
                },
                {
                    id: IS_CUSTOM_QUOTE_STYLE_RIGHT_ID,
                    type: 'switch',
                    label: 'Right',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    on: [
                        {
                            id: CUSTOM_QUOTE_STYLE_RIGHT_ID,
                            type: 'assetInput',
                            size: 'small',
                            extensions: [FileExtension.Svg],
                            objectTypes: [AssetChooserObjectType.ImageVideo],
                            hideSize: true,
                            hideExtension: true,
                        },
                    ],
                    off: [
                        {
                            id: QUOTE_STYLE_RIGHT_ID,
                            type: 'dropdown',
                            defaultValue: QuoteStyle.None,
                            choices: QUOTE_STYLE_CHOICES,
                        },
                    ],
                },
            ],
            showForTranslations: true,
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
                    placeholder: 'e.g. John Doe',
                },
            ],
        },
        {
            id: 'textAlignment',
            type: 'segmentedControls',
            label: 'Text alignment',
            defaultValue: TextAlignment.Left,
            choices: [
                {
                    icon: 'TextAlignmentLeft',
                    value: TextAlignment.Left,
                },
                {
                    icon: 'TextAlignmentCentre',
                    value: TextAlignment.Center,
                },
                {
                    icon: 'TextAlignmentRight',
                    value: TextAlignment.Right,
                },
            ],
            show: (bundle) => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: 'quotationMarksAnchoring',
            type: 'segmentedControls',
            label: 'Quotation marks anchoring',
            info: "Some settings won't apply if the container is too narrow.",
            defaultValue: QuotationMarksAnchoring.FullWidth,
            choices: [
                {
                    label: 'Full width',
                    value: QuotationMarksAnchoring.FullWidth,
                },
                {
                    label: 'Hug text',
                    value: QuotationMarksAnchoring.HugText,
                },
            ],
            show: (bundle) => isSelected(bundle, QuoteType.QuotationMarks),
        },
    ],
    style: [
        {
            id: 'quotationMarksStyleSection',
            type: 'sectionHeading',
            label: 'Quotation marks',
            show: (bundle) => isSelected(bundle, QuoteType.QuotationMarks),
            blocks: [
                {
                    id: 'isCustomSize',
                    label: 'Size',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => presetCustomValue(bundle, SIZE_CHOICE_ID, SIZE_VALUE_ID, quoteSizeMap),
                    on: [
                        {
                            id: SIZE_VALUE_ID,
                            type: 'input',
                            placeholder: 'e.g. 20px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => appendUnit(bundle, SIZE_VALUE_ID),
                        },
                    ],
                    off: [
                        {
                            id: SIZE_CHOICE_ID,
                            type: 'segmentedControls',
                            defaultValue: QuoteSize.LargeSize,
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
                    id: 'isCustomQuotesColor',
                    label: 'Custom color',
                    type: 'switch',
                    size: 'small',
                    info: 'The default color is derived from the “Quote” heading style, which can be defined in the design settings.',
                    defaultValue: false,
                    on: [
                        {
                            id: 'quotesColor',
                            label: 'Color',
                            type: 'colorInput',
                            defaultValue: DEFAULT_COLOR_VALUE,
                        },
                    ],
                },
            ],
        },
        {
            id: ACCENT_LINE_SWITCH_ID,
            label: 'Accent line',
            type: 'switch',
            defaultValue: true,
            show: (bundle) => isSelected(bundle, QuoteType.Indentation),
            on: [
                {
                    id: 'accentLineStyle',
                    type: 'multiInput',
                    onChange: (bundle) => appendUnit(bundle, LINE_WIDTH_VALUE_ID),
                    layout: 'columns',
                    lastItemFullWidth: false,
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
                    ],
                },
                {
                    id: 'isCustomLineColor',
                    label: 'Custom color',
                    type: 'switch',
                    size: 'small',
                    info: 'The default color is derived from the “Quote” heading style, which can be defined in the design settings.',
                    defaultValue: false,
                    on: [
                        {
                            id: 'accentLineColor',
                            type: 'colorInput',
                            defaultValue: DEFAULT_COLOR_VALUE,
                        },
                    ],
                },
            ],
        },
    ],
});
