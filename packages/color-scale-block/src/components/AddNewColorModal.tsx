/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { AddNewColorModalProps, ColorProps } from '../types';
import { Flyout, ColorPicker, ColorFormat, Color } from '@frontify/fondue';

export const AddNewColorModal: FC<AddNewColorModalProps> = ({
    id,
    currentColor,
    isEditing,
    colorPickerRef,
    editedColor,
    setEditedColor,
    updateColor,
    setFormat,
}) => {
    return (

    <>
        {isEditing ? (
            <div ref={colorPickerRef}>
                <Flyout
                    isOpen={editedColor === `new-${id}`}
                    onCancel={() => setEditedColor(null)}
                    onOpenChange={() => setEditedColor(`new-${id}`)}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        currentColor={currentColor.color ? currentColor.color : {r: 0, g: 0, b: 0}}
                        currentFormat={ColorFormat.Rgba}
                        onSelect={(color: Color) => {
                            updateColor({color: color, width: currentColor.width} , id, true);
                        }}
                        setFormat={setFormat}
                    />
                </Flyout>
            </div>
        ) : (
            <></>
        )}
    </>
    )
};
