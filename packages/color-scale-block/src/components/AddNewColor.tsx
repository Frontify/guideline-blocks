/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { AddNewColorModalProps, ColorProps } from '../types';
import { Flyout, ColorPicker, ColorFormat, Color } from '@frontify/fondue';
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
}) => {
    return (

    <>
            <div ref={colorPickerRef}>
                <Flyout
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
                        currentColor={editedColor ? editedColor.color : {r: 0, g: 0, b: 0}}
                        currentFormat={ColorFormat.Rgba}
                        onSelect={(color: Color) => {
                            if (!editedColor) {
                                const newUuid = uuid();
                                updateColor({id: newUuid, color: color, index: newIndex} , newIndex);
                                setEditedColor({id: newUuid, color: color, index: newIndex});
                            } else {
                                updateColor({id: editedColor.id, color: color}, editedColor.index);
                                setEditedColor({id:  editedColor.id, color: color, index: editedColor.index});

                            }
                        }}
                        setFormat={setFormat}
                    />
                </Flyout>
            </div>
    </>
    )
};
