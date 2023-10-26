/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { SettingBlock, toRgbaString } from '@frontify/guideline-blocks-settings';
import { TEXT_DEFAULT_COLOR } from '../constants';
import { CSSProperties } from 'react';

type ColorSettingsType = {
    id?: string;
    defaultValue?: boolean;
    defaultColor?: Color;
    preventDefaultColor?: boolean;
    label?: string;
    switchLabel?: string;
};

export const getColorStyles = (color: Color): CSSProperties => ({
    color: toRgbaString(color),
});

export const getColorSettings = (options?: ColorSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasColor_${options.id}` : 'hasColor';
    const colorId = options?.id ? `colorValue_${options.id}` : 'colorValue';
    const defaultColor = !!options?.preventDefaultColor ? undefined : options?.defaultColor || TEXT_DEFAULT_COLOR;
    const label = options?.label ? options.label : 'Color';
    const switchLabel = options?.switchLabel ? options.switchLabel : undefined;

    return {
        id: hasId,
        label,
        type: 'switch',
        switchLabel,
        defaultValue: !!options?.defaultValue,
        on: [
            {
                id: colorId,
                defaultValue: defaultColor,
                type: 'colorInput',
            },
        ],
    };
};
