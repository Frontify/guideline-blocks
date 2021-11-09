import { LineType, LineWidth, QuoteSize, QuoteStyle, QuoteType } from './types';

const QUOTE_TYPE_ID = 'type';
const QUOTE_STYLE_CHOICES = [
    { value: QuoteStyle.DoubleUp, icon: 'quote', label: 'Double Up' },
    { value: QuoteStyle.DoubleDown, icon: 'quote', label: 'Double Down' },
    { value: QuoteStyle.SingleUp, icon: 'quote', label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: 'quote', label: 'Single Down' },
    { value: QuoteStyle.DoubleChevronLeft, icon: 'quote', label: 'Double Chevron Left' },
    { value: QuoteStyle.DoubleChevronRight, icon: 'quote', label: 'Double Chevron Right' },
    { value: QuoteStyle.SingleChevronLeft, icon: 'quote', label: 'Single Chevron Left' },
    { value: QuoteStyle.SingleChevronRight, icon: 'quote', label: 'Single Chevron Right' },
    { value: QuoteStyle.HookBracketLeft, icon: 'quote', label: 'Hook Bracket Left' },
    { value: QuoteStyle.HookBracketRight, icon: 'quote', label: 'Hook Bracket Right' },
    { value: QuoteStyle.None, icon: 'quote', label: 'None' },
];

const isSelected = (bundle: any, choice: QuoteType) => bundle.getBlock(QUOTE_TYPE_ID).value === choice;

export default {
    main: [
        {
            id: QUOTE_TYPE_ID,
            type: 'dropdown',
            defaultValue: QuoteType.QuotationMarks,
            size: 'large',
            choices: [
                {
                    value: QuoteType.QuotationMarks,
                    icon: 'quote',
                    label: 'Quotation Marks',
                },
                {
                    value: QuoteType.Indentation,
                    icon: 'quote',
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
            show: (bundle: any) => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: 'quoteStyleRight',
            label: 'Left',
            type: 'dropdown',
            defaultValue: QuoteStyle.DoubleUp,
            choices: QUOTE_STYLE_CHOICES,
            show: (bundle: any) => isSelected(bundle, QuoteType.QuotationMarks),
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
            defaultValue: false,
            switchLabel: 'Custom',
            on: [
                {
                    id: 'sizeValue',
                    type: 'input',
                },
            ],
            off: [
                {
                    id: 'sizeChoice',
                    type: 'slider',
                    defaultValue: QuoteSize.Small,
                    choices: [
                        {
                            label: 'S',
                            value: QuoteSize.Small,
                        },
                        {
                            label: 'M',
                            value: QuoteSize.Medium,
                        },
                        {
                            label: 'L',
                            value: QuoteSize.Large,
                        },
                    ],
                },
            ],
            show: (bundle: any) => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: 'showAccentLine',
            type: 'switch',
            label: 'Accent line',
            defaultValue: true,
            show: (bundle: any) => isSelected(bundle, QuoteType.Indentation),
            off: [],
            on: [
                {
                    id: 'lineType',
                    type: 'slider',
                    label: 'Type',
                    info: 'Choose between a solid, dashed and dotted accent line',
                    defaultValue: LineType.Solid,
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
                    on: [
                        {
                            id: 'lineWidthValue',
                            type: 'input',
                        },
                    ],
                    off: [
                        {
                            id: 'lineWidthChoice',
                            type: 'slider',
                            defaultValue: LineWidth.Small,
                            choices: [
                                {
                                    label: 'S',
                                    value: LineWidth.Small,
                                },
                                {
                                    label: 'M',
                                    value: LineWidth.Medium,
                                },
                                {
                                    label: 'L',
                                    value: LineWidth.Large,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'color',
            label: 'Color',
            type: 'input',
        },
    ],
};
