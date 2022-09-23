/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutColor, ColorPickerFlyoutProps } from '../types';

export const ColorPickerFlyout = ({
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    colors,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const handleCancelClick = () => {
        setIsColorPickerOpen(false);
        setEditedColor(null);
    };

    const handleSelectColor = (color: Color) => {
        const { id } = color as ColorPickerFlyoutColor;

        if (!editedColor) {
            updateColor({
                id,
                color: {
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                },
            });
            setEditedColor({
                id,
                color: {
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                },
            });
        } else {
            updateColor({
                id: editedColor.id,
                color: {
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                },
            });
            setEditedColor({
                id: editedColor.id,
                color: {
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                },
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
                        currentColor={
                            editedColor && editedColor.color
                                ? editedColor.color
                                : {
                                      blue: 255,
                                      green: 102,
                                      red: 85,
                                  }
                        }
                        currentFormat={colorPickerFormat}
                        setFormat={setColorPickerFormat}
                        onSelect={handleSelectColor}
                        palettes={colors}
                    />
                </Flyout>
            </div>
        </>
    );
};
