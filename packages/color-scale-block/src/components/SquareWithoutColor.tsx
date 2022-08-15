/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { SquareWithoutColorProps } from '../types';
import { EditExistingColorModal } from './EditExistingColorModal';
import { DragHandle } from './DragHandle';
import { CustomizationOptionsModal } from './CustomizationOptionsModal';
import { /*IconDrop, */ IconSize, IconAddSimple } from '@frontify/arcade';

export const SquareWithoutColor: FC<SquareWithoutColorProps> = ({
    id,
    width,
    currentSquare,
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
    hovered,
    setHovered,
}) => (
    <div
        style={{
            height: 140,
            width: `${width}px`,
            left: `${calculateLeftPos(id, width)}px`,
        }}
        id={`row-${id}`}
        className={`hover:tw-z-30 row tw-pb-8 tw-inline-block tw-absolute`}
        onMouseEnter={(evt) => {
            const { id: targetId }: any = evt.target;
            if (hovered !== targetId) {
                setHovered(parseInt(targetId.split('-')[1]));
            }
        }}
        onDragOver={(val) => {
            const { id: targetId }: any = val.target;
            if (hilite !== targetId) {
                setHilite(parseInt(targetId.split('-')[1]));
            }
        }}
        key={id}
    >
        <div className="tw-z-0 tw-absolute tw-w-full tw-h-full tw-opacity-0 hover:tw-opacity-100"></div>

        <div
            style={{ height: 93 }}
            className={`tw-rounded-md tw-group tw-flex tw-justify-center tw-items-center tw-bg-black-10 tw-top-2 tw-absolute tw-border tw-border-white tw-mt-4 tw-mb-4 tw-w-full`}
        >
            <div className={`${!isEditing ? 'tw-hidden' : ''} group-hover:tw-hidden tw-text-black-20`}>
                {/* <IconDrop size={IconSize.Size32} /> */}
            </div>
            {isEditing ? (
                <div className="tw-rounded-md group-hover:tw-bg-white group-hover:tw-border group-hover:tw-border-black-30 group-hover:tw-border-dashed tw-hidden group-hover:tw-flex tw-justify-center tw-items-center tw-content-center tw-w-full tw-h-full">
                    <a
                        onClick={() => {
                            setEditedColor(id);
                        }}
                    >
                        <span className="tw-cursor-pointer tw-flex tw-items-center tw-justify-center tx-content-center">
                            <IconAddSimple size={IconSize.Size16} />
                            <span className="tw-font-sans tw-text-xs tw-font-thin">Add color</span>
                        </span>
                    </a>
                    <EditExistingColorModal
                        id={id}
                        currentColor={currentSquare}
                        isEditing={isEditing}
                        colorPickerRef={colorPickerRef}
                        editedColor={editedColor}
                        setEditedColor={setEditedColor}
                        updateColor={updateColor}
                        setFormat={setFormat}
                    />
                    <CustomizationOptionsModal
                        id={id}
                        colorOptionsRef={colorOptionsRef}
                        colorOptionsOpen={colorOptionsOpen}
                        setColorOptionsOpen={setColorOptionsOpen}
                        isEditing={isEditing}
                        setEditedColor={setEditedColor}
                        deleteColor={deleteColor}
                    />
                    <DragHandle id={id} currentColor={currentSquare} isEditing={isEditing} onDragStart={onDragStart} />
                </div>
            ) : (
                <></>
            )}
        </div>
        <div className="tw-h-8 tw-relative"></div>
    </div>
);
