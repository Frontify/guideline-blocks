/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { AddNewColorModalProps, ColorProps } from '../types';
import { Flyout, ColorPicker, ColorFormat } from '@frontify/fondue';

export const AddNewColorModal: FC<AddNewColorModalProps> = ({
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
                    isOpen={editedColor === `new-${id}`}
                    onCancel={() => setEditedColor(null)}
                    onOpenChange={() => setEditedColor(`new-${id}`)}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        currentColor={currentColor}
                        currentFormat={ColorFormat.Rgba}
                        onSelect={(color: ColorProps) => {
                            updateColor(color, id, true);
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
