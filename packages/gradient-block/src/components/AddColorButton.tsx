/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus, IconSize } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { AddColorButtonProps } from '../types';

const ADD_BUTTON_SIZE_PX = 17;

export const AddColorButton = ({
    addRef,
    addButtonPosition,
    gradientBlockRef,
    setShowColorModal,
    setCurrentColorPosition,
}: AddColorButtonProps) => {
    const handleAdd = (position: number) => {
        if (!gradientBlockRef.current) {
            return;
        }
        setShowColorModal(true);
        setCurrentColorPosition((position / gradientBlockRef?.current?.getBoundingClientRect().width) * 100);
    };

    return (
        <div
            ref={addRef}
            data-test-id="gradient-add"
            className={joinClassNames([
                'tw-absolute tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded-[3px] tw-cursor-pointer ' +
                    `tw-h-[${ADD_BUTTON_SIZE_PX}px] tw-w-[${ADD_BUTTON_SIZE_PX}px]`,
            ])}
            style={{ ...addButtonPosition }}
        >
            <span
                className="tw-text-white tw-h-[17px] tw-w-[17px] tw-flex tw-justify-center tw-items-center tw-pt-[1px]"
                onClick={() => handleAdd(addButtonPosition.left)}
            >
                <IconPlus size={IconSize.Size12} />
            </span>
        </div>
    );
};
