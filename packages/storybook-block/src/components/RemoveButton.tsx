/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { IconReject, IconSize, Tooltip } from '@frontify/arcade';

type RemoveButtonProps = {
    onClick: () => void;
};

export const RemoveButton: FC<RemoveButtonProps> = ({ onClick }) => {
    return (
        <div className="tw-absolute tw-top-4 tw-right-4 tw-w-9 tw-h-9">
            <Tooltip
                withArrow
                content="Remove link"
                triggerElement={
                    <button
                        className="tw-flex tw-w-9 tw-h-9 tw-items-center tw-justify-center tw-bg-black-20 hover:tw-bg-black-30 tw-transition-colors tw-rounded tw-text-text"
                        onClick={onClick}
                    >
                        <IconReject size={IconSize.Size20} />
                    </button>
                }
            />
        </div>
    );
};
