/* (c) Copyright Frontify Ltd., all rights reserved. */

type TooltipContentProps = {
    colorValue: string;
    status: 'error' | 'success' | 'idle';
};

export const TooltipContent = ({ colorValue, status }: TooltipContentProps) => {
    return (
        <span data-test-id="tooltip-content">
            <span className="tw-block">Color Name</span>
            <span className="tw-block">{colorValue}</span>
            <span className="tw-text-black-50">
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click to copy.'}
                {status === 'success' && 'Copied!'}
            </span>
        </span>
    );
};
