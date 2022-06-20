/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    getBorderRadiusSettings,
    getBorderSettings,
    maximumNumericalOrPixelOrAutoRule,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import { StorybookHeight, StorybookPosition, StorybookStyle, heights } from './types';

export const BORDER_COLOR_DEFAULT_VALUE = {
    r: 234,
    g: 235,
    b: 235,
    a: 1,
    name: 'Light Grey',
};
export const URL_INPUT_PLACEHOLDER = 'https://brand.storybook.com/?path=/story/buttons';

const STYLE_ID = 'style';
const HEIGHT_VALUE_ID = 'heightValue';
const HEIGHT_CHOICE_ID = 'heightChoice';

const settings: BlockSettings = {
    main: [
        {
            id: STYLE_ID,
            type: 'dropdown',
            defaultValue: StorybookStyle.Default,
            size: DropdownSize.Large,
            choices: [
                {
                    value: StorybookStyle.Default,
                    icon: IconEnum.Iframe,
                    label: 'Story (with add-ons)',
                },
                {
                    value: StorybookStyle.WithoutAddons,
                    icon: IconEnum.Iframe,
                    label: 'Story (no add-ons)',
                },
            ],
        },
    ],
    content: [
        {
            id: 'url',
            label: 'Link',
            type: 'input',
            placeholder: URL_INPUT_PLACEHOLDER,
        },
    ],
    layout: [
        {
            id: 'isCustomHeight',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: 'Determines the maximum height. Height is predefined or restricted to make sure UI elements don’t look broken or strange when viewed on different devices',
            onChange: (bundle: Bundle): void => presetCustomValue(bundle, HEIGHT_CHOICE_ID, HEIGHT_VALUE_ID, heights),

            on: [
                {
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: '400px',
                    rules: [
                        numericalOrPixelRule,
                        minimumNumericalOrPixelOrAutoRule(10),
                        maximumNumericalOrPixelOrAutoRule(5000),
                    ],
                    onChange: (bundle: Bundle): void => appendUnit(bundle, HEIGHT_VALUE_ID),
                },
            ],
            off: [
                {
                    id: HEIGHT_CHOICE_ID,
                    type: 'slider',
                    defaultValue: StorybookHeight.Medium,
                    choices: [
                        {
                            value: StorybookHeight.Small,
                            label: 'S',
                        },
                        {
                            value: StorybookHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: StorybookHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
        {
            id: 'positioning',
            label: 'Positioning',
            type: 'slider',
            defaultValue: StorybookPosition.Horizontal,
            info: 'Where the UI elements are in relation to one another',
            show: (bundle: Bundle): boolean => bundle.getBlock('style')?.value === StorybookStyle.Default,
            choices: [
                {
                    value: StorybookPosition.Horizontal,
                    icon: IconEnum.FigureTextRight,
                },
                {
                    value: StorybookPosition.Vertical,
                    icon: IconEnum.FigureTextBottom,
                },
            ],
        },
    ],
    style: [getBorderSettings(), getBorderRadiusSettings({ dependentSettingId: 'hasBorder' })],
};

export default settings;
