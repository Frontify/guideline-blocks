/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus12 } from '@frontify/fondue';
import { forwardRef } from 'react';
import { AddColorButtonProps } from '../types';

export const AddColorButton = forwardRef<HTMLDivElement, AddColorButtonProps>(
    ({ setShowColorModal, addButtonPosition, setCurrentColorPosition }, ref) => {
        const handleAdd = (position: number) => {
            if (ref instanceof Function || ref === null || !ref.current) {
                return;
            }
            setShowColorModal(true);
            setCurrentColorPosition((position / ref.current.getBoundingClientRect().width) * 100);
        };

        return (
            <div
                data-test-id="gradient-add"
                className="tw-absolute tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded tw-cursor-pointer tw-h-4 tw-w-4"
                style={{ ...addButtonPosition }}
            >
                <span
                    className="tw-text-white tw-h-4 tw-w-4 tw-flex tw-justify-center tw-items-center tw-pt-0.5"
                    onClick={() => handleAdd(addButtonPosition.left)}
                >
                    <IconPlus12 />
                </span>
            </div>
        );
    }
);

AddColorButton.displayName = 'AddColorButton';
