/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    appendUnit,
    defineSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { StorybookHeight, StorybookPosition, StorybookStyle, heights } from './types';
import { isValidStorybookUrl } from './utils/isValidStorybookUrl';

export const ERROR_MSG = 'Please enter a valid Storybook url';

export const BORDER_COLOR_DEFAULT_VALUE = {
    red: 234,
    green: 235,
    blue: 235,
    alpha: 1,
    name: 'Light Grey',
};
export const URL_INPUT_PLACEHOLDER = 'https://brand.storybook.com/?path=/story/buttons';

const STYLE_ID = 'style';
const HEIGHT_VALUE_ID = 'heightValue';
const HEIGHT_CHOICE_ID = 'heightChoice';

export const MIN_HEIGHT_VALUE = 30;
export const settings = defineSettings({
    main: [
        {
            id: STYLE_ID,
            type: 'dropdown',
            defaultValue: StorybookStyle.Default,
            size: 'large',
            choices: [
                {
                    value: StorybookStyle.Default,
                    icon: 'CodeFrame',
                    label: 'Story only',
                },
                {
                    value: StorybookStyle.WithAddons,
                    icon: 'CodeFrame',
                    label: 'Story with add-ons',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'url',
            label: 'Link',
            type: 'input',
            placeholder: URL_INPUT_PLACEHOLDER,
            rules: [{ validate: (value) => isValidStorybookUrl(value), errorMessage: ERROR_MSG }],
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
            onChange: (bundle) => presetCustomValue(bundle, HEIGHT_CHOICE_ID, HEIGHT_VALUE_ID, heights),

            on: [
                {
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: 'e.g. 500px',
                    defaultValue: StorybookHeight.Medium,
                    rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(MIN_HEIGHT_VALUE)],
                    onChange: (bundle) => appendUnit(bundle, HEIGHT_VALUE_ID),
                },
            ],
            off: [
                {
                    id: HEIGHT_CHOICE_ID,
                    type: 'segmentedControls',
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
            type: 'segmentedControls',
            defaultValue: StorybookPosition.Vertical,
            info: "Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.",
            show: (bundle) => bundle.getBlock('style')?.value === StorybookStyle.WithAddons,
            choices: [
                {
                    value: StorybookPosition.Horizontal,
                    icon: 'MediaObjectTextRight',
                },
                {
                    value: StorybookPosition.Vertical,
                    icon: 'MediaObjectTextBottom',
                },
            ],
        },
    ],
    style: [
        getBorderSettings({ defaultColor: BORDER_COLOR_DEFAULT_VALUE }),
        getBorderRadiusSettings({ dependentSettingId: 'hasBorder' }),
    ],
});
