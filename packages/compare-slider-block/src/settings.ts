import {
    AssetChooserObjectType,
    AssetInputSize,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    minimumNumericRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { BorderStyle, Radius, getBorderRadiusSlider, radiusStyleMap } from '../../shared';
import { Alignment, Handle, Height } from './types';

export const settings = defineSettings({
    basics: [
        {
            id: 'firstAsset',
            type: 'assetInput',
            label: 'First Image',
            size: AssetInputSize.Small,
            objectTypes: [AssetChooserObjectType.ImageVideo],
        },
        {
            id: 'secondAsset',
            type: 'assetInput',
            label: 'Second Image',
            size: AssetInputSize.Small,
            objectTypes: [AssetChooserObjectType.ImageVideo],
        },
    ],
    layout: [
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            defaultValue: Alignment.Horizontal,
            info: 'This tooltip needs copy!',
            choices: [
                {
                    value: Alignment.Horizontal,
                    label: 'Left/Right',
                },
                {
                    value: Alignment.Vertical,
                    label: 'Top/Bottom',
                },
            ],
        },
        {
            id: 'hasCustomHeight',
            label: 'Height',
            type: 'switch',
            info: 'This tooltip needs copy!',
            switchLabel: 'Custom',
            defaultValue: false,
            show: () => true,
            on: [
                {
                    id: 'customHeight',
                    type: 'input',
                    placeholder: 'e.g. 500px',
                    rules: [numericalOrPixelRule, minimumNumericRule(100)],
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
                            value: Height.Auto,
                            label: 'Auto',
                        },
                        {
                            value: Height.Small,
                            label: 'S',
                        },
                        {
                            value: Height.Medium,
                            label: 'M',
                        },
                        {
                            value: Height.Large,
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
            blocks: [
                /*{
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
                },*/
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
                        red: 255,
                        green: 255,
                        blue: 255,
                        alpha: 1,
                    },
                },
            ],
        },
        {
            id: 'handle',
            type: 'slider',
            label: 'Handles',
            defaultValue: Handle.Arrows,
            choices: [
                {
                    value: Handle.Arrows,
                    label: 'Arrows',
                },
                {
                    value: Handle.Circles,
                    label: 'Circles',
                },
                {
                    value: Handle.None,
                    label: 'None',
                },
            ],
        },
        {
            id: 'borderSection',
            type: 'multiInput',
            label: 'Border',
            onChange: (bundle) => appendUnit(bundle, 'borderWidth'),
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
                    defaultValue: '0px',
                    rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    placeholder: 'e.g. 1px',
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: {
                        red: 255,
                        green: 255,
                        blue: 255,
                        alpha: 1,
                    },
                },
            ],
        },
        {
            id: 'hasCustomBorderRadius',
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
