/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from "react";
import { ColorPickerFlyoutProps, ColorProps } from "../types";
import {
    Flyout,
    FlyoutPlacement,
    ColorPicker,
    ColorFormat,
    Color,
} from "@frontify/fondue";
import { uuid } from "uuidv4";

export const ColorPickerFlyout = ({
    newIndex,
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    setFormat,
    colors,
    children,
}: ColorPickerFlyoutProps) => {
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState<Color>(
        currentColor?.alpha
            ? {
                  ...currentColor,
                  alpha:
                      currentColor.alpha &&
                      parseFloat((currentColor.alpha / 255).toFixed(2)),
              }
            : { red: 255, green: 255, blue: 255, alpha: 1 }
    );

    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Flyout
                    hug={false}
                    onConfirm={() => {
                        handleClick();
                        onConfirm(selectedColor);
                    }}
                    isOpen={open}
                    onCancel={() => handleOpenChange(false)}
                    onOpenChange={handleOpenChange}
                    trigger={children}
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
                        setFormat={setCurrentFormat}
                        onSelect={(color: Color) => {
                            if (!editedColor) {
                                const newUuid = uuid();
                                updateColor(
                                    {
                                        id: newUuid,
                                        color: color,
                                        index: newIndex,
                                    },
                                    newIndex
                                );
                                setEditedColor({
                                    id: newUuid,
                                    color: color,
                                    index: newIndex,
                                });
                            } else {
                                updateColor(
                                    { id: editedColor.id, color: color },
                                    editedColor.index
                                );
                                setEditedColor({
                                    id: editedColor.id,
                                    color: color,
                                    index: editedColor.index,
                                    width: editedColor.width,
                                });
                            }
                        }}
                        palettes={colors}
                    />
                </Flyout>
            </div>
        </>
    );
};
