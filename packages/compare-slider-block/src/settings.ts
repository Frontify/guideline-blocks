import {
    AssetChooserObjectType,
    AssetInputSize,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { BorderStyle, Radius, getBorderRadiusSlider, radiusStyleMap } from '../../shared';

export const settings = defineSettings({
    basics: [
        {
            id: 'firstImageSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: 'firstImage',
                    type: 'assetInput',
                    label: 'First Image',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
                {
                    id: 'firstImageHasLink',
                    type: 'switch',
                    label: 'Link',
                    defaultValue: false,
                    on: [
                        {
                            id: 'linkUrl',
                            type: 'linkChooser',
                            placeholder: 'Paste link, or type to search',
                        },
                    ],
                },
                {
                    id: 'firstImageHasStrikeThrough',
                    type: 'switch',
                    label: 'Strike-Trough',
                    defaultValue: false,
                },
            ],
        },
        {
            id: 'secondImageSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: 'secondImage',
                    type: 'assetInput',
                    label: 'Second Image',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
                {
                    id: 'secondImageHasLink',
                    type: 'switch',
                    label: 'Link',
                    defaultValue: false,
                    on: [
                        {
                            id: 'linkUrl',
                            type: 'linkChooser',
                            placeholder: 'Paste link, or type to search',
                        },
                    ],
                },
                {
                    id: 'secondImageHasStrikeThrough',
                    type: 'switch',
                    label: 'Strike-Trough',
                    defaultValue: false,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            defaultValue: 'horizontal',
            info: 'This tooltip needs copy!',
            choices: [
                {
                    value: 'horizontal',
                    label: 'Left/Right',
                },
                {
                    value: 'vertical',
                    label: 'Top/Bottom',
                },
            ],
        },
        {
            id: 'heightSwitch',
            label: 'Height',
            type: 'switch',
            info: 'This tooltip needs copy!',
            switchLabel: 'Custom',
            defaultValue: false,
            show: () => true,
            onChange: (bundle) => presetCustomValue(bundle, Radius.None, 'customHeight', radiusStyleMap),
            on: [
                {
                    id: 'customHeight',
                    type: 'input',
                    placeholder: 'e.g. 500px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'customHeight'),
                },
            ],
            off: [
                {
                    id: 'height',
                    type: 'slider',
                    defaultValue: 'auto',
                    choices: [
                        {
                            value: 'auto',
                            label: 'Auto',
                        },
                        {
                            value: 's',
                            label: 'S',
                        },
                        {
                            value: 'm',
                            label: 'M',
                        },
                        {
                            value: 'l',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'sliderStyleSection',
            type: 'multiInput',
            label: 'Slider',
            onChange: (bundle) => appendUnit(bundle, 'sliderWidth'),
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            blocks: [
                {
                    id: 'sliderStyle',
                    type: 'dropdown',
                    defaultValue: BorderStyle.Solid,
                    choices: [
                        {
                            value: BorderStyle.Solid,
                            label: BorderStyle.Solid,
                        },
                        {
                            value: BorderStyle.Dotted,
                            label: BorderStyle.Dotted,
                        },
                        {
                            value: BorderStyle.Dashed,
                            label: BorderStyle.Dashed,
                        },
                    ],
                },
                {
                    id: 'sliderWidth',
                    type: 'input',
                    defaultValue: '1px',
                    rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    placeholder: 'e.g. 1px',
                },
                {
                    id: 'sliderColor',
                    type: 'colorInput',
                    defaultValue: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: 1,
                    },
                },
            ],
        },
        {
            id: 'handle',
            type: 'slider',
            label: 'Handles',
            defaultValue: 'arrows',
            choices: [
                {
                    value: 'arrows',
                    label: 'Arrows',
                },
                {
                    value: 'circles',
                    label: 'Circles',
                },
                {
                    value: 'none',
                    label: 'None',
                },
            ],
        },
        {
            id: 'borderSection',
            type: 'multiInput',
            label: 'Border',
            onChange: (bundle) => appendUnit(bundle, 'sliderWidth'),
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            blocks: [
                {
                    id: 'borderStyle',
                    type: 'dropdown',
                    defaultValue: BorderStyle.Solid,
                    choices: [
                        {
                            value: BorderStyle.Solid,
                            label: BorderStyle.Solid,
                        },
                        {
                            value: BorderStyle.Dotted,
                            label: BorderStyle.Dotted,
                        },
                        {
                            value: BorderStyle.Dashed,
                            label: BorderStyle.Dashed,
                        },
                    ],
                },
                {
                    id: 'borderWidth',
                    type: 'input',
                    defaultValue: '1px',
                    rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    placeholder: 'e.g. 1px',
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: 1,
                    },
                },
            ],
        },
        {
            id: 'borderRadiusSwitch',
            label: 'Border Radius',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            show: () => true,
            onChange: (bundle) => presetCustomValue(bundle, Radius.None, 'customBorderRadius', radiusStyleMap),
            on: [
                {
                    id: 'customBorderRadius',
                    type: 'input',
                    placeholder: 'e.g. 10px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'customBorderRadius'),
                },
            ],
            off: [getBorderRadiusSlider('borderRadius', Radius.None)],
        },
    ],
});
