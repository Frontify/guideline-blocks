/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import { radiusStyleMap } from '.';
import { appendUnit, numericalOrPixelRule, presetCustomValue } from '..';
import { getBorderRadiusSlider } from './borderRadius';

/**
 * Returns border radius settings: border radius switch, radius slider, custom radius inputs for every corner
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.dependentSettingId Id of setting which the border radius is dependent on
 * @returns {SettingBlock} Returns border settings
 */

type BorderRadiusSettingsType = {
    id?: string;
    dependentSettingId?: string;
};

export const getExtendedBorderRadiusSettings = (options?: BorderRadiusSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasCustomRadius_${options.id}` : 'hasCustomRadius';
    const valueId = options?.id ? `radiusValue_${options.id}` : 'radiusValue';
    const choiceId = options?.id ? `radiusChoice_${options.id}` : 'radiusChoice';
    const topLeftId = options?.id ? `radiusTopLeft_${options.id}` : 'radiusTopLeft';
    const topRightId = options?.id ? `radiusTopRight_${options.id}` : 'radiusTopRight';
    const bottomLeftId = options?.id ? `radiusBottomLeft_${options.id}` : 'radiusBottomLeft';
    const bottomRightId = options?.id ? `radiusBottomRight_${options.id}` : 'radiusBottomRight';

    return {
        id: hasId,
        label: 'Corner radius',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        info: 'Determining how rounded the corners are',
        show: (bundle: Bundle): boolean =>
            options?.dependentSettingId ? !!bundle.getBlock(options.dependentSettingId)?.value : true,
        onChange: (bundle: Bundle): void => {
            presetCustomValue(bundle, choiceId, topLeftId, radiusStyleMap);
            presetCustomValue(bundle, choiceId, topRightId, radiusStyleMap);
            presetCustomValue(bundle, choiceId, bottomLeftId, radiusStyleMap);
            presetCustomValue(bundle, choiceId, bottomRightId, radiusStyleMap);
        },
        on: [
            {
                id: valueId,
                type: 'multiInput',
                layout: MultiInputLayout.Columns,
                blocks: [
                    {
                        id: topLeftId,
                        type: 'input',
                        label: 'Top Left',
                        rules: [numericalOrPixelRule],
                        onChange: (bundle: Bundle): void => appendUnit(bundle, topLeftId),
                    },
                    {
                        id: topRightId,
                        type: 'input',
                        label: 'Top Right',
                        rules: [numericalOrPixelRule],
                        onChange: (bundle: Bundle): void => appendUnit(bundle, topRightId),
                    },
                    {
                        id: bottomLeftId,
                        type: 'input',
                        label: 'Bottom Left',
                        rules: [numericalOrPixelRule],
                        onChange: (bundle: Bundle): void => appendUnit(bundle, bottomLeftId),
                    },
                    {
                        id: bottomRightId,
                        type: 'input',
                        label: 'Bottom Right',
                        rules: [numericalOrPixelRule],
                        onChange: (bundle: Bundle): void => appendUnit(bundle, bottomRightId),
                    },
                ],
            },
        ],
        off: [getBorderRadiusSlider(choiceId)],
    };
};
