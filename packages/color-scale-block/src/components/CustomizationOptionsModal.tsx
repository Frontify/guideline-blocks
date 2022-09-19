/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { CustomizationOptionsModalProps } from '../types';
import { /*IconDrop,*/ IconSize, IconActions, IconTrashBin, Flyout } from '@frontify/fondue';

export const CustomizationOptionsModal: FC<CustomizationOptionsModalProps> = ({
    id,
    colorOptionsRef,
    colorOptionsOpen,
    setColorOptionsOpen,
    isEditing,
    setEditedColor,
    deleteColor,
}) => (
    <>
        {isEditing ? (
            <div
                id="coloroptions"
                ref={colorOptionsRef}
                className={`color-options tw-hidden group-hover:tw-flex tw-absolute tw-top-2 tw-mr-3 tw-h-6 tw-right-[0px] tw-z-[2]`}
            >
                 <button
                            onClick={() => {
                                deleteColor(id);
                            }}
                            className="tw-h-full tw-w-full tw-flex tw-items-center tw-pl-1 tw-rounded-sm tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70"
                        >
                           <IconTrashBin size={IconSize.Size16} /> <span className="tw-ml-1"></span>
                        </button>

            </div>
        ) : (
            <></>
        )}
    </>
);
