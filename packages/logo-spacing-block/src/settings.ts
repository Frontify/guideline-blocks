import {
    AssetChooserObjectType,
    AssetInputSize,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { LineStyle, LogoSpacingType, Offset } from './types';

const LOGO_SPACING = 'logo-spacing';
const BOUNDARIES_THICKNESS_ID = 'thickness';
const BOUNDARIES_COLOR_ID = 'boundariesColor';
const CLEARSPACE_BG_COLOR_ID = 'clearSpaceBgColor';

const CLEAR_SPACE_LABELS = {
    [LogoSpacingType.Pixels]: 'Pixel clearspace',
    [LogoSpacingType.Percentage]: 'Percentage clearspace',
};

export const CLEAR_SPACE_UNITS = [
    {
        value: LogoSpacingType.Pixels,
        label: CLEAR_SPACE_LABELS[LogoSpacingType.Pixels],
    },
    {
        value: LogoSpacingType.Percentage,
        label: CLEAR_SPACE_LABELS[LogoSpacingType.Percentage],
    },
];

const topBottomOffsetMap: Record<Offset, string> = {
    [Offset.S]: '16px',
    [Offset.M]: '24px',
    [Offset.L]: '36px',
};

const leftRightOffsetMap: Record<Offset, string> = {
    [Offset.S]: '32px',
    [Offset.M]: '32px',
    [Offset.L]: '36px',
};

const STYLE_DEFAULT_VALUE = LineStyle.Solid;
const COLOR_DEFAULT_CLEARSPACE = {
    red: 213,
    green: 214,
    blue: 214,
    alpha: 1,
    name: 'Light Grey',
};
const COLOR_DEFAULT_LABEL = {
    red: 8,
    green: 8,
    blue: 8,
    alpha: 1,
    name: 'Dark Grey',
};

export const settings = defineSettings({
    main: [
        {
            id: LOGO_SPACING,
            type: 'dropdown',
            defaultValue: LogoSpacingType.Percentage,
            size: DropdownSize.Large,
            disabled: false,
            choices: CLEAR_SPACE_UNITS,
        },
    ],
    basics: [
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: 'image',
                    type: 'assetInput',
                    label: 'Image',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
            ],
        },
    ],
    layout: [
        {
            id: 'containerSection',
            type: 'sectionHeading',
            label: 'Container',
            blocks: [
                {
                    id: 'hasCustomOffset',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Container offset',
                    info: 'You can adjust the default logo container',
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'paddingChoice', 'paddingTop', topBottomOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingBottom', topBottomOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingLeft', leftRightOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingRight', leftRightOffsetMap);
                    },
                    on: [
                        {
                            id: 'customPadding',
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            blocks: [
                                {
                                    icon: IconEnum.ArrowUp,
                                    id: 'paddingTop',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingTop'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowLeft,
                                    id: 'paddingLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingLeft'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowRight,
                                    id: 'paddingRight',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingRight'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowDown,
                                    id: 'paddingBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingBottom'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                            ],
                        },
                    ],
                    off: [],
                },
                {
                    defaultValue: 'none',
                    id: 'whiteSpaceChoice',
                    info: 'Whitespace is an extra white space around your logo and clearspace.',
                    label: 'Whitespace space',
                    type: 'slider',
                    choices: [
                        {
                            label: 'None',
                            value: 'none',
                        },
                        {
                            label: 'S',
                            value: Offset.S,
                        },
                        {
                            label: 'M',
                            value: Offset.M,
                        },
                        {
                            label: 'L',
                            value: Offset.L,
                        },
                    ],
                },
            ],
        },
        {
            id: 'clearSpaceSection',
            type: 'sectionHeading',
            label: 'Logo clearspace',
            blocks: [
                {
                    defaultValue: 'height',
                    id: 'clearSpaceChoice',
                    info: 'Select what is the clearspace percentage value based on',
                    label: 'Clearspace based on',
                    show: (bundle) => bundle.getBlock(LOGO_SPACING)?.value === LogoSpacingType.Percentage,
                    type: 'slider',
                    choices: [
                        {
                            label: 'Height',
                            value: 'height',
                        },
                        {
                            label: 'Width',
                            value: 'width',
                        },
                    ],
                },
                {
                    id: 'clearSpaceValue',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Clearspace value',
                    info: 'Clearspace defines a safe space around logo which should always be empty.',
                    switchLabel: 'Custom',
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'paddingChoice', 'paddingTop', topBottomOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingBottom', topBottomOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingLeft', leftRightOffsetMap);
                        presetCustomValue(bundle, 'paddingChoice', 'paddingRight', leftRightOffsetMap);
                    },
                    on: [
                        {
                            id: 'customPadding',
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            blocks: [
                                {
                                    icon: IconEnum.ArrowAlignUp,
                                    id: 'paddingTop',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingTop'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowAlignLeft,
                                    id: 'paddingLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingLeft'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowAlignRight,
                                    id: 'paddingRight',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingRight'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowAlignDown,
                                    id: 'paddingBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'paddingBottom'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0px',
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            defaultValue: 'none',
                            id: 'whiteSpaceChoice',
                            type: 'slider',
                            choices: [
                                {
                                    label: 'None',
                                    value: 'none',
                                },
                                {
                                    label: '20%',
                                    value: Offset.S,
                                },
                                {
                                    label: '40%',
                                    value: Offset.M,
                                },
                                {
                                    label: '60%',
                                    value: Offset.L,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'labelsSection',
            type: 'sectionHeading',
            label: 'Labels',
            blocks: [
                {
                    id: 'labelColor',
                    label: 'Label color',
                    type: 'colorInput',
                    defaultValue: COLOR_DEFAULT_LABEL,
                },
            ],
        },
        {
            id: 'clearSpaceSection',
            type: 'sectionHeading',
            label: 'Clearspace',
            blocks: [
                {
                    id: 'boundariesColorSwitch',
                    label: 'Custom boundaries',
                    type: 'switch',
                    on: [
                        {
                            id: 'lineStyle',
                            type: 'multiInput',
                            label: '',
                            onChange: (bundle) => {
                                appendUnit(bundle, BOUNDARIES_THICKNESS_ID);
                            },
                            layout: MultiInputLayout.Columns,
                            lastItemFullWidth: true,
                            blocks: [
                                {
                                    id: 'style',
                                    type: 'dropdown',
                                    defaultValue: STYLE_DEFAULT_VALUE,
                                    choices: [
                                        {
                                            value: LineStyle.Solid,
                                            label: 'Solid',
                                        },
                                        {
                                            value: LineStyle.Dotted,
                                            label: 'Dotted',
                                        },
                                        {
                                            value: LineStyle.Dashed,
                                            label: 'Dashed',
                                        },
                                    ],
                                },
                                {
                                    id: BOUNDARIES_THICKNESS_ID,
                                    type: 'input',
                                    defaultValue: '1px',
                                    placeholder: 'e.g. 3px',
                                    clearable: false,
                                    rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(1)],
                                },
                                {
                                    id: BOUNDARIES_COLOR_ID,
                                    type: 'colorInput',
                                    defaultValue: COLOR_DEFAULT_CLEARSPACE,
                                },
                            ],
                        },
                    ],
                    off: [],
                },
                {
                    id: 'clearspaceBackgroundSwitch',
                    label: 'Clearspace background',
                    type: 'switch',
                    on: [
                        {
                            id: CLEARSPACE_BG_COLOR_ID,
                            label: '',
                            type: 'colorInput',
                            defaultValue: COLOR_DEFAULT_CLEARSPACE,
                        },
                    ],
                    off: [],
                },
            ],
        },
    ],
});
