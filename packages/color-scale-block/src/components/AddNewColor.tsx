/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from "react";
import { AddNewColorModalProps, ColorProps } from "../types";
import { Flyout, FlyoutPlacement, ColorPicker, ColorFormat, Color } from "@frontify/fondue";
import { uuid } from "uuidv4";

export const AddNewColor: FC<AddNewColorModalProps> = ({
    newIndex,
    colorPickerRef,
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    setFormat,
    colors,
}) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);

    return (
        <>
            <div ref={colorPickerRef}>
                <Flyout
                    placement={
                        FlyoutPlacement.Top
                    }
                    isOpen={isColorPickerOpen}
                    onCancel={() => {
                        setIsColorPickerOpen(false);
                        setEditedColor(null);
                    }}
                    onOpenChange={() => {}}
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
                            setFormat={(format) => {
                                setColorPickerFormat(format);
                            }}
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
