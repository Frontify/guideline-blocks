/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { IconArrowMove16, IconTrashBin16 } from '@frontify/fondue';
import { ToolbarProps } from '../types';

export const Toolbar = ({ draggableAttributes, draggableListeners, isDragging }: ToolbarProps) => {
    const handleRemoveSelf = () => {
        /** Todo */
    };

    return (
        <div className="tw-flex tw-justify-end">
            <div className="tw-bg-white tw-text-box-selected-inverse tw-flex tw-flex-shrink-0 tw-gap-1 tw-spacing tw-items-center tw-h-7 tw-self-start tw-border tw-border-box-selected-inverse tw-rounded">
                <button
                    {...draggableAttributes}
                    {...draggableListeners}
                    className={joinClassNames([
                        'tw-bg-base tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-sm',
                        isDragging
                            ? 'tw-cursor-grabbing hover:tw-bg-box-selected-pressed'
                            : 'tw-cursor-grab hover:tw-bg-box-selected-hover',
                    ])}
                >
                    <IconArrowMove16 />
                </button>
                <button
                    onClick={handleRemoveSelf}
                    className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-sm"
                >
                    <IconTrashBin16 />
                </button>
            </div>
        </div>
    );
};
