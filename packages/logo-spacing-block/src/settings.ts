import {
    AssetChooserObjectType,
    AssetInputSize,
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
});
