import {
    AssetChooserObjectType,
    AssetInputSize,
    Bundle,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPercentRule,
    numericalOrPixelRule,
    pixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import {
    BOUNDARIES_COLOR_ID,
    BOUNDARIES_THICKNESS_ID,
    CLEARSPACE_BG_COLOR_ID,
    CLEAR_SPACE_UNITS,
    COLOR_DEFAULT_CLEARSPACE,
    COLOR_DEFAULT_LABEL,
    LOGO_ID,
    LOGO_SPACING_ID,
    STYLE_DEFAULT_VALUE,
    leftRightOffsetMap,
    topBottomOffsetMap,
} from './constants';
import { LineStyle, LogoSpacingType, Property, Size } from './types';

const appendPixelOrPercentage = (bundle: Bundle, property: string) => {
    if (bundle.getBlock(LOGO_SPACING_ID)?.value === LogoSpacingType.Percentage) {
        appendUnit(bundle, property, '%');
    } else {
        appendUnit(bundle, property, 'px');
    }
};

export const settings = defineSettings({
    main: [
        {
            id: LOGO_SPACING_ID,
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
                    id: LOGO_ID,
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
                        presetCustomValue(bundle, 'hasCustomOffset', 'offsetTop', topBottomOffsetMap);
                        presetCustomValue(bundle, 'hasCustomOffset', 'offsetBottom', topBottomOffsetMap);
                        presetCustomValue(bundle, 'hasCustomOffset', 'offsetLeft', leftRightOffsetMap);
                        presetCustomValue(bundle, 'hasCustomOffset', 'offsetRight', leftRightOffsetMap);
                    },
                    on: [
                        {
                            id: 'customOffset',
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            blocks: [
                                {
                                    icon: IconEnum.ArrowUp,
                                    id: 'offsetTop',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetTop'),
                                    rules: [pixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowLeft,
                                    id: 'offsetLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetLeft'),
                                    rules: [pixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowRight,
                                    id: 'offsetRight',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetRight'),
                                    rules: [pixelRule],
                                    defaultValue: '0px',
                                },
                                {
                                    icon: IconEnum.ArrowDown,
                                    id: 'offsetBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetBottom'),
                                    rules: [pixelRule],
                                    defaultValue: '0px',
                                },
                            ],
                        },
                    ],
                    off: [],
                },
                {
                    defaultValue: Size.M,
                    id: 'containerSizeChoice',
                    info: 'Whitespace is an extra white space around your logo and clearspace.',
                    label: 'Container size',
                    type: 'slider',
                    choices: [
                        {
                            label: 'S',
                            value: Size.S,
                        },
                        {
                            label: 'M',
                            value: Size.M,
                        },
                        {
                            label: 'L',
                            value: Size.L,
                        },
                    ],
                },
            ],
        },
        {
            id: 'clearSpaceSection',
            type: 'sectionHeading',
            label: 'Clear space',
            blocks: [
                {
                    defaultValue: Property.Height,
                    id: 'clearSpacePropertyChoice',
                    info: 'Select what is the clearspace percentage value based on',
                    label: 'Defined by',
                    type: 'slider',
                    show: (bundle) => bundle.getBlock(LOGO_SPACING_ID)?.value === LogoSpacingType.Percentage,
                    choices: [
                        {
                            label: 'Height',
                            value: Property.Height,
                        },
                        {
                            label: 'Width',
                            value: Property.Width,
                        },
                    ],
                },
                {
                    id: 'hasCustomClearSpace',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Size',
                    info: 'Clearspace defines a safe space around logo which should always be empty.',
                    switchLabel: 'Custom',
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'hasCustomClearSpace', 'clearSpaceTop', topBottomOffsetMap);
                        presetCustomValue(bundle, 'hasCustomClearSpace', 'clearSpaceBottom', topBottomOffsetMap);
                        presetCustomValue(bundle, 'hasCustomClearSpace', 'clearSpaceLeft', leftRightOffsetMap);
                        presetCustomValue(bundle, 'hasCustomClearSpace', 'clearSpaceRight', leftRightOffsetMap);
                    },
                    on: [
                        {
                            id: 'customClearSpace',
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            blocks: [
                                {
                                    icon: IconEnum.ArrowAlignUp,
                                    id: 'clearSpaceTop',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceTop'),
                                    rules: [numericalOrPercentRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignLeft,
                                    id: 'clearSpaceLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceLeft'),
                                    rules: [numericalOrPercentRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignRight,
                                    id: 'clearSpaceRight',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceRight'),
                                    rules: [numericalOrPercentRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignDown,
                                    id: 'clearSpaceBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceBottom'),
                                    rules: [numericalOrPercentRule],
                                    defaultValue: '0',
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            defaultValue: 'none',
                            id: 'clearSpaceChoice',
                            type: 'slider',
                            choices: [
                                {
                                    label: 'None',
                                    value: 'none',
                                },
                                {
                                    label: '10%',
                                    value: Size.S,
                                },
                                {
                                    label: '20%',
                                    value: Size.M,
                                },
                                {
                                    label: '40%',
                                    value: Size.L,
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
            id: 'boundariesSection',
            type: 'sectionHeading',
            label: 'Clearspace',
            blocks: [
                {
                    id: 'boundariesStyle',
                    type: 'multiInput',
                    label: 'Custom boundaries',
                    onChange: (bundle) => {
                        appendUnit(bundle, BOUNDARIES_THICKNESS_ID);
                    },
                    layout: MultiInputLayout.Columns,
                    lastItemFullWidth: true,
                    blocks: [
                        {
                            id: 'lineStyle',
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
                {
                    id: CLEARSPACE_BG_COLOR_ID,
                    label: 'Clearspace background',
                    type: 'colorInput',
                    defaultValue: COLOR_DEFAULT_CLEARSPACE,
                },
            ],
        },
    ],
});
