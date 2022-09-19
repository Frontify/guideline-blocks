/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';
import { AddNewColorModalProps } from '../types';

export const AddNewColorModal: FC<AddNewColorModalProps> = ({
    id,
    currentColor,
    isEditing,
    editedColor,
    setEditedColor,
    updateColor,
    setFormat,
}) => {
    const onCancel = () => setEditedColor(null);
    const onOpenChange = () => setEditedColor(currentColor);

    return (
        <>
            {isEditing ? (
                <div>
                    <Flyout
                        isOpen={editedColor.id === id}
                        onCancel={onCancel}
                        onOpenChange={onOpenChange}
                        title="Pick color"
                        trigger={<></>}
                    >
                        <ColorPicker
                            currentColor={currentColor.color ? currentColor.color : { r: 0, g: 0, b: 0 }}
                            currentFormat={ColorFormat.Rgba}
                            onSelect={(color: Color) => {
                                updateColor({ id, color, width: currentColor.width });
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
};
