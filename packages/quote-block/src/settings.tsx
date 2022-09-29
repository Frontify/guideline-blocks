/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, FileExtension } from '@frontify/app-bridge';
import { AssetChooserObjectType, FileExtension } from '@frontify/app-bridge';
import { AssetInputSize, DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import type { BlockSettings, Bundle, Choice } from '@frontify/guideline-blocks-settings';
import { BorderStyle, appendUnit, numericalOrPixelRule, presetCustomValue } from '@frontify/guideline-blocks-shared';
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

export const CUSTOM_ICON_LEFT_ID = 'customIconLeft';
export const CUSTOM_ICON_RIGHT_ID = 'customIconRight';
const QUOTE_STYLE_LEFT_ID = 'quoteStyleLeft';
const QUOTE_STYLE_RIGHT_ID = 'quoteStyleRight';
const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const style = { width: '20px', height: '20px' };
const QUOTE_STYLE_CHOICES = [
    // TODO: replace icons as soon as available in fondue (https://app.clickup.com/t/2y3u4nk)
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
        icon: IconEnum.CaretLeftDouble20,
        label: 'Double Chevron Left',
    },
    {
        value: QuoteStyle.DoubleChevronRight,
        icon: IconEnum.CaretRightDouble20,
        label: 'Double Chevron Right',
    },
    {
        value: QuoteStyle.SingleChevronLeft,
        icon: IconEnum.CaretLeft20,
        label: 'Single Chevron Left',
    },
    {
        value: QuoteStyle.SingleChevronRight,
        icon: IconEnum.CaretRight20,
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
    { value: QuoteStyle.None, icon: IconEnum.StrikethroughBox20, label: 'None' },
    {
        value: QuoteStyle.Custom,
        icon: IconEnum.Plus16,
        label: 'Custom Icon',
    },
] as Choice[];

export const DEFAULT_COLOR_VALUE = { red: 179, green: 181, blue: 181, alpha: 1, name: 'Light Grey' };

const isSelected = (bundle: Bundle, choice: QuoteType): boolean => bundle.getBlock(QUOTE_TYPE_ID)?.value === choice;

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
                    id: QUOTE_STYLE_LEFT_ID,
                    label: 'Left',
                    type: 'dropdown',
                    defaultValue: QuoteStyle.DoubleUp,
                    choices: QUOTE_STYLE_CHOICES,
                },
                {
                    id: CUSTOM_ICON_LEFT_ID,
                    type: 'assetInput',
                    size: AssetInputSize.Small,
                    label: 'Custom Icon Left',
                    extensions: ['svg' as FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    show: (bundle) => bundle.getBlock(QUOTE_STYLE_LEFT_ID)?.value === QuoteStyle.Custom,
                },
                {
                    id: QUOTE_STYLE_RIGHT_ID,
                    label: 'Right',
                    type: 'dropdown',
                    defaultValue: QuoteStyle.DoubleUp,
                    choices: QUOTE_STYLE_CHOICES,
                },
                {
                    id: CUSTOM_ICON_RIGHT_ID,
                    type: 'assetInput',
                    size: AssetInputSize.Small,
                    label: 'Custom Icon Right',
                    extensions: ['svg' as FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    show: (bundle) => bundle.getBlock(QUOTE_STYLE_RIGHT_ID)?.value === QuoteStyle.Custom,
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
                    placeholder: 'e.g. John Doe',
                },
            ],
        },
        {
            id: 'textAlignment',
            type: 'slider',
            label: 'Text alignment',
            defaultValue: TextAlignment.Left,
            choices: [
                {
                    icon: IconEnum.TextAlignmentLeft as IconEnum.TextAlignmentLeft,
                    value: TextAlignment.Left,
                },
                {
                    icon: IconEnum.TextAlignmentCentre as IconEnum.TextAlignmentCentre,
                    value: TextAlignment.Center,
                },
                {
                    icon: IconEnum.TextAlignmentRight as IconEnum.TextAlignmentRight,
                    value: TextAlignment.Right,
                },
            ],
        },
        {
            id: 'quotationMarksAnchoring',
            type: 'slider',
            label: 'Quotation marks anchoring',
            defaultValue: QuotationMarksAnchoring.FullWidth,
            choices: [
                {
                    label: 'Full width',
                    value: QuotationMarksAnchoring.FullWidth,
                },
                {
                    label: 'Hug Text',
                    value: QuotationMarksAnchoring.HugText,
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
            show: (bundle: Bundle): boolean => isSelected(bundle, QuoteType.Indentation),
            on: [
                {
                    id: 'accentLineStyle',
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
