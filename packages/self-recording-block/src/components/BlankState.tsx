/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlayCircle24, Text } from '@frontify/fondue';
import { ReactElement } from 'react';

type BlankStateProps = {
    onClick: () => void;
};

export const BlankState = ({ onClick }: BlankStateProps): ReactElement => {
    return (
        <div
            className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#FAFAFA] tw-cursor-pointer"
            onClick={onClick}
        >
            <div className="tw-flex tw-gap-4">
                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <IconPlayCircle24 />
                </div>
                <div className="tw-flex tw-flex-col">
                    <Text weight="strong">Record yourself!</Text>
                    <Text>Starting in 5, 4...</Text>
                </div>
            </div>
        </div>
    );
};
