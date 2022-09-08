/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import { TooltipContentProps } from './types';

export const TooltipContent: FC<TooltipContentProps> = ({ color, status }) => {
    return (
        <>
            <span className="tw-block">Color Name</span>
            <span className="tw-block">{color}</span>
            <span className="tw-text-black-50">
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click to copy'}
                {status === 'success' && 'Copied!'}
            </span>
        </>
    );
};
