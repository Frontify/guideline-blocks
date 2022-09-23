/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps } from '../types';

export const ColorPickerFlyout = ({
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    appBridgePalettes,
    colorPickerFlyoutPalettes,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const handleCancelClick = () => {
        setIsColorPickerOpen(false);
        setEditedColor(null);
    };

    const handleSelectColor = (color: Color) => {
        let id;
        for (const palette of appBridgePalettes) {
            for (const paletteColor of palette.colors) {
                const frontifyColor = paletteColor;
                if (
                    paletteColor.red === color.red &&
                    paletteColor.blue === color.blue &&
                    paletteColor.green === color.green
                ) {
                    id = frontifyColor.id;
                }
            }
        }

        if (!editedColor) {
            updateColor({
                id,
                red: color.red,
                green: color.green,
                blue: color.blue,
                alpha: color.alpha,
                name: color.name,
            });
            setEditedColor({
                id,
                red: color.red,
                green: color.green,
                blue: color.blue,
                alpha: color.alpha,
                name: color.name,
            });
        } else {
            updateColor({
                id: editedColor.id,
                red: color.red,
                green: color.green,
                blue: color.blue,
                alpha: color.alpha,
                name: color.name,
            });
            setEditedColor({
                id: editedColor.id,
                red: color.red,
                green: color.green,
                blue: color.blue,
                alpha: color.alpha,
                name: color.name,
            });
        }
    };

    return (
        <>
            <div>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={handleCancelClick}
                    onOpenChange={() => true}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        allowCustomColor={false}
                        currentColor={editedColor ? editedColor : ({} as Color)}
                        currentFormat={colorPickerFormat}
                        setFormat={setColorPickerFormat}
                        onSelect={handleSelectColor}
                        palettes={colorPickerFlyoutPalettes}
                    />
                </Flyout>
            </div>
        </>
    );
};
