/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useMemo, useState } from 'react';
import { ColorPickerFlyout, FormControl, Color, Palette } from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { ColorInputBlock as ColorInputBlockType } from '../../hooks/useSettings';
import { AppBridgeNative } from '@frontify/app-bridge';

export type ColorInputBlockProps = {
    block: ColorInputBlockType;
    onUpdate: UpdateDataFunction<Color | undefined>;
};

const UNKNOWN_PALETTE_NAME = 'Unnamed Palette';

export const ColorInputBlock: FC<ColorInputBlockProps> = ({ block, onUpdate }) => {
    const appBridge = useMemo(() => new AppBridgeNative(), []);
    const [selectedColor, setSelectedColor] = useState<Color | undefined>(block.value ?? block.defaultValue);
    const [availablePalettes, setAvailablePalettes] = useState<Palette[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const palettes = await appBridge.getAvailablePalettes();

            setAvailablePalettes(
                palettes.map((palette) => ({
                    id: palette.id,
                    title: palette.name || UNKNOWN_PALETTE_NAME,
                    colors: palette.colors.map((color) => ({
                        name: color.name,
                        rgba: {
                            r: color.r || 0,
                            g: color.g || 0,
                            b: color.b || 0,
                            a: color.opacity_css,
                        },
                        alpha: color.opacity_css,
                        hex: color.css_value_hex || `#${color.hex}`,
                    })),
                }))
            );
        })();
    }, []);

    return (
        <FormControl
            label={{
                children: block.label ?? '',
                htmlFor: block.id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
        >
            <ColorPickerFlyout
                currentColor={selectedColor ?? null}
                onClick={() => onUpdate(block.id, selectedColor)}
                onClose={() => setSelectedColor(block.value ?? block.defaultValue)}
                onSelect={(color) => setSelectedColor(color)}
                palettes={availablePalettes}
            />
        </FormControl>
    );
};
