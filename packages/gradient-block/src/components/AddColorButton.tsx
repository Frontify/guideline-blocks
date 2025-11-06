/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@frontify/fondue/icons';
import { AddColorButtonProps } from '../types';

export const AddColorButton = ({
    positionLeft,
    blockWidth,
    setCurrentlyEditingPosition,
    setShowColorModal,
}: AddColorButtonProps) => {
    const handleAdd = (position: number) => {
        setCurrentlyEditingPosition(((position + 8) / blockWidth) * 100);
        setShowColorModal(true);
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            data-test-id="add-color-button"
            className="tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded tw-cursor-pointer tw-h-4 tw-w-4"
            onClick={() => handleAdd(positionLeft)}
            style={{
                left: positionLeft,
            }}
        >
            <span className="tw-text-white tw-h-4 tw-w-4 tw-flex tw-justify-center tw-items-center tw-pt-0.5">
                <IconPlus size={12} />
            </span>
        </div>
    );
};
