/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TooltipContentProps } from '../types';

export const TooltipContent = ({ colorValue, status }: TooltipContentProps) => {
    return (
        <div data-test-id="tooltip-content">
            <span className="tw-block">Color Name</span>
            <span className="tw-block">{colorValue}</span>
            <span className="tw-text-black-50">
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click to copy.'}
                {status === 'success' && 'Copied!'}
            </span>
        </div>
    );
};
