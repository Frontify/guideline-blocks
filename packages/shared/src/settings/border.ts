/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { Bundle } from '@frontify/guideline-blocks-settings';
import { SettingBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { BorderStyle } from './types';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule } from '..';
import { BORDER_COLOR_DEFAULT_VALUE, BORDER_WIDTH_DEFAULT_VALUE } from './defaultValues';

/**
 * Returns border settings: border switch, border style, border width, border color
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.defaultValue Default value for the border switch
 * @returns {SettingBlock} Returns border settings
 */

type BorderSettingsType = {
    id?: string;
    defaultValue?: boolean;
};

export const getBorderSettings = (options?: BorderSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasBorder_${options.id}` : 'hasBorder';
    const selectionId = options?.id ? `borderSelection_${options.id}` : 'borderSelection';
    const styleId = options?.id ? `borderStyle_${options.id}` : 'borderStyle';
    const widthId = options?.id ? `borderWidth_${options.id}` : 'borderWidth';
    const colorId = options?.id ? `borderColor_${options.id}` : 'borderColor';

    return {
        id: hasId,
        label: 'Border',
        type: 'switch',
        defaultValue: !!options?.defaultValue,
        on: [
            {
                id: selectionId,
                type: 'multiInput',
                layout: MultiInputLayout.Columns,
                lastItemFullWidth: true,
                blocks: [
                    {
                        id: styleId,
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
                        id: widthId,
                        type: 'input',
                        defaultValue: BORDER_WIDTH_DEFAULT_VALUE,
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                        onChange: (bundle: Bundle): void => appendUnit(bundle, widthId),
                    },
                    {
                        id: colorId,
                        type: 'colorInput',
                        defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                    },
                ],
            },
        ],
        off: [],
    };
};
