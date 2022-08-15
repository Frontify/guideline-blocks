/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { CustomizationOptionsModalProps } from '../types';
import { /*IconDrop,*/ IconSize, IconActions, IconTrash, Flyout } from '@frontify/arcade';

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
                style={{ right: '0px', zIndex: 2 }}
                id="coloroptions"
                ref={colorOptionsRef}
                className={`color-options tw-hidden group-hover:tw-flex tw-absolute tw-top-2 tw-w-12 tw-h-6`}
            >
                <Flyout
                    isOpen={colorOptionsOpen[id]}
                    // legacyFooter={false}
                    // fixedFooter={<></>}
                    onCancel={() => setColorOptionsOpen({ ...colorOptionsOpen, [id]: false })}
                    onOpenChange={() => {
                        setColorOptionsOpen({ ...colorOptionsOpen, [id]: true });
                    }}
                    trigger={
                        <span
                            // style={{ right: '10%', width: 23 }}
                            className="tw-h-full tw-w-full tw-flex tw-items-center tw-p-1 tw-rounded-sm tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70"
                        >
                            <IconActions />
                        </span>
                    }
                >
                    <div className="coloroptions-modal tw-flex tw-flex-col tw-gap-y-2 tw-p-5">
                        <button
                            className="tw-flex tw-flex-row tw-items-center"
                            onClick={() => {
                                return false;
                            }}
                        >
                            {/* <IconDrop size={IconSize.Size16} />{' '} */}
                            <a
                                className="tw-ml-1"
                                onClick={() => {
                                    setColorOptionsOpen({
                                        ...colorOptionsOpen,
                                        [id]: false,
                                    });
                                    setEditedColor(id);
                                }}
                            >
                                Color picker
                            </a>
                        </button>
                        <button
                            className="tw-flex tw-flex-row tw-items-center"
                            onClick={() => {
                                setColorOptionsOpen({
                                    ...colorOptionsOpen,
                                    [id]: false,
                                });
                                deleteColor(id);
                            }}
                        >
                            <IconTrash size={IconSize.Size16} /> <span className="tw-ml-1">Delete</span>
                        </button>
                    </div>
                </Flyout>
            </div>
        ) : (
            <></>
        )}
    </>
);
