/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, SettingBlock } from '@frontify/guideline-blocks-settings';
import { BACKGROUND_COLOR_DEFAULT_VALUE } from './defaultValues';

/**
 * Returns background settings: background switch, background color
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.defaultValue Default value for the background switch
 * @param options.defaultColor Default value for the background color
 * @returns {SettingBlock} Returns border settings
 */

type BackgroundSettingsType = {
    id?: string;
    defaultValue?: boolean;
    defaultColor?: Color;
};

export const getBackgroundSettings = (options?: BackgroundSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasBackground${options.id}` : 'hasBackground';
    const colorId = options?.id ? `backgroundColor${options.id}` : 'backgroundColor';
    const defaultColor = options?.defaultColor || BACKGROUND_COLOR_DEFAULT_VALUE;

    return {
        id: hasId,
        label: 'Background',
        type: 'switch',
        defaultValue: !!options?.defaultValue,
        on: [
            {
                id: colorId,
                defaultValue: defaultColor,
                type: 'colorInput',
            },
        ],
        off: [],
    };
};
