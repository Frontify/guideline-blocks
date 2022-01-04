/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { Bundle } from '@frontify/guideline-blocks-settings';
import { SettingBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnitToArray, numericalOrPixelRule } from '..';
import { getBorderRadiusSlider } from './borderRadius';

type BorderRadiusSettingsType = {
    id?: string;
    dependentSettingId?: string;
};

/**
 * Returns border radius settings: border radius switch, radius slider, custom radius inputs for every corner
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.dependentSettingId Id of setting which the border radius is dependent on
 * @returns {SettingBlock} Returns border settings
 */
export const getExtendedBorderRadiusSettings = (options?: BorderRadiusSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasRadius_${options.id}` : 'hasRadius';
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
        show: (bundle: Bundle): boolean =>
            options?.dependentSettingId ? !!bundle.getBlock(options.dependentSettingId)?.value : true,
        on: [
            {
                id: valueId,
                type: 'multiInput',
                layout: MultiInputLayout.Columns,
                onChange: (bundle: Bundle): void => appendUnitToArray(bundle, valueId),
                blocks: [
                    {
                        id: topLeftId,
                        type: 'input',
                        label: 'Top Left',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: topRightId,
                        type: 'input',
                        label: 'Top Right',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: bottomLeftId,
                        type: 'input',
                        label: 'Bottom Left',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: bottomRightId,
                        type: 'input',
                        label: 'Bottom Right',
                        rules: [numericalOrPixelRule],
                    },
                ],
            },
        ],
        off: [getBorderRadiusSlider(choiceId)],
    };
};
