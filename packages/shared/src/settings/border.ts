/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule } from '..';
import { BorderStyle, BORDER_COLOR_DEFAULT_VALUE, BORDER_WIDTH_DEFAULT_VALUE } from './defaultValues';

/**
 * Returns border settings: border switch, border style, border width, border color
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.defaultValue Default value for the border switch
 * @returns {ApiBlock} Returns border settings
 */

type BorderSettingsType = {
    id?: string;
    defaultValue?: boolean;
};

export const getBorderSettings = (options?: BorderSettingsType): ApiBlock => {
    const HAS_ID = options?.id ? `hasBorder_${options.id}` : 'hasBorder';
    const SELECTION_ID = options?.id ? `borderSelection_${options.id}` : 'borderSelection';
    const STYLE_ID = options?.id ? `borderStyle_${options.id}` : 'borderStyle';
    const WIDTH_ID = options?.id ? `borderWidth_${options.id}` : 'borderWidth';
    const COLOR_ID = options?.id ? `borderColor_${options.id}` : 'borderColor';

    return {
        id: HAS_ID,
        label: 'Border',
        type: 'switch',
        defaultValue: !!options?.defaultValue,
        on: [
            {
                id: SELECTION_ID,
                type: 'multiInput',
                layout: MultiInputLayout.Columns,
                lastItemFullWidth: true,
                blocks: [
                    {
                        id: STYLE_ID,
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
                        id: WIDTH_ID,
                        type: 'input',
                        defaultValue: BORDER_WIDTH_DEFAULT_VALUE,
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                        onChange: (bundle: ApiBundle): void => appendUnit(bundle, WIDTH_ID),
                    },
                    {
                        id: COLOR_ID,
                        type: 'colorInput',
                        defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                    },
                ],
            },
        ],
        off: [],
    };
};
