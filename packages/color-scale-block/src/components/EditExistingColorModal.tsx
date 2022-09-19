/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';
import { EditExistingColorModalProps } from '../types';

export const EditExistingColorModal: FC<EditExistingColorModalProps> = ({
    id,
    index,
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
                    isOpen={editedColor === id}
                    onCancel={() => setEditedColor(null)}
                    onOpenChange={() => setEditedColor(id)}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        currentColor={currentColor.color ? currentColor.color : {r: 0, g: 0, b: 0}}
                        currentFormat={ColorFormat.Rgba}
                        onSelect={(color: Color) => {
                            updateColor({id: id, color: color, width: currentColor.width}, index);
                        }}
                        setFormat={setFormat}
                    />
                </Flyout>
            </div>
        ) : (
            <></>
        )}
    </>
    );
}
