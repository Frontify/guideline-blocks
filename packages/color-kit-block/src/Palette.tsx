/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Text } from '@frontify/fondue';

import { Color } from './Color';
import type { PaletteProps } from './types';

export const Palette = ({ palette, isEditing }: PaletteProps) => {
    const { name, colors = [] } = palette;

    return (
        <div data-test-id="palette" className="tw-flex tw-flex-col tw-space-y-2">
            <Text color="x-weak">{name}</Text>

            <div className="tw-flex tw-flex-wrap [&>div]:tw-h-6 [&>div:first-child>div]:tw-shadow-inner-line-first [&>div:last-child>div]:tw-shadow-inner-line-last">
                {colors.map((color) => (
                    <Color key={color.id} isEditing={isEditing} color={color} />
                ))}
            </div>
        </div>
    );
};
