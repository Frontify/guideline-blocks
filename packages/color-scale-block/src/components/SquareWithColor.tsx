/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { SquareWithColorProps } from '../types';
import { AddNewColorModal } from './AddNewColorModal';
import { AddNewColorTooltips } from './AddNewColorTooltips';
import { EditExistingColorModal } from './EditExistingColorModal';
import { DragHandle } from './DragHandle';
import { CustomizationOptionsModal } from './CustomizationOptionsModal';

export const SquareWithColor: FC<SquareWithColorProps> = ({
    id,
    width,
    currentColor,
    backgroundColorRgba,
    onDragStart,
    calculateLeftPos,
    hilite,
    setHilite,
    isEditing,
    colorPickerRef,
    editedColor,
    setEditedColor,
    updateColor,
    setFormat,
    colorOptionsRef,
    colorOptionsOpen,
    setColorOptionsOpen,
    deleteColor,
}) => (
    <div
        style={{
            height: 140,
            width: `${width}px`,
            left: `${calculateLeftPos(id, width)}px`,
            display: 'inline-block',
        }}
        id={`row-${id}`}
        className={`hover:tw-z-30 row tw-absolute tw-overflow-visible tw-pb-8 tw-inline-block`}
        onDragOver={(val) => {
            const { id: targetId }: any = val.target;
            if (hilite !== targetId) {
                setHilite(parseInt(targetId.split('-')[1]));
            }
        }}
        key={id}
    >
        <div className="tw-z-0 tw-absolute tw-w-full tw-h-full tw-opacity-0 hover:tw-opacity-100">
            <AddNewColorModal
                id={id}
                currentColor={currentColor}
                isEditing={isEditing}
                colorPickerRef={colorPickerRef}
                editedColor={editedColor}
                setEditedColor={setEditedColor}
                updateColor={updateColor}
                setFormat={setFormat}
            />
            <AddNewColorTooltips id={id} isEditing={isEditing} setEditedColor={setEditedColor} />
        </div>
        <div
            style={{
                backgroundColor: `rgba(${backgroundColorRgba})`,
                height: 93,
            }}
            className="tw-group tw-rounded-md tw-overflow-visible tw-top-2 tw-absolute tw-border tw-border-white tw-mt-4 tw-mb-4 tw-w-full"
        >
            <EditExistingColorModal
                id={id}
                currentColor={currentColor}
                isEditing={isEditing}
                colorPickerRef={colorPickerRef}
                editedColor={editedColor}
                setEditedColor={setEditedColor}
                updateColor={updateColor}
                setFormat={setFormat}
            />

            <DragHandle id={id} currentColor={currentColor} isEditing={isEditing} onDragStart={onDragStart} />

            <CustomizationOptionsModal
                id={id}
                colorOptionsRef={colorOptionsRef}
                colorOptionsOpen={colorOptionsOpen}
                setColorOptionsOpen={setColorOptionsOpen}
                isEditing={isEditing}
                setEditedColor={setEditedColor}
                deleteColor={deleteColor}
            />
        </div>
    </div>
);
