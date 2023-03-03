/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus12 } from '@frontify/fondue';
import { AddColorButtonProps } from '../types';

export const AddColorButton = ({
    addButtonPositionLeft,
    blockWidth,
    setCurrentlyEditingPosition,
    setShowColorModal,
}: AddColorButtonProps) => {
    const handleAdd = (position: number) => {
        setCurrentlyEditingPosition((position / blockWidth) * 100);
        setShowColorModal(true);
    };

    return (
        <div
            data-test-id="gradient-add"
            className="tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded tw-cursor-pointer tw-h-4 tw-w-4"
            style={{
                left: addButtonPositionLeft,
            }}
        >
            <span
                className="tw-text-white tw-h-4 tw-w-4 tw-flex tw-justify-center tw-items-center tw-pt-0.5"
                onClick={() => handleAdd(addButtonPositionLeft)}
            >
                <IconPlus12 />
            </span>
        </div>
    );
};

AddColorButton.displayName = 'AddColorButton';
