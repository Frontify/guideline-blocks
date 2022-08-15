/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { AddNewColorTooltipsProps } from '../types';
import { IconSize, IconAddSimple, TooltipArrow, Tooltip as TooltipComponent } from '@frontify/arcade';

export const AddNewColorTooltips: FC<AddNewColorTooltipsProps> = ({ id, isEditing, setEditedColor }) => (
    <>
        {/* the below are tooltips with a + icon, allowing users to add new colors*/}
        {isEditing ? (
            <div style={{ right: '9px' }} className="tw-cursor-pointer tw-absolute tw-group">
                <a onClick={() => setEditedColor(`new-${id}`)}>
                    <div
                        style={{ borderBottomWidth: '16px' }}
                        className="tw-rounded-md tw-absolute tw-group tw-border-2 tw-border-black-20 hover:tw-border-black-30 dark:tw-border-black-80 dark:hover:tw-border-black-70 tw-h-4 tw-w-4 tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70"
                    >
                        <div className="tw-z-0 tw-top-2 tw-absolute tw-transform tw-rotate-45 tw-rounded-sm tw-h-3 tw-w-3 tw-bg-black-20 group-hover:tw-bg-black-30 dark:tw-bg-black-80 dark:group-hover:tw-bg-black-70" />
                        <div className="tw-absolute tw-z-1">
                            <IconAddSimple size={IconSize.Size12} />
                        </div>
                    </div>
                    <div style={{ top: '-59px', right: '-55px' }} className="tw-hidden group-hover:tw-flex tw-absolute">
                        <TooltipComponent
                            style={{ width: '95px' }}
                            arrowPosition="bottom"
                            content="Add color"
                            heading=""
                        >
                            <TooltipArrow
                                placement="bottom"
                                style={{
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translate3d(-50%, 6px, 0)',
                                }}
                            />
                        </TooltipComponent>
                    </div>
                </a>
            </div>
        ) : (
            <></>
        )}
        {isEditing ? (
            <div style={{ right: '-7px' }} className="tw-cursor-pointer tw-absolute tw-bottom-0 tw-group">
                <a onClick={() => setEditedColor(`new-${id}`)}>
                    <div
                        style={{ borderBottomWidth: '16px' }}
                        className="tw-rounded-md tw-transform tw-rotate-180 tw-group tw-border-2 tw-border-black-20 hover:tw-border-black-30 dark:tw-border-black-80 dark:hover:tw-border-black-70 tw-h-4 tw-w-4 tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70"
                    >
                        <div className="tw-z-0 tw-top-2 tw-absolute tw-transform tw-rotate-45 tw-rounded-sm tw-h-3 tw-w-3 tw-bg-black-20 group-hover:tw-bg-black-30 dark:tw-bg-black-80 dark:group-hover:tw-bg-black-70" />
                        <div className="tw-absolute tw-z-1">
                            <IconAddSimple size={IconSize.Size12} />
                        </div>
                    </div>
                    <div
                        style={{ bottom: '-59px', right: '-39px' }}
                        className="tw-hidden group-hover:tw-flex tw-absolute"
                    >
                        <TooltipComponent style={{ width: '95px' }} arrowPosition="top" content="Add color" heading="">
                            <TooltipArrow
                                placement="top"
                                style={{
                                    top: 0,
                                    left: '50%',
                                    transform: 'translate3d(-50%, -6px, 0)',
                                }}
                            />
                        </TooltipComponent>
                    </div>
                </a>
            </div>
        ) : (
            <></>
        )}
    </>
);
