import {
    AssetChooserObjectType,
    AssetInputSize,
    Bundle,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

const LOGO_SPACING = 'logo-spacing';
enum LogoSpacingType {
    Percentage = 'percentage_clearspace',
    Pixels = 'pixel_clearspace',
}

enum Offset {
    S = 's',
    M = 'm',
    L = 'l',
}

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

enum Property {
    Height = 'height',
    Width = 'width',
}

const appendPixelOrPercentage = (bundle: Bundle, property: string) => {
    if (bundle.getBlock(LOGO_SPACING)?.value === LogoSpacingType.Percentage) {
        appendUnit(bundle, property, '%');
    } else {
        appendUnit(bundle, property, 'px');
    }
};

export const settings = defineSettings({
    main: [
        {
            id: LOGO_SPACING,
            type: 'dropdown',
            defaultValue: LogoSpacingType.Percentage,
            size: DropdownSize.Large,
            disabled: false,
            choices: [
                {
                    value: LogoSpacingType.Percentage,
                    label: 'Percentage clearspace',
                },
                {
                    value: LogoSpacingType.Pixels,
                    label: 'Pixel clearspace',
                },
            ],
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
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowLeft,
                                    id: 'offsetLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetLeft'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowRight,
                                    id: 'offsetRight',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetRight'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowDown,
                                    id: 'offsetBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendUnit(bundle, 'offsetBottom'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
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
                    defaultValue: Property.Height,
                    id: 'clearSpacePropertyChoice',
                    info: 'Select what is the clearspace percentage value based on',
                    label: 'Clearspace based on',
                    type: 'slider',
                    show: (bundle) => bundle.getBlock(LOGO_SPACING)?.value === LogoSpacingType.Percentage,
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
                    id: 'clearSpaceValue',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Clearspace value',
                    info: 'Clearspace defines a safe space around logo which should always be empty.',
                    switchLabel: 'Custom',
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'clearSpaceValue', 'clearSpaceTop', topBottomOffsetMap);
                        presetCustomValue(bundle, 'clearSpaceValue', 'clearSpaceBottom', topBottomOffsetMap);
                        presetCustomValue(bundle, 'clearSpaceValue', 'clearSpaceLeft', leftRightOffsetMap);
                        presetCustomValue(bundle, 'clearSpaceValue', 'clearSpaceRight', leftRightOffsetMap);
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
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignLeft,
                                    id: 'clearSpaceLeft',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceLeft'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignRight,
                                    id: 'clearSpaceRight',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceRight'),
                                    rules: [numericalOrPixelRule],
                                    defaultValue: '0',
                                },
                                {
                                    icon: IconEnum.ArrowAlignDown,
                                    id: 'clearSpaceBottom',
                                    type: 'input',
                                    onChange: (bundle) => appendPixelOrPercentage(bundle, 'clearSpaceBottom'),
                                    rules: [numericalOrPixelRule],
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
});
