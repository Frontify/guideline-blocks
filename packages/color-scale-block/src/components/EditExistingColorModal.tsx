/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { EditExistingColorModalProps } from '../types';
import { Flyout, ColorPicker, ColorFormat } from '@frontify/arcade';

export const EditExistingColorModal: FC<EditExistingColorModalProps> = ({
    id,
    currentColor,
    isEditing,
    colorPickerRef,
    editedColor,
    setEditedColor,
    updateColor,
    setFormat,
}) => (
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
                        currentColor={currentColor}
                        currentFormat={ColorFormat.Rgba}
                        onSelect={(color) => {
                            updateColor(color, id);
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
