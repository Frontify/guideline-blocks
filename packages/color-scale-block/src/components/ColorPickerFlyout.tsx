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
    colors,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const handleCancelClick = () => {
        setIsColorPickerOpen(false);
        setEditedColor(null);
    };

    const handleSelectColor = (color: Color) => {
        if (!editedColor) {
            updateColor({
                id: color.id,
                color: {
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                },
            });
            setEditedColor({
                id: color.id,
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

    const handleSetFormat = (format: ColorFormat) => {
        setColorPickerFormat(format);
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
                            editedColor
                                ? editedColor.color
                                : {
                                      blue: 255,
                                      green: 102,
                                      red: 85,
                                  }
                        }
                        currentFormat={colorPickerFormat}
                        setFormat={handleSetFormat}
                        onSelect={handleSelectColor}
                        palettes={colors}
                    />
                </Flyout>
            </div>
        </>
    );
};
