/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps } from '../types';
import { FrontifyColorPalette } from '@frontify/app-bridge';

const getColorId = (appBridgePalettes: FrontifyColorPalette[], selectedColor: Color) => {
    if (!selectedColor) {
        return;
    }

    for (const palette of appBridgePalettes) {
        return palette.colors.find(
            (paletteColor) =>
                paletteColor.red === selectedColor.red &&
                paletteColor.blue === selectedColor.blue &&
                paletteColor.green === selectedColor.green
        )?.id;
    }
};

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
        const id = getColorId(appBridgePalettes, selectedColor);

        const newColor = {
            red: selectedColor.red,
            green: selectedColor.green,
            blue: selectedColor.blue,
            alpha: selectedColor.alpha,
            name: selectedColor.name,
        };

        if (!editedColor && id) {
            updateColor({
                ...newColor,
                id,
            });
            setEditedColor({
                ...newColor,
                id,
            });
        } else if (editedColor && id) {
            updateColor({
                ...newColor,
                id: editedColor.id,
            });
            setEditedColor({
                ...newColor,
                id: editedColor.id,
            });
        }
        setIsColorPickerOpen(false);
    };

    return (
        <Flyout
            placement={FlyoutPlacement.Top}
            isOpen={isColorPickerOpen}
            contentMinHeight={300}
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
    );
};
