/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { useCopy } from '@frontify/fondue';

import type { TooltipContentProps } from './types';

export const TooltipContent: FC<TooltipContentProps> = ({ color }) => {
    const { copy, status } = useCopy();

    const handleCopy = () => copy(color);

    return (
        <>
            <span className="tw-block">Color Name</span>
            <span data-test-id="color-hash" className="tw-block">
                #{color}
            </span>
            <span data-test-id="copy" className="tw-text-black-50" onClick={handleCopy}>
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click to copy'}
                {status === 'success' && 'Copied!'}
            </span>
        </>
    );
};
