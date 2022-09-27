/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Text, merge } from '@frontify/fondue';

import { EmptyView } from './EmptyView';
import { Color } from './Color';
import type { PaletteProps } from './types';

export const Palette = ({ palette, isEditing }: PaletteProps) => {
    const { name, colors = [] } = palette;

    if (colors.length === 0) {
        return <EmptyView paletteName={`${name || 'Unitled Palette'} (no colors added)`} />;
    }

    return (
        <div data-test-id="palette" className="tw-flex tw-flex-col tw-space-y-2 tw-mb-3 last:tw-mb-0">
            <Text color="x-weak">{name}</Text>

            <div
                className={merge([
                    'tw-flex tw-flex-wrap',
                    isEditing
                        ? '[&>div:first-child>div]:tw-shadow-inner-line-first [&>div:last-child>div]:tw-shadow-inner-line-last'
                        : '[&>div:first-child>div>div>div]:tw-shadow-inner-line-first [&>div:last-child>div>div>div]:tw-shadow-inner-line-last',
                ])}
            >
                {colors.map((color) => (
                    <Color key={color.id} isEditing={isEditing} color={color} />
                ))}
            </div>
        </div>
    );
};
