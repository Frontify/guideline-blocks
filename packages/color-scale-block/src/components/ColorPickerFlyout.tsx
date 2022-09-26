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
    children,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState(editedColor ? editedColor : ({} as Color));
    const handleCancelClick = () => {
        setIsColorPickerOpen(false);
        setEditedColor(null);
    };

    const handleSelectColor = () => {
        let id;

        if (!selectedColor.red && !selectedColor.green && !selectedColor.blue) {
            return;
        }

        for (const palette of appBridgePalettes) {
            for (const paletteColor of palette.colors) {
                const frontifyColor = paletteColor;
                if (
                    paletteColor.red === selectedColor.red &&
                    paletteColor.blue === selectedColor.blue &&
                    paletteColor.green === selectedColor.green
                ) {
                    id = frontifyColor.id;
                }
            }
        }

        if (!id) {
            return;
        }

        if (!editedColor) {
            updateColor({
                id,
                red: selectedColor.red,
                green: selectedColor.green,
                blue: selectedColor.blue,
                alpha: selectedColor.alpha,
                name: selectedColor.name,
            });
            setEditedColor({
                id,
                red: selectedColor.red,
                green: selectedColor.green,
                blue: selectedColor.blue,
                alpha: selectedColor.alpha,
                name: selectedColor.name,
            });
        } else {
            updateColor({
                id: editedColor.id,
                red: selectedColor.red,
                green: selectedColor.green,
                blue: selectedColor.blue,
                alpha: selectedColor.alpha,
                name: selectedColor.name,
            });
            setEditedColor({
                id: editedColor.id,
                red: selectedColor.red,
                green: selectedColor.green,
                blue: selectedColor.blue,
                alpha: selectedColor.alpha,
                name: selectedColor.name,
            });
        }
        setIsColorPickerOpen(false);
    };

    return (
        <>
            <div>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={handleCancelClick}
                    onConfirm={handleSelectColor}
                    onOpenChange={() => true}
                    title="Pick color"
                    trigger={children}
                >
                    <ColorPicker
                        allowCustomColor={false}
                        currentColor={selectedColor}
                        currentFormat={colorPickerFormat}
                        setFormat={setColorPickerFormat}
                        onSelect={setSelectedColor}
                        palettes={colorPickerFlyoutPalettes}
                    />
                </Flyout>
            </div>
        </>
    );
};
