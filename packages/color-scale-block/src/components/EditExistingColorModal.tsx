/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';
import { EditExistingColorModalProps } from '../types';

export const EditExistingColorModal: FC<EditExistingColorModalProps> = ({
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
    const onSelectColor = (color: Color) => {
        updateColor({ id, color, width: currentColor.width });
    };

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
                            onSelect={onSelectColor}
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
